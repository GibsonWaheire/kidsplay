import { auth, database } from './supabase';

export const AuthService = {
  login: async (email, password) => {
    try {
      const { data, error } = await auth.signIn(email, password);
      
      if (error) {
        throw new Error(error.message || 'Login failed');
      }
      
      // Get user profile
      const { data: profile, error: profileError } = await database.getUserProfile(data.user.id);
      
      if (profileError && profileError.code !== 'PGRST116') {
        throw new Error(profileError.message);
      }
      
      const userData = {
        id: data.user.id,
        email: data.user.email,
        firstName: profile?.first_name || data.user.user_metadata?.first_name || '',
        lastName: profile?.last_name || data.user.user_metadata?.last_name || '',
        username: profile?.username || data.user.email?.split('@')[0] || '',
        avatar: profile?.avatar || data.user.user_metadata?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        membership: profile?.membership || 'Free',
        role: profile?.role || 'user',
        joinDate: profile?.created_at || data.user.created_at
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      
      return { user: userData };
    } catch (error) {
      throw new Error(error.message || 'Login failed');
    }
  },

  register: async (userData) => {
    try {
      const { data, error } = await auth.signUp(userData.email, userData.password, {
        first_name: userData.firstName,
        last_name: userData.lastName
      });
      
      if (error) {
        throw new Error(error.message || 'Registration failed');
      }
      
      // Create user profile
      const profileData = {
        user_id: data.user.id,
        email: userData.email,
        first_name: userData.firstName,
        last_name: userData.lastName,
        username: userData.email.split('@')[0],
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        membership: 'Free',
        role: 'user'
      };
      
      const { error: profileError } = await database.updateUserProfile(data.user.id, profileData);
      
      if (profileError) {
        throw new Error(profileError.message);
      }
      
      const userResponse = {
        id: data.user.id,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        username: userData.email.split('@')[0],
        avatar: profileData.avatar,
        membership: 'Free',
        role: 'user',
        joinDate: data.user.created_at
      };
      
      localStorage.setItem('user', JSON.stringify(userResponse));
      
      return { user: userResponse };
    } catch (error) {
      throw new Error(error.message || 'Registration failed');
    }
  },

  logout: async () => {
    try {
      const { error } = await auth.signOut();
      if (error) {
        throw new Error(error.message);
      }
      
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
      
      return { success: true };
    } catch (error) {
      throw new Error(error.message || 'Logout failed');
    }
  },

  getCurrentUser: async () => {
    try {
      const { user, error } = await auth.getCurrentUser();
      
      if (error || !user) {
        return null;
      }
      
      // Get user profile
      const { data: profile, error: profileError } = await database.getUserProfile(user.id);
      
      if (profileError && profileError.code !== 'PGRST116') {
        throw new Error(profileError.message);
      }
      
      const userData = {
        id: user.id,
        email: user.email,
        firstName: profile?.first_name || user.user_metadata?.first_name || '',
        lastName: profile?.last_name || user.user_metadata?.last_name || '',
        username: profile?.username || user.email?.split('@')[0] || '',
        avatar: profile?.avatar || user.user_metadata?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        membership: profile?.membership || 'Free',
        role: profile?.role || 'user',
        joinDate: profile?.created_at || user.created_at
      };
      
      return userData;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  checkSession: async () => {
    try {
      const { session, error } = await auth.getCurrentSession();
      
      if (error || !session) {
        return null;
      }
      
      return await AuthService.getCurrentUser();
    } catch (error) {
      console.error('Error checking session:', error);
      return null;
    }
  },

  // Check if user is admin
  isAdmin: (user) => {
    return user && user.role === 'admin';
  }
}; 