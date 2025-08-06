import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { totalItems } = useCart();
  const { isAuthenticated, user, logout } = useAuth();

  // Define navigation items based on authentication status
  const publicNavigation = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'Products', path: '/products', icon: '🎮' },
    { name: 'Categories', path: '/categories', icon: '📂' },
    { name: 'Cart', path: '/cart', icon: '🛒', badge: totalItems },
  ];

  const authenticatedNavigation = [
    { name: 'Orders', path: '/orders', icon: '📦', requiresAuth: true },
    { name: 'Profile', path: '/profile', icon: '👤', requiresAuth: true },
    { name: 'Notifications', path: '/notifications', icon: '🔔', requiresAuth: true },
  ];

  const navigation = [
    ...publicNavigation,
    ...(isAuthenticated() ? authenticatedNavigation : [])
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto lg:flex-shrink-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-center p-6 border-b border-gray-200 relative">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🎮</span>
            <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              KidzPlay Connect
            </span>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden absolute right-4 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <span className="text-2xl">×</span>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6">
          <div className="space-y-2">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => onClose()}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 group
                  ${isActive(item.path)
                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border border-blue-200 shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                  }
                `}
              >
                <span className="text-xl group-hover:scale-110 transition-transform duration-200">
                  {item.icon}
                </span>
                <span className="flex-1">{item.name}</span>
                {item.badge && item.badge > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </div>

          {/* User Info / Auth Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            {isAuthenticated() ? (
              /* User Info Card */
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-4 border border-green-200 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  {user?.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.firstName}
                      className="w-10 h-10 rounded-full object-cover border-2 border-green-200"
                    />
                  ) : (
                    <span className="text-2xl">👤</span>
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {user?.firstName} {user?.lastName}
                    </h3>
                    <p className="text-xs text-gray-600">{user?.membership} Member</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Link
                    to="/profile"
                    onClick={() => onClose()}
                    className="block w-full text-center bg-gradient-to-r from-green-600 to-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:from-green-700 hover:to-blue-700 transition-all duration-200"
                  >
                    View Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      onClose();
                    }}
                    className="block w-full text-center bg-red-100 text-red-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-red-200 transition-all duration-200 border border-red-200"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              /* Special Offer Card for Guests */
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">🎁</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">Special Offer</h3>
                    <p className="text-xs text-gray-600">Limited Time</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Get 20% off on all educational bundles this week!
                </p>
                <Link
                  to="/products"
                  onClick={() => onClose()}
                  className="block w-full text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                >
                  Shop Now
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar; 