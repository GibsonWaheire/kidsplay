import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNotifications } from '../../hooks/useNotifications';

const NotificationDropdown = ({ isOpen, onClose }) => {
  const { 
    recentNotifications, 
    allNotifications, 
    unreadCount, 
    markAsRead, 
    removeNotification, 
    markAllAsRead 
  } = useNotifications();
  const [showHistory, setShowHistory] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Also close on escape key
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Close dropdown when route changes
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [location.pathname, onClose, isOpen]);

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    onClose();
  };

  const handleDismissNotification = (e, notificationId) => {
    e.stopPropagation();
    removeNotification(notificationId);
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead();
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'cart_reminder':
        return '🛒';
      case 'cart_item_added':
        return '➕';
      case 'cart_item_removed':
        return '🗑️';
      case 'order_confirmation':
        return '✅';
      case 'order_shipped':
        return '📦';
      case 'download_ready':
        return '⬇️';
      case 'payment_issue':
        return '⚠️';
      case 'support_reply':
        return '💬';
      case 'product_update':
        return '🆕';
      case 'low_stock':
        return '📉';
      case 'sale_alert':
        return '🏷️';
      default:
        return '🔔';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'cart_item_added':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'cart_item_removed':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'order_confirmation':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'payment_issue':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const notificationsToShow = showHistory ? allNotifications : recentNotifications;

  // Only render if explicitly opened
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      
      {/* Dropdown */}
      <div 
        ref={dropdownRef}
        className="absolute top-full right-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 max-h-96 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="text-2xl">🔔</span>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Notifications</h3>
              <p className="text-sm text-gray-500">
                {showHistory ? `Showing all ${allNotifications.length} notifications` : `Showing recent ${recentNotifications.length} notifications`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="px-3 py-1 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
              >
                Mark all read
              </button>
            )}
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="px-3 py-1 text-xs font-medium text-gray-600 hover:text-gray-700 transition-colors duration-200"
            >
              {showHistory ? 'Recent' : 'History'}
            </button>
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              title="Close notifications"
            >
              <span className="text-lg">×</span>
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {notificationsToShow.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-4xl mb-2">🔔</div>
              <p className="text-gray-500">
                {showHistory ? 'No notifications in history' : 'No new notifications'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {notificationsToShow.map((notification, index) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 transition-all duration-200 cursor-pointer ${
                    !notification.read ? 'bg-blue-50 border-l-4 border-blue-400' : ''
                  } ${getNotificationColor(notification.type)}`}
                  onClick={() => handleNotificationClick(notification)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <span className="text-2xl">{getNotificationIcon(notification.type)}</span>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold text-gray-900 text-sm">
                          {notification.title}
                        </h4>
                        <button
                          onClick={(e) => handleDismissNotification(e, notification.id)}
                          className="flex-shrink-0 p-1 text-gray-400 hover:text-red-500 transition-all duration-200 hover:scale-110"
                          title="Dismiss notification"
                        >
                          <span className="text-lg">×</span>
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-400">
                          {formatTimeAgo(notification.createdAt)}
                        </span>
                        {!notification.read && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Unread
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {notificationsToShow.length > 0 && (
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
              </span>
              <Link
                to="/notifications"
                onClick={onClose}
                className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
              >
                View all
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NotificationDropdown; 