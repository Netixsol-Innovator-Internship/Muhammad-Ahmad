import { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const CartSidebar = ({ isOpen, onClose }) => {
  const { items, total, itemCount, updateCartItem, removeCartItem, loading } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity === 0) {
      await removeCartItem(itemId);
    } else {
      await updateCartItem(itemId, newQuantity);
    }
  };

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      onClose();
      navigate('/checkout');
      setIsProcessing(false);
    }, 500);
  };

  const handleContinueShopping = () => {
    onClose();
    navigate('/collections');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop Overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Sidebar Container */}
      <div className="absolute right-0 top-0 h-full w-96 max-w-[90vw] bg-white shadow-2xl transform transition-transform duration-300 ease-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
            <h2 className="text-xl font-semibold text-gray-900">
              My Bag ({itemCount})
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto bg-gray-50">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 9H20M7 13v9a1 1 0 01-1 1H5a1 1 0 01-1-1v-9m15-4v4a1 1 0 01-1 1h-1" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Your bag is empty</h3>
                <p className="text-gray-500 mb-6">Add some items to get started</p>
                <button
                  onClick={handleContinueShopping}
                  className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {items.map((item) => (
                  <div key={item._id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                    <div className="flex items-start space-x-4">
                      {/* Product Image */}
                      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.product.images?.[0] || '/images/placeholders/product-placeholder.jpg'}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = '/images/placeholders/product-placeholder.jpg';
                          }}
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-lg font-semibold text-gray-900 mt-1">
                          €{item.priceAtAdd.toFixed(2)}
                        </p>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center mt-3 space-x-2">
                          <button
                            onClick={() => handleQuantityChange(item._id, item.qty - 1)}
                            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition-colors duration-200"
                          >
                            <span className="text-sm font-medium">−</span>
                          </button>
                          <span className="w-12 text-center text-sm font-medium text-gray-900">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item._id, item.qty + 1)}
                            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition-colors duration-200"
                          >
                            <span className="text-sm font-medium">+</span>
                          </button>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeCartItem(item._id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer with Checkout */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 bg-white p-4">
              {/* Subtotal */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-gray-900">Subtotal</span>
                <span className="text-lg font-bold text-gray-900">€{total.toFixed(2)}</span>
              </div>
              
              {/* Shipping Note */}
              <p className="text-xs text-gray-500 mb-4 text-center">
                Shipping and taxes calculated at checkout.
              </p>
              
              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    'Checkout'
                  )}
                </button>
                
                <button
                  onClick={handleContinueShopping}
                  className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
