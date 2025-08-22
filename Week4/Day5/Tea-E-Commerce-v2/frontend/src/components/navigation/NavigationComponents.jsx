import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SearchDropdown = ({ isOpen, onClose, searchQuery, setSearchQuery }) => {
  const searchRef = useRef(null);

  useEffect(() => {
    if (isOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isOpen]);

  // Mock search results - in real app, this would connect to your backend
  const mockResults = [
    { id: 1, name: 'Earl Grey', category: 'Black Tea', image: '/images/products/product-1.jpg' },
    { id: 2, name: 'Green Dragon Well', category: 'Green Tea', image: '/images/products/product-2.jpg' },
    { id: 3, name: 'Chamomile Dreams', category: 'Herbal Tea', image: '/images/products/product-3.jpg' },
  ].filter(item => 
    searchQuery && item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-neutral-200 rounded-lg shadow-lg z-50">
      <div className="p-4">
        <input
          ref={searchRef}
          type="text"
          placeholder="Search teas..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>
      
      {searchQuery && (
        <div className="border-t border-neutral-200">
          {mockResults.length > 0 ? (
            <div className="max-h-64 overflow-y-auto">
              {mockResults.map((item) => (
                <Link
                  key={item.id}
                  to={`/products/${item.id}`}
                  className="flex items-center p-3 hover:bg-neutral-50 transition-colors"
                  onClick={onClose}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 rounded object-cover mr-3"
                  />
                  <div>
                    <div className="font-medium text-neutral-900">{item.name}</div>
                    <div className="text-sm text-neutral-600">{item.category}</div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-neutral-600">
              No results found for "{searchQuery}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const NavigationDropdown = ({ title, items, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-neutral-200 rounded-lg shadow-lg z-50">
      <div className="py-2">
        {items.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="block px-4 py-2 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export { SearchDropdown, NavigationDropdown };
