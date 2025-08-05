import React, { useEffect, useState } from 'react';
import { useCart } from '../../hooks/useCart';
import { useNotifications } from '../../hooks/useNotifications';

const CartSidebar = ({ isOpen, onClose }) => {
  const { items, totalPrice, removeFromCart, updateQuantity, clearCart, processOrder } = useCart();
  const { addOrderConfirmation, addDownloadReady } = useNotifications();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = async () => {
    if (items.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Process the order
      processOrder();
      
      // Add notifications
      const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;
      addOrderConfirmation(orderNumber);
      
      // Add download ready notifications for free items
      items.forEach(item => {
        if (item.price === 0) {
          addDownloadReady(item.title);
        }
      });
      
      // Show success message
      setShowSuccess(true);
      
      // Close sidebar after a delay
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 3000);
      
    } catch (error) {
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      {/* Light overlay with blur effect */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <span className="text-2xl">×</span>
          </button>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="bg-green-50 border border-green-200 p-4 mx-6 mt-4 rounded-lg">
            <div className="flex items-center gap-2">
              <span className="text-green-600 text-xl">✅</span>
              <div>
                <h3 className="font-semibold text-green-800">Order Successful!</h3>
                <p className="text-green-600 text-sm">Your order has been processed and added to your orders.</p>
              </div>
            </div>
          </div>
        )}

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🛒</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-500">Add some products to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  {/* Product Image */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                  />
                  
                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{item.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">{item.age}</p>
                    
                    {/* Price and Quantity */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-blue-600">
                          ${item.price}
                        </span>
                        {item.oldPrice && (
                          <span className="text-sm text-gray-400 line-through">
                            ${item.oldPrice}
                          </span>
                        )}
                      </div>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200 flex items-center justify-center text-gray-600 font-bold"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200 flex items-center justify-center text-gray-600 font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
                  >
                    <span className="text-xl">×</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 p-6">
            {/* Total */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-gray-900">Total:</span>
              <span className="text-2xl font-bold text-blue-600">${totalPrice.toFixed(2)}</span>
            </div>
            
            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 shadow-lg ${
                  isProcessing
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:scale-105'
                }`}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </div>
                ) : (
                  'Proceed to Checkout'
                )}
              </button>
              
              <button
                onClick={clearCart}
                disabled={isProcessing}
                className={`w-full bg-gray-200 text-gray-700 py-2 px-6 rounded-xl font-medium transition-colors duration-200 ${
                  isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'
                }`}
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar; 