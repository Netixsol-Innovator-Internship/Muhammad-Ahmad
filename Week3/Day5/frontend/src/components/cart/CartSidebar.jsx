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
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50 transform transition-transform">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">My Bag</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 9H20M7 13v9a1 1 0 01-1 1H5a1 1 0 01-1-1v-9m15-4v4a1 1 0 01-1 1h-1" />
                </svg>
                <p className="text-gray-500 mb-4">Your bag is empty</p>
                <button
                  onClick={handleContinueShopping}
                  className="bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item._id} className="flex items-start space-x-4">
                    {/* Product Image */}
                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.product.images?.[0] || '/images/placeholders/product-placeholder.jpg'}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = '/images/placeholders/product-placeholder.jpg';
                        }}
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">{item.product.name}</h3>
                      <p className="text-sm font-medium text-gray-900 mt-2">€{item.priceAtAdd.toFixed(2)}</p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center mt-3">
                        <button
                          onClick={() => handleQuantityChange(item._id, item.qty - 1)}
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l-md text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                        >
                          −
                        </button>
                        <span className="w-12 h-8 flex items-center justify-center border-t border-b border-gray-300 text-sm text-gray-900">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item._id, item.qty + 1)}
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r-md text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeCartItem(item._id)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 p-6 space-y-4">
              {/* Subtotal */}
              <div className="flex justify-between items-center">
                <span className="text-base font-medium text-gray-900">Subtotal</span>
                <span className="text-base font-medium text-gray-900">€{total.toFixed(2)}</span>
              </div>
              
              {/* Shipping Note */}
              <p className="text-xs text-gray-500">Shipping and taxes calculated at checkout.</p>
              
              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="w-full bg-gray-900 text-white py-3 px-4 rounded-md font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'Processing...' : 'Checkout'}
                </button>
                
                <button
                  onClick={handleContinueShopping}
                  className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-md font-medium hover:bg-gray-50 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
