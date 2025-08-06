import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { AuthService } from '../../lib/authService';

const ProtectedRoute = ({ children, requireAuth = true, requireAdmin = false }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // If authentication is required and user is not authenticated
  if (requireAuth && !isAuthenticated()) {
    // Redirect to home with a flag to show auth modal
    return <Navigate to="/?auth=login" state={{ from: location }} replace />;
  }

  // If admin role is required and user is not admin
  if (requireAdmin && (!user || !AuthService.isAdmin(user))) {
    // Redirect to home with access denied message
    return <Navigate to="/" state={{ message: 'Access denied. Admin privileges required.' }} replace />;
  }

  // If user is authenticated but trying to access auth pages, redirect to profile
  if (!requireAuth && isAuthenticated()) {
    return <Navigate to="/profile" replace />;
  }

  return children;
};

export default ProtectedRoute;