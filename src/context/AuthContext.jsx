import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNotifications } from '../hooks/useNotifications';

const AuthContext = createContext();

const API_BASE = 'http://localhost:3001';

const AuthService = {
  login: async (email, password) => {
    try {
      const response = await fetch(`${API_BASE}/users?email=${email}`);
      const users = await response.json();
      const user = users.find(u => u.email === email);
      
      if (!user || user.password !== password) {
        throw new Error('Invalid email or password');
      }
      
      const token = 'auth_token_' + Date.now();
      const sessionData = {
        id: Date.now(),
        userId: user.id,
        token: token,
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      };
      
      await fetch(`${API_BASE}/sessions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sessionData)
      });
      
      const userData = { ...user };
      delete userData.password;
      
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      return { user: userData, token };
    } catch (error) {
      throw new Error(error.message || 'Login failed');
    }
  },

  register: async (userData) => {
    try {
      const checkResponse = await fetch(`${API_BASE}/users?email=${userData.email}`);
      const existingUsers = await checkResponse.json();
      
      if (existingUsers.length > 0) {
        throw new Error('Email already registered');
      }
      
      const newUser = {
        id: Date.now(),
        email: userData.email,
        password: userData.password,
        firstName: userData.firstName,
        lastName: userData.lastName,
        username: userData.email.split('@')[0],
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        membership: 'Free',
        joinDate: new Date().toISOString()
      };
      
      const response = await fetch(`${API_BASE}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });
      
      if (!response.ok) {
        throw new Error('Registration failed');
      }
      
      const token = 'auth_token_' + Date.now();
      const sessionData = {
        id: Date.now(),
        userId: newUser.id,
        token: token,
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      };
      
      await fetch(`${API_BASE}/sessions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sessionData)
      });
      
      const userResponse = { ...newUser };
      delete userResponse.password;
      
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(userResponse));
      
      return { user: userResponse, token };
    } catch (error) {
      throw new Error(error.message || 'Registration failed');
    }
  },

  logout: async () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const sessionsResponse = await fetch(`${API_BASE}/sessions?token=${token}`);
        const sessions = await sessionsResponse.json();
        
        for (const session of sessions) {
          await fetch(`${API_BASE}/sessions/${session.id}`, {
            method: 'DELETE'
          });
        }
      } catch (error) {
        console.error('Session cleanup failed:', error);
      }
    }
    
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  getCurrentUser: async () => {
    const token = localStorage.getItem('authToken');
    const userStr = localStorage.getItem('user');
    
    if (!token || !userStr) {
      return null;
    }
    
    try {
      const sessionsResponse = await fetch(`${API_BASE}/sessions?token=${token}`);
      const sessions = await sessionsResponse.json();
      
      if (sessions.length === 0) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        return null;
      }
      
      const session = sessions[0];
      if (new Date(session.expiresAt) < new Date()) {
        await fetch(`${API_BASE}/sessions/${session.id}`, { method: 'DELETE' });
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        return null;
      }
      
      const user = JSON.parse(userStr);
      return { user, token };
    } catch (error) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      return null;
    }
  },

  forgotPassword: async (email) => {
    try {
      const response = await fetch(`${API_BASE}/users?email=${email}`);
      const users = await response.json();
      
      if (users.length === 0) {
        throw new Error('Email not found');
      }
      
      return { message: 'Password reset instructions sent to your email' };
    } catch (error) {
      throw new Error(error.message || 'Password reset failed');
    }
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addNotification } = useNotifications();

  // Check for existing session on app load
  useEffect(() => {
    const checkSession = async () => {
      try {
        const currentUser = await AuthService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser.user);
          setToken(currentUser.token);
        }
      } catch (error) {
        console.error('Session check failed:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkSession();
  }, []);

  const login = async (email, password) => {
    try {
      const { user, token } = await AuthService.login(email, password);
      setUser(user);
      setToken(token);
      addNotification(`Welcome back, ${user.firstName}!`, 'success');
      return { success: true, user };
    } catch (error) {
      addNotification(error.message, 'error');
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      const { user, token } = await AuthService.register(userData);
      setUser(user);
      setToken(token);
      addNotification(`Welcome to KidsPlay, ${user.firstName}!`, 'success');
      return { success: true, user };
    } catch (error) {
      addNotification(error.message, 'error');
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    await AuthService.logout();
    setUser(null);
    setToken(null);
    addNotification('You have been logged out successfully', 'info');
  };

  const forgotPassword = async (email) => {
    try {
      await AuthService.forgotPassword(email);
      addNotification('Password reset email sent! Please check your inbox.', 'success');
      return { success: true };
    } catch (error) {
      addNotification('Failed to send reset email. Please try again.', 'error');
      return { success: false, error: error.message };
    }
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const isAuthenticated = () => {
    return !!(user && token);
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    forgotPassword,
    updateUser,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};