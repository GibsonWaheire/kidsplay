import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useNotifications } from "../../hooks/useNotifications";
import { useAuth } from "../../hooks/useAuth";
import NotificationDropdown from "../ui/NotificationDropdown";
import AuthModal from "../auth/AuthModal";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('signin');
  const { totalItems } = useCart();
  const { unreadCount } = useNotifications();
  const { user, isAuthenticated, logout } = useAuth();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Add cart reminder notification when items are in cart
  useEffect(() => {
    if (totalItems > 0) {
      // Only add cart reminder if there isn't already one
      const existingCartReminder = localStorage.getItem('cartReminderAdded');
      if (!existingCartReminder) {
        localStorage.setItem('cartReminderAdded', 'true');
      }
    } else {
      // Remove cart reminder when cart is empty
      localStorage.removeItem('cartReminderAdded');
    }
  }, [totalItems]);

  const handleNotificationClick = () => {
    setNotificationDropdownOpen(!notificationDropdownOpen);
  };

  const handleAuthClick = (mode = 'signin') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const handleLogout = () => {
    logout();
  };

  // Memoize the onClose function to prevent infinite re-renders
  const handleAuthModalClose = useCallback(() => {
    setAuthModalOpen(false);
  }, []);

  // Memoize the notification dropdown close function
  const handleNotificationDropdownClose = useCallback(() => {
    setNotificationDropdownOpen(false);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50' 
          : 'bg-white/80 backdrop-blur-sm shadow-sm'
      }`}>
        <div className="flex items-center justify-between px-6 py-4 relative">
          {/* Left side - Brand/Logo */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center gap-2"
            >
              <span className="text-2xl">🎮</span>
              <span>KidzPlay Connect</span>
            </Link>
          </div>

          {/* Center - Navigation Links for guests */}
          {!isAuthenticated() && (
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Home
              </Link>
              <Link to="/categories" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Categories
              </Link>
              <Link to="/products" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Products
              </Link>
              <Link to="/special-needs" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Special Needs
              </Link>
              <Link to="/blog" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Blog
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                About
              </Link>
            </div>
          )}

          {/* Right side - Actions */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={handleNotificationClick}
                className="relative p-2 rounded-xl hover:bg-gray-100 transition-all duration-300 group cursor-pointer"
                title="View notifications"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">🔔</span>
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </span>
                )}
              </button>
              
              {/* Notification Dropdown */}
              <NotificationDropdown 
                isOpen={notificationDropdownOpen}
                onClose={handleNotificationDropdownClose}
              />
            </div>

            {/* Cart */}
            <Link 
              to="/cart" 
              className="relative p-2 rounded-xl hover:bg-gray-100 transition-all duration-300 group cursor-pointer"
              title="Cart"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform duration-300">🛒</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>
            
            {/* User Profile / Auth */}
            {isAuthenticated() ? (
              <div className="flex items-center gap-3">
                <Link 
                  to="/profile" 
                  className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-100 transition-all duration-300 group cursor-pointer"
                  title={`Profile - ${user?.firstName}`}
                >
                  {user?.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.firstName}
                      className="w-8 h-8 rounded-full object-cover border-2 border-blue-200"
                    />
                  ) : (
                    <span className="text-2xl group-hover:scale-110 transition-transform duration-300">👤</span>
                  )}
                  <span className="hidden sm:block text-sm font-medium text-gray-700">
                    {user?.firstName}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-all duration-300 font-medium text-sm border border-red-200"
                  title="Sign Out"
                >
                  <span className="hidden sm:inline">Sign Out</span>
                  <span className="sm:hidden">🚪</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleAuthClick('signin')}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleAuthClick('signup')}
                  className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={handleAuthModalClose}
        initialMode={authModalMode}
      />
    </>
  );
};

export default Navbar;
