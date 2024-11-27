import React, { useState } from "react";
import { FaShoppingCart, FaSearch, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { cart } = useSelector((state) => state.product);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="w-full bg-white border-b shadow-sm">
      {/* Announcement Bar */}
      <div className="bg-gray-900 text-white py-2.5">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-4">
            <span className="h-4 w-px bg-gray-600 hidden sm:inline"></span>
            <p className="text-sm font-medium text-center flex items-center gap-2">
              <span className="hidden sm:inline">🚚</span>
              Free shipping on orders over $50
              <span className="hidden sm:inline">|</span>
              <span className="text-blue-400">Express Delivery Available</span>
            </p>
            <span className="h-4 w-px bg-gray-600 hidden sm:inline"></span>
          </div>
        </div>
      </div>

      {/* Main Header Content */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-gray-800 min-w-[120px]"
          >
            ShoeStore
          </Link>

          {/* Center Search Bar */}
          <div className="hidden md:flex flex-1 justify-center max-w-2xl px-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full px-4 py-2.5 rounded-full border border-gray-300 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <FaSearch size={18} />
              </button>
            </div>
          </div>

          {/* Right Side Navigation */}
          <div className="flex items-center justify-end min-w-[120px]">
            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-600 hover:text-gray-800 p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <FaTimes size={24} /> : "☰"}
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="nav-link">
                Home
              </Link>
              <Link to="/listofproduct" className="nav-link">
                Products
              </Link>
              <Link to="/addproduct" className="nav-link">
                Add Product
              </Link>
              <Link to="/contact" className="nav-link">
                Contact
              </Link>
              <Link to="/cart" className="relative p-2">
                <FaShoppingCart className="text-2xl text-gray-700 hover:text-gray-900" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartCount}
                  </span>
                )}
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <nav
        className={`fixed inset-y-0 right-0 w-64 bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden z-50`}
      >
        <div className="p-6 space-y-6">
          {/* Mobile Search */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full px-4 py-2.5 rounded-full border border-gray-300 focus:border-gray-500 focus:outline-none"
            />
            <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          {/* Mobile Menu Items */}
          <ul className="space-y-4">
            <li>
              <Link to="/" className="mobile-nav-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/listofproduct" className="mobile-nav-link">
                Products
              </Link>
            </li>
            <li>
              <Link to="/addproduct" className="mobile-nav-link">
                Add Product
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                className="mobile-nav-link flex items-center justify-between"
              >
                <span>Cart</span>
                {cartCount > 0 && (
                  <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Menu Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </header>
  );
}

// Add these styles to your global CSS
const styles = `
  .nav-link {
    @apply text-gray-600 hover:text-gray-900 font-medium transition-colors;
  }

  .mobile-nav-link {
    @apply block text-gray-600 hover:text-gray-900 font-medium transition-colors py-2;
  }
`;
