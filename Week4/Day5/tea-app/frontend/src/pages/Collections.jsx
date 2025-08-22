import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useGetProductsQuery, useGetFilterOptionsQuery } from '../store/productsApiSlice';
import { getImageUrl } from '../utils/api';

const Collections = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    collection: searchParams.get('collection') || '',
    origin: searchParams.get('origin') || '',
    quality: searchParams.get('quality') || '',
    caffeine: searchParams.get('caffeine') || '',
    priceRange: '',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  // Convert filters to query params for RTK Query
  const queryParams = useMemo(() => {
    const params = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        if (key === 'priceRange' && value) {
          const [min, max] = value.split('-');
          if (min) params.minPrice = min;
          if (max && max !== '+') params.maxPrice = max;
        } else {
          params[key] = value;
        }
      }
    });
    return params;
  }, [filters]);

  // RTK Query hooks
  const { data: productsData, isLoading, error } = useGetProductsQuery(queryParams);
  const { data: filterOptionsData } = useGetFilterOptionsQuery();

  // Extract data from RTK Query responses
  const products = productsData?.data?.products || [];
  const pagination = productsData?.data?.pagination || {};
  const availableFilters = filterOptionsData?.data || {
    collections: [],
    origins: [],
    qualities: [],
    caffeinelevels: []
  };

  const collections = [
    'Black Tea', 'Green Tea', 'White Tea', 'Herbal Tea', 
    'Matcha', 'Chai', 'Oolong', 'Rooibos'
  ];

  const priceRanges = [
    { label: 'All Prices', value: '' },
    { label: 'Under $20', value: '0-20' },
    { label: '$20 - $50', value: '20-50' },
    { label: '$50 - $100', value: '50-100' },
    { label: 'Over $100', value: '100+' }
  ];

  useEffect(() => {
    // Update URL search params when filters change
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value && key !== 'sortBy' && key !== 'sortOrder') {
        params.set(key, value);
      }
    });
    setSearchParams(params);
  }, [filters, setSearchParams]);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Update URL params
    const newSearchParams = new URLSearchParams(searchParams);
    if (value) {
      newSearchParams.set(key, value);
    } else {
      newSearchParams.delete(key);
    }
    setSearchParams(newSearchParams);
  };

  if (isLoading) {
    return (
      <div className="min-h-96 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-96 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Products</h3>
          <p className="text-gray-600 mb-4">{error?.data?.message || error?.message || 'Failed to load products'}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-light text-gray-900 mb-2">Tea Collections</h1>
        <p className="text-gray-600 text-sm sm:text-base">Discover our premium selection of teas from around the world</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
        {/* Sidebar Filters */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">Filters</h3>
            
            {/* Collection Filter */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Collection</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="collection"
                    value=""
                    checked={filters.collection === ''}
                    onChange={(e) => handleFilterChange('collection', e.target.value)}
                    className="h-4 w-4 text-gray-900 border-gray-300 focus:ring-gray-900"
                  />
                  <span className="ml-2 text-sm text-gray-700">All Collections</span>
                </label>
                {(availableFilters.collections?.length > 0 ? availableFilters.collections : collections).map((collection) => (
                  <label key={collection} className="flex items-center">
                    <input
                      type="radio"
                      name="collection"
                      value={collection}
                      checked={filters.collection === collection}
                      onChange={(e) => handleFilterChange('collection', e.target.value)}
                      className="h-4 w-4 text-gray-900 border-gray-300 focus:ring-gray-900"
                    />
                    <span className="ml-2 text-sm text-gray-700">{collection}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Price Range</h4>
              <select
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
              >
                {priceRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">Sort By</h4>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
              >
                <option value="name">Name</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <p className="text-sm text-gray-600">
              {products.length} product{products.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <svg className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4-8-4m16 0v10l-8 4-8-4V7" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Products Found</h3>
              <p className="text-gray-500 mb-4 text-sm sm:text-base px-4">
                {filters.collection || filters.priceRange ? 
                  'No products match your current filters. Try adjusting your search criteria.' :
                  'No products are currently available. Please check back later.'
                }
              </p>
              {(filters.collection || filters.priceRange) && (
                <button
                  onClick={() => {
                    setFilters({ collection: '', priceRange: '', sortBy: 'name' });
                    setSearchParams({});
                  }}
                  className="text-gray-900 hover:text-gray-700 font-medium text-sm"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {products.map((product) => (
                <Link
                  key={product._id}
                  to={`/products/${product._id}`}
                  className="group cursor-pointer"
                >
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3 sm:mb-4">
                    <img
                      src={getImageUrl(product.images?.[0])}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = '/images/placeholders/product-placeholder.jpg';
                      }}
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <h3 className="text-sm font-medium text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      {product.collection}
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      ${product.price?.toFixed(2) || '0.00'}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collections;
