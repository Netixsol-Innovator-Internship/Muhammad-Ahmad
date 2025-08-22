import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { getImageUrl } from '../utils/api';
import { useGetProductQuery, useGetProductsQuery } from '../store/productsApiSlice';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  // RTK Query hooks
  const { data: productData, isLoading, error } = useGetProductQuery(id);
  const { data: relatedProductsData } = useGetProductsQuery({ 
    limit: 4, 
    collection: productData?.data?.collection || '' 
  }, {
    skip: !productData?.data?.collection // Skip if no collection yet
  });

  const product = productData?.data;
  const relatedProducts = relatedProductsData?.data?.products?.filter(p => p._id !== id) || [];

  const [selectedVariant, setSelectedVariant] = useState('50g');
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  // Product variants with pricing
  const variants = [
    { size: '50g', label: '50 g bag', price: 3.90 },
    { size: '100g', label: '100 g bag', price: 6.90 },
    { size: '170g', label: '170 g bag', price: 9.90 },
    { size: '250g', label: '250 g bag', price: 12.90 },
    { size: '1kg', label: '1 kg bag', price: 45.90 },
    { size: 'sampler', label: 'Sampler', price: 1.90 }
  ];

  // Map variant sizes to icon filenames placed in public/images/icons
  const variantIcons = {
    '50g': '/images/icons/50-gram-bag.svg',
    '100g': '/images/icons/100-gram-bag.svg',
    '170g': '/images/icons/170-gram-bag.svg',
    '250g': '/images/icons/250-gram-bag.svg',
    '1kg': '/images/icons/1-kg-bag.svg',
    'sampler': '/images/icons/sampler.svg'
  };

  const getVariantIcon = (size) => variantIcons[size] || '/images/placeholders/product-placeholder.jpg';

  // Sample product data matching the image
  const sampleProduct = {
    _id: id || '1',
    name: 'Ceylon Ginger Cinnamon chai tea',
    description: 'A lovely warming Chai tea with ginger cinnamon flavours.',
    price: 3.90,
    images: ['/images/products/ceylon-ginger-cinnamon-chai.jpg'],
    collection: 'Chai',
    origin: 'Iran',
    isOrganic: true,
    isVegan: true,
    steepingInstructions: {
      servingSize: '2 tsp per cup, 6 tsp per pot',
      waterTemp: '100°C',
      steepingTime: '3-5 minutes',
      colorAfter3Min: '#8B4513'
    },
    flavor: 'Spicy',
    qualities: 'Smoothing',
    caffeine: 'Medium',
    allergens: 'Nut-free',
    ingredients: 'Black Ceylon tea, Green tea, Ginger root, Cloves, Black pepper, Cinnamon sticks, Cinnamon, Cinnamon pieces.'
  };

  const getCurrentPrice = () => {
    // If product has variants, use variant pricing, otherwise use base price
    if (product?.variants && product.variants.length > 0) {
      const variant = product.variants.find(v => v.size === selectedVariant);
      return variant ? variant.price : product.price;
    }
    
    // Fallback to static variant pricing for display
    const variant = variants.find(v => v.size === selectedVariant);
    return variant ? variant.price : product?.price || 0;
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      // Redirect to login with current page as return destination
      navigate('/login', { state: { from: { pathname: `/products/${id}` } } });
      return;
    }

    try {
      setAddingToCart(true);
      
      // Add to cart using the backend API
      const result = await addToCart(product._id, quantity);
      
      if (result.success) {
        // Show success message (you could use toast notification here)
        alert('Added to bag successfully!');
      } else {
        alert(result.error || 'Failed to add to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add to cart. Please try again.');
    } finally {
      setAddingToCart(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-96 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !product) {
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
          HOME
        </button>
        <span>/</span>
        <button onClick={() => navigate('/collections')} className="hover:text-gray-700">
          COLLECTIONS
        </button>
        <span>/</span>
        <button onClick={() => navigate('/collections?collection=Chai')} className="hover:text-gray-700">
          CHAI
        </button>
        <span>/</span>
        <span className="text-gray-900 uppercase">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Product Image */}
        <div>
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={getImageUrl(product.images?.[0])}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = '/images/placeholders/product-placeholder.jpg';
              }}
            />
          </div>
        </div>

        {/* Product Information */}
        <div className="space-y-8">
          {/* Product Header */}
          <div>
            <h1 className="text-3xl font-light text-gray-900 mb-4">{product.name}</h1>
            <p className="text-gray-600 text-lg mb-6">{product.description}</p>
            
            {/* Product Badges */}
            <div className="flex items-center space-x-6 mb-6">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm text-gray-600">Origin: {product.origin || 'Unknown'}</span>
              </div>
              {(product.isOrganic || product.quality?.toLowerCase().includes('organic')) && (
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-600">Organic</span>
                </div>
              )}
              {(product.isVegan || product.collection?.toLowerCase().includes('herbal')) && (
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                  </svg>
                  <span className="text-sm text-gray-600">Vegan</span>
                </div>
              )}
            </div>

            {/* Price */}
            <div className="text-3xl font-light text-gray-900 mb-8">
              €{getCurrentPrice().toFixed(2)}
            </div>
          </div>

          {/* Variants */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-4">Variants</h3>
            <div className="grid grid-cols-3 gap-3">
              {variants.map((variant) => (
                <button
                  key={variant.size}
                  onClick={() => setSelectedVariant(variant.size)}
                  className={`p-4 border rounded-lg text-center transition-colors ${
                    selectedVariant === variant.size
                      ? 'border-gray-900 bg-gray-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={getVariantIcon(variant.size)}
                    alt={variant.label}
                    className="w-8 h-10 mx-auto mb-2 object-contain"
                    onError={(e) => { e.target.src = '/images/placeholders/product-placeholder.jpg'; }}
                  />
                  <div className="text-xs text-gray-600">{variant.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 text-gray-500 hover:text-gray-700"
              >
                −
              </button>
              <span className="px-4 py-3 text-gray-900 min-w-[3rem] text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-3 text-gray-500 hover:text-gray-700"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={addingToCart}
              className="flex-1 bg-gray-900 text-white py-3 px-6 rounded-md font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 9H20M7 13v9a1 1 0 01-1 1H5a1 1 0 01-1-1v-9m15-4v4a1 1 0 01-1 1h-1" />
              </svg>
              {addingToCart ? 'Adding to Bag...' : isAuthenticated ? 'ADD TO BAG' : 'LOGIN TO ADD TO BAG'}
            </button>
          </div>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-16">
        {/* Steeping Instructions */}
        <div>
          <h2 className="text-2xl font-light text-gray-900 mb-6">Steeping instructions</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0V5a1 1 0 001 1h8a1 1 0 001-1V4M7 4l1 14h8l1-14M7 4h10" />
              </svg>
              <span className="text-sm font-medium text-gray-900">SERVING SIZE:</span>
              <span className="text-sm text-gray-600">{product.steepingInstructions?.servingSize || '1 tsp per cup'}</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
              </svg>
              <span className="text-sm font-medium text-gray-900">WATER TEMPERATURE:</span>
              <span className="text-sm text-gray-600">{product.steepingInstructions?.waterTemp || '100°C'}</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium text-gray-900">STEEPING TIME:</span>
              <span className="text-sm text-gray-600">{product.steepingInstructions?.steepingTime || '3-5 minutes'}</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <div 
                className="w-5 h-5 rounded-full border border-gray-300"
                style={{ backgroundColor: product.steepingInstructions?.colorAfter3Min || '#8B4513' }}
              ></div>
              <span className="text-sm font-medium text-gray-900">COLOR AFTER 3 MINUTES</span>
            </div>
          </div>
        </div>

        {/* About This Tea */}
        <div>
          <h2 className="text-2xl font-light text-gray-900 mb-6">About this tea</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-900">FLAVOR</span>
              <div className="text-gray-600">{product.flavours?.join(', ') || product.flavor || 'Rich and full-bodied'}</div>
            </div>
            <div>
              <span className="font-medium text-gray-900">QUALITIES</span>
              <div className="text-gray-600">{product.qualities || product.quality || 'Premium'}</div>
            </div>
            <div>
              <span className="font-medium text-gray-900">CAFFEINE</span>
              <div className="text-gray-600">{product.caffeine || 'Medium'}</div>
            </div>
            <div>
              <span className="font-medium text-gray-900">WEIGHT</span>
              <div className="text-gray-600">{product.weight || '50g'}</div>
            </div>
          </div>

          {/* Ingredients */}
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Ingredient</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {product.ingredients || product.description || 'Premium tea blend with natural ingredients.'}
            </p>
          </div>
        </div>
      </div>

      {/* You May Also Like */}
      <div className="mt-20">
        <h2 className="text-2xl font-light text-gray-900 mb-8 text-center">You may also like</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedProducts.length > 0 ? relatedProducts.map((item) => (
            <div 
              key={item._id} 
              className="text-center group cursor-pointer"
              onClick={() => navigate(`/product/${item._id}`)}
            >
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                <img
                  src={getImageUrl(item.images?.[0])}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = '/images/placeholders/product-placeholder.jpg';
                  }}
                />
              </div>
              <h3 className="text-sm font-medium text-gray-900 mb-1">{item.name}</h3>
              <p className="text-sm text-gray-500">€{item.price?.toFixed(2)} / {item.weight || '50g'}</p>
            </div>
          )) : (
            // Fallback if no related products
            [1, 2, 3].map((index) => (
              <div key={index} className="text-center">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                  <img
                    src="/images/placeholders/product-placeholder.jpg"
                    alt="Related product"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-1">Related Tea Product</h3>
                <p className="text-sm text-gray-500">€{(Math.random() * 10 + 3).toFixed(2)} / 50g</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
