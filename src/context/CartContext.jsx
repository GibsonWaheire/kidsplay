import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
        };
      }
    }
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      };
    
    case 'PROCESS_ORDER': {
      const newOrder = {
        id: Date.now().toString(),
        items: [...state.items],
        totalPrice: state.items.reduce((total, item) => total + (item.price * item.quantity), 0),
        status: 'processing',
        createdAt: new Date().toISOString(),
        orderNumber: `ORD-${Date.now().toString().slice(-6)}`,
      };
      return {
        ...state,
        items: [],
        orders: [...(state.orders || []), newOrder],
      };
    }
    
    default:
      return state;
  }
};

// Cart provider component
const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    orders: [],
  });

  // Load cart and orders from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('cartData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        if (parsedData.items && Array.isArray(parsedData.items)) {
          parsedData.items.forEach(item => {
            dispatch({ type: 'ADD_TO_CART', payload: item });
          });
        }
        if (parsedData.orders && Array.isArray(parsedData.orders)) {
          parsedData.orders.forEach(order => {
            dispatch({ type: 'PROCESS_ORDER', payload: order });
          });
        }
      } catch (error) {
        console.error('Error loading cart data from localStorage:', error);
        localStorage.removeItem('cartData');
      }
    }
  }, []);

  // Save cart and orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cartData', JSON.stringify({
      items: state.items,
      orders: state.orders || [],
    }));
  }, [state]);

  // Calculate total items in cart
  const totalItems = state.items.reduce((total, item) => total + item.quantity, 0);

  // Calculate total price
  const totalPrice = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const processOrder = () => {
    if (state.items.length === 0) {
      throw new Error('Cart is empty');
    }
    dispatch({ type: 'PROCESS_ORDER' });
  };

  const value = {
    items: state.items,
    orders: state.orders || [],
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    processOrder,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { CartProvider, useCart }; 