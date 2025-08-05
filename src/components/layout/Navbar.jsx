import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

// Simple icons, you can use react-icons or SVGs for a real app
const Hamburger = ({ open, onClick }) => (
  <button
    className="md:hidden p-2 focus:outline-none"
    onClick={onClick}
    aria-label="Toggle menu"
  >
    <span className={`block w-6 h-0.5 bg-gray-700 mb-1 transition-transform ${open ? 'rotate-45 translate-y-1.5' : ''}`} />
    <span className={`block w-6 h-0.5 bg-gray-700 mb-1 transition-transform ${open ? 'opacity-0' : ''}`} />
    <span className={`block w-6 h-0.5 bg-gray-700 transition-transform ${open ? '-rotate-45 -translate-y-1.5' : ''}`} />
  </button>
);

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Categories", path: "/categories" },
  { name: "Products", path: "/products" },
  { name: "Blog", path: "/blog" },
  { name: "About", path: "/about" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4 flex items-center justify-between">
        {/* Brand/Logo */}
        <Link to="/" className="font-bold text-xl text-blue-600">
          KidzPlay Connect
        </Link>
        {/* Desktop nav links */}
        <div className="hidden md:flex gap-6">
          {navLinks.map(link => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                "font-medium px-2 py-1 rounded transition-colors " +
                (isActive
                  ? "text-blue-700 bg-blue-100"
                  : "text-gray-700 hover:text-blue-600")
              }
              end={link.path === "/"}
            >
              {link.name}
            </NavLink>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <Link to="/cart" className="text-2xl" title="Cart">🛒</Link>
          <Link to="/login" className="text-2xl" title="Login">👤</Link>
          <Hamburger open={menuOpen} onClick={() => setMenuOpen(!menuOpen)} />
        </div>
      </div>
      {/* Mobile nav */}
      {menuOpen && (
        <div className="md:hidden bg-white/90 px-4 pb-4">
          {navLinks.map(link => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                "block font-medium px-2 py-2 rounded transition-colors " +
                (isActive
                  ? "text-blue-700 bg-blue-100"
                  : "text-gray-700 hover:text-blue-600")
              }
              end={link.path === "/"}
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
