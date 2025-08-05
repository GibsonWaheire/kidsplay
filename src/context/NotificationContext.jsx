import React, { createContext, useContext, useReducer, useEffect } from 'react';

const NotificationContext = createContext();

// Notification types
export const NOTIFICATION_TYPES = {
  CART_REMINDER: 'cart_reminder',
  ORDER_CONFIRMATION: 'order_confirmation',
  ORDER_SHIPPED: 'order_shipped',
  DOWNLOAD_READY: 'download_ready',
  PAYMENT_ISSUE: 'payment_issue',
  SUPPORT_REPLY: 'support_reply',
  PRODUCT_UPDATE: 'product_update',
  LOW_STOCK: 'low_stock',
  SALE_ALERT: 'sale_alert'
};

// Notification reducer
const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, {
          id: Date.now().toString(),
          ...action.payload,
          createdAt: new Date().toISOString(),
          read: false
        }]
      };
    
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
    
    default:
      return state;
  }
};

// Notification provider component
export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, {
    notifications: []
  });

  // Load notifications from localStorage on mount
  useEffect(() => {
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
      try {
        const parsedNotifications = JSON.parse(savedNotifications);
        if (Array.isArray(parsedNotifications)) {
          parsedNotifications.forEach(notification => {
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

  const addNotification = (notification) => {
    dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
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
    unreadCount,
    addNotification,
    removeNotification,
    markAsRead,
    markAllAsRead,
    clearAll,
    addCartReminder,
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

// Custom hook to use notification context
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}; 