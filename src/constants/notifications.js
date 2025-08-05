// Notification types
export const NOTIFICATION_TYPES = {
  CART_REMINDER: 'cart_reminder',
  CART_ITEM_ADDED: 'cart_item_added',
  CART_ITEM_REMOVED: 'cart_item_removed',
  ORDER_CONFIRMATION: 'order_confirmation',
  ORDER_SHIPPED: 'order_shipped',
  DOWNLOAD_READY: 'download_ready',
  PAYMENT_ISSUE: 'payment_issue',
  SUPPORT_REPLY: 'support_reply',
  PRODUCT_UPDATE: 'product_update',
  LOW_STOCK: 'low_stock',
  SALE_ALERT: 'sale_alert'
};

// Maximum number of notifications to keep in recent view
export const MAX_NOTIFICATIONS = 5;

// Maximum number of notifications to keep in history
export const MAX_NOTIFICATION_HISTORY = 20; 