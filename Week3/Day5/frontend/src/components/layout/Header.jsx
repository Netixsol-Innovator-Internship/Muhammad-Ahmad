import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { SearchDropdown, NavigationDropdown } from '../navigation/NavigationComponents';
import CartSidebar from '../cart/CartSidebar';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { isAuthenticated, user, logout } = useAuth();
  const { itemCount } = useCart();
  const location = useLocation();

  const navigationLinks = [
    { 
      name: 'TEA COLLECTIONS', 
      path: '/collections',
      dropdown: [
        { name: 'Black Tea', path: '/collections?collection=Black Tea' },
        { name: 'Green Tea', path: '/collections?collection=Green Tea' },
        { name: 'White Tea', path: '/collections?collection=White Tea' },
        { name: 'Oolong Tea', path: '/collections?collection=Oolong' },
        { name: 'Herbal Tea', path: '/collections?collection=Herbal Tea' },
        { name: 'Matcha', path: '/collections?collection=Matcha' },
        { name: 'Chai', path: '/collections?collection=Chai' },
        { name: 'Teaware', path: '/collections?collection=Teaware' },
      ]
    },
    { name: 'ACCESSORIES', path: '/collections?collection=Teaware' },
    { name: 'BLOG', path: '/blog' },
    { name: 'CONTACT US', path: '/contact' },
  ];

  const isActivePath = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <div className="flex items-center">
                <svg className="w-8 h-8 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10 9 11 1.09-.21 2.12-.56 3.03-1.03C14.6 26.59 14.13 26.31 13.63 26 13.13 25.69 12.59 25.32 12 24.9 12 24.9 12 24.9 12 24.9c-.59.42-1.13.79-1.63 1.1-.5.31-.97.59-1.4.84.86.22 1.76.38 2.7.47.18-.07.36-.15.54-.23C16.04 25.96 19 22.05 19 17V7L12 2z"/>
                </svg>
                <span className="ml-2 text-lg font-medium text-gray-900">Brand Name</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-12">
            {navigationLinks.map((link) => (
              <div 
                key={link.name}
                className="relative"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={link.path}
                  className={`text-sm font-medium tracking-wide transition-colors ${
                    isActivePath(link.path)
                      ? 'text-gray-900'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  {link.name}
                </Link>
                
                {link.dropdown && (
                  <NavigationDropdown
                    title={link.name}
                    items={link.dropdown}
                    isOpen={activeDropdown === link.name}
                  />
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Search */}
            <div className="relative">
              <button 
                className="p-1 text-gray-700 hover:text-gray-900 transition-colors"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              
              <SearchDropdown
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>

            {/* User Account */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-1 p-1 text-gray-700 hover:text-gray-900 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-2">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="p-1 text-gray-700 hover:text-gray-900 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
            )}

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-1 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m-2.4 0L3 3H1m6 10v6a1 1 0 001 1h8a1 1 0 001-1v-6M7 13L5.4 5H21l-4 8H7z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-neutral-600 hover:text-primary-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-neutral-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                    isActivePath(link.path)
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-neutral-600 hover:text-primary-600 hover:bg-neutral-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              <hr className="my-3" />
              
              {isAuthenticated ? (
                <div className="space-y-1">
                  <Link
                    to="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 text-base font-medium text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 rounded-md"
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={() => {
                      setIsCartOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-between w-full px-3 py-2 text-base font-medium text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 rounded-md"
                  >
                    <span>Cart</span>
                    {itemCount > 0 && (
                      <span className="bg-primary-600 text-white text-xs rounded-full px-2 py-1">
                        {itemCount}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 rounded-md"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 text-base font-medium text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 rounded-md"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 text-base font-medium bg-primary-600 text-white rounded-md hover:bg-primary-700"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Cart Sidebar */}
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
    </header>
  );
};

export default Header;
