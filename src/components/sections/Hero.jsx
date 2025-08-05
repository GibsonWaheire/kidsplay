import React from "react";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-gray-100/30 to-white">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-200/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10 py-20 lg:py-32 px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in lg:text-left text-center">
            <div className="space-y-4">
              <span className="inline-block bg-orange-100 text-orange-700 text-sm font-semibold px-3 py-1 rounded mb-2 shadow">
                🎮 New Platform Launch
              </span>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Premium 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 block">
                  Digital Content
                </span>
                for Children
              </h1>
              
              <p className="text-xl text-gray-600 max-w-lg lg:mx-0 mx-auto">
                Discover amazing educational games, creative software, and interactive content. 
                Supporting both KES and USD for global accessibility.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 lg:justify-start justify-center">
              <Link
                to="/products"
                className="bg-orange-400 hover:bg-orange-500 text-white text-lg font-semibold px-8 py-3 rounded shadow transition"
              >
                Explore Products
              </Link>
              <a
                href="#"
                className="flex items-center justify-center border border-gray-300 text-lg px-8 py-3 rounded shadow hover:bg-gray-100 transition"
              >
                <span className="mr-2">▶️</span> Watch Demo
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200/50">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-yellow-500 mb-1">
                  {Array(5).fill().map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="text-2xl font-bold">4.9</p>
                <p className="text-sm text-gray-400">Average Rating</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <span className="text-blue-500 text-xl">⬇️</span>
                </div>
                <p className="text-2xl font-bold">50K+</p>
                <p className="text-sm text-gray-400">Downloads</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <span className="text-purple-500 text-xl">👨‍👩‍👧‍👦</span>
                </div>
                <p className="text-2xl font-bold">15K+</p>
                <p className="text-sm text-gray-400">Happy Families</p>
              </div>
            </div>
          </div>

          {/* Hero Image/Visual */}
          <div className="relative animate-bounce-in w-full max-w-lg mx-auto lg:mx-0 px-2">
            <div className="relative">
              <div className="aspect-square max-w-lg mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-3xl blur-xl transform rotate-6"></div>
                <div className="relative bg-gradient-to-br from-white to-gray-100 rounded-3xl p-8 shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                  <img
                    src="https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=600&h=600&fit=crop"
                    alt="Children using educational technology"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg animate-bounce">
                    <span className="text-3xl">★</span>
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-purple-400 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg animate-pulse">
                    <span className="text-xl">▶️</span>
                  </div>
                </div>
              </div>
              {/* Floating Cards */}
              <div className="absolute top-8 -left-8 bg-white border border-gray-200 rounded-xl p-4 shadow-lg max-w-xs animate-float hidden lg:block">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">
                    🎮
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Math Adventure</p>
                    <p className="text-xs text-gray-400">4.9 ⭐ (127 reviews)</p>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-8 -right-8 bg-white border border-gray-200 rounded-xl p-4 shadow-lg max-w-xs animate-float delay-1000 hidden lg:block">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-2xl">
                    🎨
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Creative Studio</p>
                    <p className="text-xs text-gray-400">Best Seller</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End Visual */}
        </div>
      </div>
    </section>
  );
}

export default Hero;
