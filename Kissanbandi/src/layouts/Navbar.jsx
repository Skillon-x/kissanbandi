import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, Search, User, ChevronDown } from 'lucide-react';
import { useCart } from '../pages/checkout/CartContext';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { state } = useCart();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const cartCount = state.items.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    {
      name: 'Fruits',
      subcategories: ['Seasonal Fruits', 'Exotic Fruits', 'Organic Fruits']
    },
    {
      name: 'Vegetables',
      subcategories: ['Fresh Vegetables', 'Organic Vegetables', 'Root Vegetables']
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Top bar with contact info */}
      <div className={`hidden md:block bg-green-50 transition-all duration-300 ${
        isScrolled ? 'h-0 overflow-hidden' : 'py-2'
      }`}>
        <div className="container mx-auto px-4">
          <div className="text-sm text-green-800 text-center">
            Free delivery on orders above ₹500 | Support: +91 1234567890
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav className={`bg-white shadow-lg transition-all duration-300 ${
        isScrolled ? 'shadow-md' : ''
      }`}>
        <div className="container mx-auto px-4">
          <div className={`flex justify-between items-center transition-all duration-300 ${
            isScrolled ? 'h-16' : 'h-20'
          }`}>
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-green-700 hover:text-green-800">
              KissanBandi
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {categories.map((category) => (
                <div key={category.name} className="relative group">
                  <button className="flex items-center space-x-1 text-gray-700 hover:text-green-600">
                    <span>{category.name}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <div className="absolute top-full left-0 transform opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 ease-in-out">
                    <div className="bg-white shadow-lg rounded-lg mt-2 py-2 w-48">
                      {category.subcategories.map((sub) => (
                        <Link
                          key={sub}
                          to={`/category/${category.name.toLowerCase()}/${sub.toLowerCase().replace(/\s+/g, '-')}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
                        >
                          {sub}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Search bar - Desktop */}
            <div className="hidden md:flex items-center flex-1 max-w-xl mx-8">
              <form onSubmit={handleSearch} className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for fresh produce..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-green-500"
                />
                <button type="submit" className="absolute right-4 top-2.5 text-gray-400 hover:text-green-500">
                  <Search className="w-5 h-5" />
                </button>
              </form>
            </div>

            {/* Right side icons */}
            <div className="flex items-center space-x-6">
              <Link to="/signup" className="hidden md:flex items-center text-gray-700 hover:text-green-600">
                <User className="w-6 h-6" />
              </Link>
              <button 
                className="flex items-center text-gray-700 hover:text-green-600"
                onClick={() => navigate('/checkout')}
              >
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="ml-1 bg-green-500 text-white text-xs rounded-full px-2 py-0.5">
                    {cartCount}
                  </span>
                )}
              </button>
              <button
                className="md:hidden text-gray-700"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden px-4 pb-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search for fresh produce..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-green-500"
            />
            <button type="submit" className="absolute right-4 top-2.5 text-gray-400 hover:text-green-500">
              <Search className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden bg-white ${
            isOpen ? 'block' : 'hidden'
          } shadow-lg`}
        >
          {categories.map((category) => (
            <div key={category.name} className="px-4 py-2">
              <div className="font-medium text-gray-700">{category.name}</div>
              <div className="ml-4 mt-1">
                {category.subcategories.map((sub) => (
                  <Link
                    key={sub}
                    to={`/category/${category.name.toLowerCase()}/${sub.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block py-2 text-sm text-gray-600 hover:text-green-600"
                    onClick={() => setIsOpen(false)}
                  >
                    {sub}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;