import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNotifications } from '../hooks/useNotifications';

const Notifications = () => {
  const { 
    allNotifications, 
    unreadCount, 
    markAsRead, 
    removeNotification, 
    markAllAsRead, 
    clearAll 
  } = useNotifications();
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
  };

  const handleDismissNotification = (notificationId) => {
    removeNotification(notificationId);
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

  // Filter notifications
  const filteredNotifications = allNotifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });

  // Sort notifications
  const sortedNotifications = [...filteredNotifications].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
  });

  const notificationTypes = [
    { value: 'all', label: 'All', count: allNotifications.length },
    { value: 'unread', label: 'Unread', count: unreadCount },
    { value: 'cart_item_added', label: 'Cart Added', count: allNotifications.filter(n => n.type === 'cart_item_added').length },
    { value: 'cart_item_removed', label: 'Cart Removed', count: allNotifications.filter(n => n.type === 'cart_item_removed').length },
    { value: 'order_confirmation', label: 'Orders', count: allNotifications.filter(n => n.type === 'order_confirmation').length },
    { value: 'download_ready', label: 'Downloads', count: allNotifications.filter(n => n.type === 'download_ready').length },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
            <p className="text-gray-600">
              {unreadCount > 0 
                ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}`
                : 'All caught up! No unread notifications'
              }
            </p>
          </div>
          <div className="flex items-center gap-3">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200"
              >
                Mark all read
              </button>
            )}
            {allNotifications.length > 0 && (
              <button
                onClick={clearAll}
                className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors duration-200"
              >
                Clear all
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {notificationTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setFilter(type.value)}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  filter === type.value
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type.label} ({type.count})
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {sortedNotifications.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-6xl mb-4">🔔</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {filter === 'all' ? 'No notifications yet' : `No ${filter} notifications`}
            </h3>
            <p className="text-gray-500 mb-6">
              {filter === 'all' 
                ? 'You\'ll see notifications here when you interact with the app.'
                : `You don't have any ${filter} notifications at the moment.`
              }
            </p>
            {filter !== 'all' && (
              <button
                onClick={() => setFilter('all')}
                className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200"
              >
                View all notifications
              </button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {sortedNotifications.map((notification, index) => (
              <div
                key={notification.id}
                className={`p-6 hover:bg-gray-50 transition-all duration-200 cursor-pointer ${
                  !notification.read ? 'bg-blue-50 border-l-4 border-blue-400' : ''
                } ${getNotificationColor(notification.type)}`}
                onClick={() => handleNotificationClick(notification)}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <span className="text-3xl">{getNotificationIcon(notification.type)}</span>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-lg mb-1">
                          {notification.title}
                        </h4>
                        <p className="text-gray-600 mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-400">
                            {formatTimeAgo(notification.createdAt)}
                          </span>
                          {!notification.read && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              Unread
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        {notification.action && (
                          <Link
                            to={notification.action}
                            className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                            onClick={(e) => e.stopPropagation()}
                          >
                            View
                          </Link>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDismissNotification(notification.id);
                          }}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200 hover:scale-110"
                          title="Dismiss notification"
                        >
                          <span className="text-xl">×</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {allNotifications.length > 0 && (
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Showing {sortedNotifications.length} of {allNotifications.length} notifications
          </p>
        </div>
      )}
    </div>
  );
};

export default Notifications; 