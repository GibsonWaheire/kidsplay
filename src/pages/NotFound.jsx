import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-6">
      <div className="text-center max-w-2xl mx-auto">
        {/* 404 Icon */}
        <div className="mb-8">
          <span className="text-8xl">🎮</span>
        </div>

        {/* Error Message */}
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Oops! Page Not Found</h2>
        <p className="text-lg text-gray-600 mb-8">
          The page you're looking for seems to have wandered off to play some games! 
          Don't worry, we'll help you find your way back.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            🏠 Go Home
          </Link>
          <Link
            to="/products"
            className="bg-white text-gray-700 px-8 py-3 rounded-xl font-semibold border border-gray-200 hover:bg-gray-50 transition-all duration-200"
          >
            🎮 Explore Games
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="mt-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Pages</h3>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/categories"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Categories
            </Link>
            <Link
              to="/about"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              About Us
            </Link>
            <Link
              to="/blog"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Blog
            </Link>
            <Link
              to="/contact"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 