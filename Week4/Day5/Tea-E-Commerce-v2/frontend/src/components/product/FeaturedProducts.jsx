import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { productsAPI } from '../../utils/api';

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await productsAPI.getProducts({ 
        limit: 4, 
        sortBy: 'createdAt', 
        sortOrder: 'desc' 
      });
      
      if (response.data.success) {
        setFeaturedProducts(response.data.data.products);
      } else {
        setError('Failed to load featured products');
      }
    } catch (error) {
      console.error('Error fetching featured products:', error);
      setError('Failed to load featured products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (product) => {
    try {
      await addToCart(product._id, 1);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Discover our most popular teas, carefully selected for their exceptional quality and taste.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-neutral-200 h-64 rounded-lg mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
                <div className="h-4 bg-neutral-200 rounded w-1/2"></div>
                <div className="h-4 bg-neutral-200 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
          Featured Products
        </h2>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          Discover our most popular teas, carefully selected for their exceptional quality and taste.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {featuredProducts.map((product) => (
          <div key={product._id} className="group relative">
            <div className="card-hover overflow-hidden">
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <img
                  src={product.images?.[0] ? `/images/${product.images[0]}` : '/images/products/product-1.jpg'}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = '/images/placeholders/product-placeholder.jpg';
                  }}
                />
                
                {/* Badge */}
                {product.collection && (
                  <div className="absolute top-3 left-3 bg-primary-600 text-white px-2 py-1 text-xs font-medium rounded">
                    {product.collection}
                  </div>
                )}

                {/* Quick Add Button */}
                <button
                  onClick={() => handleAddToCart(product)}
                  className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-neutral-900 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                >
                  <img src="/images/icons/add.svg" alt="Add to cart" className="w-5 h-5" />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="text-sm text-primary-600 font-medium mb-1">
                  {product.collection}
                </div>
                
                <h3 className="text-lg font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                  <Link to={`/products/${product._id}`}>
                    {product.name}
                  </Link>
                </h3>
                
                <p className="text-sm text-neutral-600 mb-3 line-clamp-2">
                  {product.description}
                </p>

                {/* Product Details */}
                <div className="flex items-center mb-3 text-xs text-neutral-500 space-x-2">
                  {product.weight && (
                    <span>{product.weight}</span>
                  )}
                  {product.caffeine && (
                    <span>• {product.caffeine} Caffeine</span>
                  )}
                  {product.origin && (
                    <span>• {product.origin}</span>
                  )}
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-neutral-900">
                      ${product.price}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="btn-primary py-2 px-4 text-sm"
                    disabled={product.stock === 0}
                  >
                    {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchFeaturedProducts}
            className="btn-secondary"
          >
            Try Again
          </button>
        </div>
      )}

      {/* No Products Message */}
      {!loading && !error && featuredProducts.length === 0 && (
        <div className="text-center py-8">
          <p className="text-neutral-600">No featured products available at the moment.</p>
        </div>
      )}

      {/* View All Products Link */}
      {!loading && !error && featuredProducts.length > 0 && (
        <div className="text-center">
          <Link
            to="/collections"
            className="btn-outline inline-flex items-center px-6 py-3"
          >
            View All Products
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      )}
    </section>
  );
};

export default FeaturedProducts;
