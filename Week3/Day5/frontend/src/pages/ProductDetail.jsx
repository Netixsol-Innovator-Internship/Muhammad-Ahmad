import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/products/${id}`);
      const data = await response.json();
      
      if (data.success) {
        setProduct(data.product);
      } else {
        navigate('/collections');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      navigate('/collections');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      setAddingToCart(true);
      await addToCart(product._id, quantity);
      // Show success message (you can implement a toast notification)
      console.log('Product added to cart successfully');
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-96 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-96 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <button
            onClick={() => navigate('/collections')}
            className="bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors"
          >
            Browse Collections
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
        <button onClick={() => navigate('/')} className="hover:text-gray-700">
          Home
        </button>
        <span>/</span>
        <button onClick={() => navigate('/collections')} className="hover:text-gray-700">
          Collections
        </button>
        <span>/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
          {/* Main Image */}
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
            <img
              src={product.images?.[selectedImage] || '/images/placeholders/product-placeholder.jpg'}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = '/images/placeholders/product-placeholder.jpg';
              }}
            />
          </div>

          {/* Thumbnail Images */}
          {product.images && product.images.length > 1 && (
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 bg-gray-100 rounded-md overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-gray-900' : 'border-transparent'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/images/placeholders/product-placeholder.jpg';
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Information */}
        <div>
          <div className="mb-6">
            <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">
              {product.collection}
            </p>
            <h1 className="text-3xl font-light text-gray-900 mb-4">{product.name}</h1>
            <p className="text-2xl font-semibold text-gray-900 mb-6">
              ${product.price?.toFixed(2) || '0.00'}
            </p>
          </div>

          {/* Product Details */}
          <div className="space-y-6 mb-8">
            {product.description && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 text-sm">
              {product.weight && (
                <div>
                  <span className="font-medium text-gray-900">Weight:</span>
                  <span className="ml-2 text-gray-600">{product.weight}</span>
                </div>
              )}
              {product.origin && (
                <div>
                  <span className="font-medium text-gray-900">Origin:</span>
                  <span className="ml-2 text-gray-600">{product.origin}</span>
                </div>
              )}
              {product.quality && (
                <div>
                  <span className="font-medium text-gray-900">Quality:</span>
                  <span className="ml-2 text-gray-600">{product.quality}</span>
                </div>
              )}
              {product.caffeine && (
                <div>
                  <span className="font-medium text-gray-900">Caffeine:</span>
                  <span className="ml-2 text-gray-600">{product.caffeine}</span>
                </div>
              )}
            </div>

            {product.flavours && product.flavours.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Flavour Notes</h3>
                <div className="flex flex-wrap gap-2">
                  {product.flavours.map((flavour, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {flavour}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Add to Cart Section */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex items-center space-x-4 mb-6">
              <label htmlFor="quantity" className="text-sm font-medium text-gray-900">
                Quantity:
              </label>
              <select
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={addingToCart}
              className="w-full bg-gray-900 text-white py-3 px-6 rounded-md font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {addingToCart ? 'Adding to Cart...' : 'Add to Cart'}
            </button>

            <div className="mt-6 text-center">
              <button
                onClick={() => navigate('/collections')}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                ← Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information Tabs */}
      <div className="mt-16 border-t border-gray-200 pt-16">
        <div className="max-w-4xl">
          <h2 className="text-2xl font-light text-gray-900 mb-8">Additional Information</h2>
          
          <div className="space-y-8">
            {product.brewingInstructions && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Brewing Instructions</h3>
                <p className="text-gray-600 leading-relaxed">{product.brewingInstructions}</p>
              </div>
            )}

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Storage Instructions</h3>
              <p className="text-gray-600 leading-relaxed">
                Store in a cool, dry place away from direct sunlight. Keep in an airtight container to maintain freshness and flavor.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping Information</h3>
              <p className="text-gray-600 leading-relaxed">
                Free shipping on orders over $50. Standard delivery takes 3-5 business days. Express shipping available at checkout.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
