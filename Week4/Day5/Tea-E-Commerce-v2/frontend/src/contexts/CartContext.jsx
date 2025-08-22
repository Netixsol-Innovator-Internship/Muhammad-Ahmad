import { createContext, useContext, useReducer, useEffect } from 'react';
import { cartAPI } from '../utils/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_CART':
      return {
        ...state,
        items: action.payload.items || [],
        total: action.payload.total || 0,
        itemCount: action.payload.itemCount || 0,
        loading: false,
        error: null,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        total: 0,
        itemCount: 0,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  items: [],
  total: 0,
  itemCount: 0,
  loading: false,
  error: null,
};

// Cart Provider
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { isAuthenticated } = useAuth();

  // Fetch cart when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      dispatch({ type: 'CLEAR_CART' });
    }
  }, [isAuthenticated]);

  // Fetch cart function
  const fetchCart = async () => {
    if (!isAuthenticated) return;
    
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const response = await cartAPI.getCart();
      dispatch({ type: 'SET_CART', payload: response.data.data });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.response?.data?.message || 'Failed to fetch cart' });
    }
  };

  // Add to cart function
  const addToCart = async (productId, qty = 1) => {
    if (!isAuthenticated) {
      dispatch({ type: 'SET_ERROR', payload: 'Please login to add items to cart' });
      return { success: false, error: 'Please login to add items to cart' };
    }

    try {
      const response = await cartAPI.addToCart(productId, qty);
      await fetchCart(); // Refresh cart
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to add item to cart';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Update cart item function
  const updateCartItem = async (itemId, qty) => {
    if (!isAuthenticated) return { success: false, error: 'Not authenticated' };

    try {
      await cartAPI.updateCartItem(itemId, qty);
      await fetchCart(); // Refresh cart
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update cart item';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Remove cart item function
  const removeCartItem = async (itemId) => {
    if (!isAuthenticated) return { success: false, error: 'Not authenticated' };

    try {
      await cartAPI.removeCartItem(itemId);
      await fetchCart(); // Refresh cart
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to remove cart item';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Clear cart function
  const clearCart = async () => {
    if (!isAuthenticated) return { success: false, error: 'Not authenticated' };

    try {
      await cartAPI.clearCart();
      dispatch({ type: 'CLEAR_CART' });
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to clear cart';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Clear error function
  const clearError = () => {
    dispatch({ type: 'SET_ERROR', payload: null });
  };

  const value = {
    ...state,
    addToCart,
    updateCartItem,
    removeCartItem,
    clearCart,
    clearError,
    fetchCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
