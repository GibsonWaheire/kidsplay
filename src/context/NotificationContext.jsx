import React, { createContext, useReducer, useEffect } from 'react';
import { NOTIFICATION_TYPES, MAX_NOTIFICATIONS, MAX_NOTIFICATION_HISTORY } from '../constants/notifications';

const NotificationContext = createContext();

// Notification reducer
const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION': {
      const newNotification = {
        id: Date.now().toString(),
        ...action.payload,
        createdAt: new Date().toISOString(),
        read: false
      };
      
      // Add new notification and keep only the last MAX_NOTIFICATION_HISTORY
      const updatedNotifications = [...state.notifications, newNotification]
        .slice(-MAX_NOTIFICATION_HISTORY);
      
      return {
        ...state,
        notifications: updatedNotifications
      };
    }
    
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(notification => notification.id !== action.payload)
      };
    
    case 'MARK_AS_READ':
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === action.payload
            ? { ...notification, read: true }
            : notification
        )
      };
    
    case 'MARK_ALL_AS_READ':
      return {
        ...state,
        notifications: state.notifications.map(notification => ({ ...notification, read: true }))
      };
    
    case 'CLEAR_ALL':
      return {
        ...state,
        notifications: []
      };
    
    case 'SET_NOTIFICATIONS_ENABLED':
      return {
        ...state,
        enabled: action.payload
      };
    
    default:
      return state;
  }
};

// Notification provider component
const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, {
    notifications: [],
    enabled: true
  });

  // Load notifications from localStorage on mount
  useEffect(() => {
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
      try {
        const parsedNotifications = JSON.parse(savedNotifications);
        if (Array.isArray(parsedNotifications)) {
          // Load only the last MAX_NOTIFICATION_HISTORY
          const recentNotifications = parsedNotifications.slice(-MAX_NOTIFICATION_HISTORY);
          recentNotifications.forEach(notification => {
            dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
          });
        }
      } catch (error) {
        console.error('Error loading notifications from localStorage:', error);
        localStorage.removeItem('notifications');
      }
    }
  }, []);

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(state.notifications));
  }, [state.notifications]);

  // Calculate unread notifications count
  const unreadCount = state.notifications.filter(notification => !notification.read).length;

  // Get recent notifications (last 5)
  const recentNotifications = state.notifications.slice(-MAX_NOTIFICATIONS);

  // Get all notifications for history
  const allNotifications = state.notifications;

  const addNotification = (notification) => {
    if (!state.enabled) return;
    dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
  };

  const setNotificationsEnabled = (enabled) => {
    dispatch({ type: 'SET_NOTIFICATIONS_ENABLED', payload: enabled });
  };

  const removeNotification = (notificationId) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: notificationId });
  };

  const markAsRead = (notificationId) => {
    dispatch({ type: 'MARK_AS_READ', payload: notificationId });
  };

  const markAllAsRead = () => {
    dispatch({ type: 'MARK_ALL_AS_READ' });
  };

  const clearAll = () => {
    dispatch({ type: 'CLEAR_ALL' });
  };

  // Helper functions for specific notification types
  const addCartReminder = (itemCount) => {
    if (itemCount > 0) {
      addNotification({
        type: NOTIFICATION_TYPES.CART_REMINDER,
        title: 'Items in Cart',
        message: `You have ${itemCount} item${itemCount > 1 ? 's' : ''} in your cart waiting for checkout.`,
        icon: '🛒',
        action: '/cart'
      });
    }
  };

  const addCartItemAdded = (productName) => {
    addNotification({
      type: NOTIFICATION_TYPES.CART_ITEM_ADDED,
      title: 'Item Added to Cart',
      message: `${productName} has been added to your cart.`,
      icon: '🛒',
      action: '/cart'
    });
  };

  const addCartItemRemoved = (productName) => {
    addNotification({
      type: NOTIFICATION_TYPES.CART_ITEM_REMOVED,
      title: 'Item Removed from Cart',
      message: `${productName} has been removed from your cart.`,
      icon: '🗑️',
      action: '/cart'
    });
  };

  const addOrderConfirmation = (orderNumber) => {
    addNotification({
      type: NOTIFICATION_TYPES.ORDER_CONFIRMATION,
      title: 'Order Confirmed',
      message: `Order #${orderNumber} has been confirmed and is being processed.`,
      icon: '✅',
      action: '/orders'
    });
  };

  const addDownloadReady = (productName) => {
    addNotification({
      type: NOTIFICATION_TYPES.DOWNLOAD_READY,
      title: 'Download Ready',
      message: `${productName} is ready for download.`,
      icon: '⬇️',
      action: '/orders'
    });
  };

  const addPaymentIssue = (orderNumber) => {
    addNotification({
      type: NOTIFICATION_TYPES.PAYMENT_ISSUE,
      title: 'Payment Issue',
      message: `There was an issue with payment for order #${orderNumber}. Please review.`,
      icon: '⚠️',
      action: '/orders'
    });
  };

  const addSupportReply = (ticketId) => {
    addNotification({
      type: NOTIFICATION_TYPES.SUPPORT_REPLY,
      title: 'Support Reply',
      message: `You have a new reply to support ticket #${ticketId}.`,
      icon: '💬',
      action: '/support'
    });
  };

  const addProductUpdate = (productName) => {
    addNotification({
      type: NOTIFICATION_TYPES.PRODUCT_UPDATE,
      title: 'Product Update',
      message: `${productName} has been updated with new features.`,
      icon: '🆕',
      action: '/products'
    });
  };

  const value = {
    notifications: state.notifications,
    recentNotifications,
    allNotifications,
    unreadCount,
    enabled: state.enabled,
    addNotification,
    removeNotification,
    markAsRead,
    markAllAsRead,
    clearAll,
    setNotificationsEnabled,
    addCartReminder,
    addCartItemAdded,
    addCartItemRemoved,
    addOrderConfirmation,
    addDownloadReady,
    addPaymentIssue,
    addSupportReply,
    addProductUpdate
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationProvider, NotificationContext }; 