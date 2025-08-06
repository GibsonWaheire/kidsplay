import React, { useState, useEffect } from 'react';
import { useNotifications } from '../hooks/useNotifications';
import { AuthService } from '../lib/authService';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addNotification } = useNotifications();

  useEffect(() => {
    const checkSession = async () => {
      try {
        setLoading(true);
        const currentUser = await AuthService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          setToken(currentUser.id);
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
      const { user: userData } = await AuthService.login(email, password);
      setUser(userData);
      setToken(userData.id);
      addNotification(`Welcome back, ${userData.firstName}!`, 'success');
      return { success: true, user: userData };
    } catch (error) {
      addNotification(error.message, 'error');
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      const { user: newUser } = await AuthService.register(userData);
      setUser(newUser);
      setToken(newUser.id);
      addNotification(`Welcome to KidsPlay, ${newUser.firstName}!`, 'success');
      return { success: true, user: newUser };
    } catch (error) {
      addNotification(error.message, 'error');
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await AuthService.logout();
      setUser(null);
      setToken(null);
      addNotification('You have been logged out successfully.', 'info');
      return { success: true };
    } catch (error) {
      addNotification(error.message, 'error');
      return { success: false, error: error.message };
    }
  };

  const forgotPassword = async () => {
    try {
      addNotification('Password reset functionality is not yet implemented in this version.', 'info');
      return { success: true };
    } catch (error) {
      addNotification(error.message, 'error');
      return { success: false, error: error.message };
    }
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  const isAuthenticated = () => {
    return !!user && !!token;
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