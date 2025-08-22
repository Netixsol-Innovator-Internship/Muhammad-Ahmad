import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  // Mock featured products - in real app, this would fetch from your backend
  useEffect(() => {
    const mockProducts = [
      {
        _id: '1',
        name: 'Earl Grey Supreme',
        price: 24.99,
        originalPrice: 29.99,
        image: '/images/products/product-1.jpg',
        category: 'Black Tea',
        description: 'A classic Earl Grey with bergamot and cornflower petals',
        rating: 4.8,
        reviews: 156,
        badge: 'Best Seller'
      },
      {
        _id: '2',
        name: 'Dragon Well Green',
        price: 19.99,
        image: '/images/products/product-2.jpg',
        category: 'Green Tea',
        description: 'Premium Chinese green tea with a delicate, sweet flavor',
        rating: 4.7,
        reviews: 89,
        badge: 'Premium'
      },
      {
        _id: '3',
        name: 'Chamomile Dreams',
        price: 16.99,
        image: '/images/products/product-3.jpg',
        category: 'Herbal Tea',
        description: 'Soothing herbal blend perfect for evening relaxation',
        rating: 4.9,
        reviews: 203,
        badge: 'Customer Favorite'
      },
      {
        _id: '4',
        name: 'Himalayan Gold',
        price: 34.99,
        originalPrice: 39.99,
        image: '/images/products/product-4.jpg',
        category: 'Black Tea',
        description: 'High-altitude grown black tea with rich, complex flavors',
        rating: 4.6,
        reviews: 67,
        badge: 'Limited Edition'
      }
    ];

    // Simulate API call
    setTimeout(() => {
      setFeaturedProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  const handleAddToCart = (product) => {
    addToCart({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
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
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = '/images/placeholders/product-placeholder.jpg';
                  }}
                />
                
                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-3 left-3 bg-primary-600 text-white px-2 py-1 text-xs font-medium rounded">
                    {product.badge}
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
                  {product.category}
                </div>
                
                <h3 className="text-lg font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                  <Link to={`/products/${product._id}`}>
                    {product.name}
                  </Link>
                </h3>
                
                <p className="text-sm text-neutral-600 mb-3 line-clamp-2">
                  {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400'
                            : 'text-neutral-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-neutral-600 ml-2">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-neutral-900">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-neutral-500 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="btn-primary py-2 px-4 text-sm"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Products Link */}
      <div className="text-center">
        <Link
          to="/products"
          className="btn-outline inline-flex items-center px-6 py-3"
        >
          View All Products
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProducts;
