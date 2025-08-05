import React, { useState, useEffect, forwardRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNotifications } from '../../hooks/useNotifications';

const StickyNotificationPanel = forwardRef((props, ref) => {
  const { notifications, recentNotifications, unreadCount, markAsRead, removeNotification } = useNotifications();
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  // Auto-expand when there are unread notifications
  useEffect(() => {
    if (unreadCount > 0 && !isExpanded) {
      setIsExpanded(true);
      // Auto-collapse after 5 seconds if user doesn't interact
      const timer = setTimeout(() => {
        if (isExpanded) {
          setIsExpanded(false);
        }
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [unreadCount, isExpanded]);

  // Close panel when route changes
  useEffect(() => {
    setIsExpanded(false);
  }, [location.pathname]);

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
  };

  const handleDismissNotification = (e, notificationId) => {
    e.stopPropagation();
    removeNotification(notificationId);
  };

  const handleDismissAll = () => {
    notifications.forEach(notification => {
      removeNotification(notification.id);
    });
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

  // Don't render if no notifications and not expanded
  if (notifications.length === 0 && !isExpanded) {
    return null;
  }

  return (
    <div 
      ref={ref}
      data-notification-panel
      className="fixed top-20 right-6 z-50 max-w-sm w-full transition-all duration-500 opacity-100 translate-x-0"
    >
      {/* Notification Panel */}
      <div className={`bg-white rounded-2xl shadow-2xl border border-gray-200 transition-all duration-300 transform ${
        isExpanded ? 'opacity-100 scale-100 translate-y-0' : 'opacity-90 scale-95 translate-y-2'
      } hover:shadow-3xl hover:scale-105`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="text-2xl animate-pulse">🔔</span>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-bounce">
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Notifications</h3>
              <p className="text-sm text-gray-500">
                {recentNotifications.length > 0 
                  ? `Showing last ${recentNotifications.length} notification${recentNotifications.length > 1 ? 's' : ''}`
                  : 'No notifications'
                }
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:scale-110"
              title={isExpanded ? 'Collapse' : 'Expand'}
            >
              <span className="text-xl">
                {isExpanded ? '−' : '+'}
              </span>
            </button>
            {notifications.length > 0 && (
              <button
                onClick={handleDismissAll}
                className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 text-gray-400 hover:text-red-500 hover:scale-110"
                title="Dismiss all"
              >
                <span className="text-lg">×</span>
              </button>
            )}
          </div>
        </div>

        {/* Notifications List */}
        {isExpanded && (
          <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {recentNotifications.length === 0 ? (
              <div className="p-8 text-center">
                <div className="text-4xl mb-2 animate-bounce">🔔</div>
                <p className="text-gray-500">No notifications in history</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {recentNotifications.map((notification, index) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 transition-all duration-200 cursor-pointer ${
                      !notification.read ? 'bg-blue-50 border-l-4 border-blue-400' : ''
                    }`}
                    onClick={() => handleNotificationClick(notification)}
                    style={{ animationDelay: `${index * 100}ms` }}
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
                            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        {isExpanded && recentNotifications.length > 0 && (
          <div className="p-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <Link
              to="/notifications"
              className="block text-center text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200 hover:scale-105"
            >
              View all notifications
            </Link>
          </div>
        )}
      </div>
    </div>
  );
});

StickyNotificationPanel.displayName = 'StickyNotificationPanel';

export default StickyNotificationPanel; 