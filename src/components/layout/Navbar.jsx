import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../../context/CartContext";

// Enhanced hamburger with better animations
const Hamburger = ({ open, onClick }) => (
  <button
    className="md:hidden p-2 focus:outline-none rounded-lg hover:bg-gray-100 transition-colors duration-200"
    onClick={onClick}
    aria-label="Toggle menu"
  >
    <span className={`block w-6 h-0.5 bg-gray-700 mb-1.5 transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
    <span className={`block w-6 h-0.5 bg-gray-700 mb-1.5 transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
    <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
  </button>
);

const navLinks = [
  { name: "Home", path: "/", icon: "🏠" },
  { name: "Categories", path: "/categories", icon: "📂" },
  { name: "Products", path: "/products", icon: "🎮" },
  { name: "Blog", path: "/blog", icon: "📝" },
  { name: "About", path: "/about", icon: "ℹ️" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems } = useCart();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50' 
        : 'bg-white/80 backdrop-blur-sm shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4 flex items-center justify-between">
        {/* Enhanced Brand/Logo */}
        <Link 
          to="/" 
          className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center gap-2"
        >
          <span className="text-2xl">🎮</span>
          <span>KidzPlay Connect</span>
        </Link>

        {/* Enhanced Desktop nav links */}
        <div className="hidden md:flex gap-8">
          {navLinks.map(link => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `font-medium px-4 py-2 rounded-xl transition-all duration-300 flex items-center gap-2 group ${
                  isActive
                    ? "text-blue-700 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 shadow-sm"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`
              }
              end={link.path === "/"}
            >
              <span className="text-lg group-hover:scale-110 transition-transform duration-300">
                {link.icon}
              </span>
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Enhanced Action buttons */}
        <div className="flex items-center gap-4">
          <Link 
            to="/cart" 
            className="relative p-2 rounded-xl hover:bg-gray-100 transition-all duration-300 group"
            title="Cart"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform duration-300">🛒</span>
            {/* Cart badge */}
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </Link>
          
          <Link 
            to="/login" 
            className="p-2 rounded-xl hover:bg-gray-100 transition-all duration-300 group"
            title="Login"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform duration-300">👤</span>
          </Link>
          
          <Hamburger open={menuOpen} onClick={() => setMenuOpen(!menuOpen)} />
        </div>
      </div>

      {/* Enhanced Mobile nav */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${
        menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-white/95 backdrop-blur-md border-t border-gray-200/50 px-6 py-4 space-y-2">
          {navLinks.map(link => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block font-medium px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 ${
                  isActive
                    ? "text-blue-700 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 shadow-sm"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`
              }
              end={link.path === "/"}
            >
              <span className="text-xl">{link.icon}</span>
              {link.name}
            </NavLink>
          ))}
          
          {/* Mobile action buttons */}
          <div className="flex gap-4 pt-4 border-t border-gray-200/50">
            <Link 
              to="/cart" 
              className="flex-1 flex items-center justify-center gap-2 bg-blue-50 text-blue-700 px-4 py-3 rounded-xl font-medium hover:bg-blue-100 transition-colors duration-300"
            >
              <span className="text-xl">🛒</span>
              Cart ({totalItems})
            </Link>
            <Link 
              to="/login" 
              className="flex-1 flex items-center justify-center gap-2 bg-gray-50 text-gray-700 px-4 py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors duration-300"
            >
              <span className="text-xl">👤</span>
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
