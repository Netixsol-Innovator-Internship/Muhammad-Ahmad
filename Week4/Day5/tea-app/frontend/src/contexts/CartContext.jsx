import { createContext, useContext, useReducer, useEffect } from 'react';
import { 
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
  useClearCartMutation
} from '../store/cartApiSlice';
import { useAuth } from './AuthContext';
import { useDispatch } from 'react-redux';
import { apiSlice } from '../store/apiSlice';

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
  const reduxDispatch = useDispatch();
  
  // RTK Query hooks
  const { data: cartData, refetch: refetchCart } = useGetCartQuery(undefined, {
    skip: !isAuthenticated,
  });
  const [addToCartMutation] = useAddToCartMutation();
  const [updateCartItemMutation] = useUpdateCartItemMutation();
  const [removeCartItemMutation] = useRemoveCartItemMutation();
  const [clearCartMutation] = useClearCartMutation();

  // Update state when cart data changes
  useEffect(() => {
    if (cartData?.success && cartData?.data) {
      dispatch({
        type: 'SET_CART',
        payload: cartData.data,
      });
    } else if (!isAuthenticated) {
      // Clear cart state and RTK Query cache when user logs out
      dispatch({ type: 'CLEAR_CART' });
      reduxDispatch(apiSlice.util.resetApiState());
    }
  }, [cartData, isAuthenticated, reduxDispatch]);

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
      await addToCartMutation({ productId, qty }).unwrap();
      refetchCart(); // Refresh cart
      return { success: true };
    } catch (error) {
      const errorMessage = error.data?.message || 'Failed to add item to cart';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Update cart item function
  const updateCartItem = async (itemId, qty) => {
    if (!isAuthenticated) return { success: false, error: 'Not authenticated' };

    try {
      await updateCartItemMutation({ itemId, qty }).unwrap();
      refetchCart(); // Refresh cart
      return { success: true };
    } catch (error) {
      const errorMessage = error.data?.message || 'Failed to update cart item';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Remove cart item function
  const removeCartItem = async (itemId) => {
    if (!isAuthenticated) return { success: false, error: 'Not authenticated' };

    try {
      // Optimistically update the UI
      const currentItems = state.items.filter(item => item._id !== itemId);
      const newTotal = currentItems.reduce((sum, item) => sum + (item.priceAtAdd * item.qty), 0);
      const newItemCount = currentItems.reduce((count, item) => count + item.qty, 0);
      
      dispatch({
        type: 'SET_CART',
        payload: {
          items: currentItems,
          total: newTotal,
          itemCount: newItemCount
        }
      });

      // Then call the API
      await removeCartItemMutation(itemId).unwrap();
      
      // Refresh cart to ensure consistency
      refetchCart();
      return { success: true };
    } catch (error) {
      const errorMessage = error.data?.message || 'Failed to remove cart item';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      // Refresh cart to restore state on error
      refetchCart();
      return { success: false, error: errorMessage };
    }
  };

  // Clear cart function
  const clearCart = async () => {
    if (!isAuthenticated) return { success: false, error: 'Not authenticated' };

    try {
      await clearCartMutation().unwrap();
      dispatch({ type: 'CLEAR_CART' });
      return { success: true };
    } catch (error) {
      const errorMessage = error.data?.message || 'Failed to clear cart';
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
