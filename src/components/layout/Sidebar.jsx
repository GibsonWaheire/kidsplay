import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { totalItems } = useCart();

  const navigation = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'Products', path: '/products', icon: '🎮' },
    { name: 'Categories', path: '/categories', icon: '📂' },
    { name: 'Orders', path: '/orders', icon: '📦' },
    { name: 'Cart', path: '/cart', icon: '🛒', badge: totalItems },
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

          {/* Promotional Content */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            {/* Special Offer Card */}
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
                className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 px-4 rounded-lg text-sm font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105"
              >
                Shop Now
              </Link>
            </div>

            {/* Support Widget */}
            <div className="mt-4 bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xl">💬</span>
                <h3 className="font-semibold text-gray-900 text-sm">Need Help?</h3>
              </div>
              <p className="text-xs text-gray-600 mb-3">
                Our support team is here to help you 24/7
              </p>
              <button className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors duration-200">
                Contact Support
              </button>
            </div>
          </div>

          {/* Logout */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-all duration-200 group w-full">
              <span className="text-xl group-hover:scale-110 transition-transform duration-200">🚪</span>
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar; 