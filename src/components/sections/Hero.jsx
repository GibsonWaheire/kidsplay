import React from "react";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-r from-orange-200/15 to-yellow-200/15 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10 py-20 lg:py-32 px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in lg:text-left text-center">
            <div className="space-y-6">
              {/* Enhanced Badge */}
              <span className="inline-block bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-700 text-sm font-semibold px-4 py-2 rounded-full shadow-lg border border-orange-200 hover:scale-105 transition-transform duration-300">
                🎮 New Platform Launch
              </span>
              
              {/* Enhanced Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Premium 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 block animate-gradient">
                  Digital Content
                </span>
                for Children
              </h1>
              
              {/* Enhanced Description */}
              <p className="text-xl text-gray-600 max-w-lg lg:mx-0 mx-auto leading-relaxed">
                Discover amazing educational games, creative software, and interactive content. 
        
              </p>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 lg:justify-start justify-center">
              <Link
                to="/products"
                className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center"
              >
                Explore Products
                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Link>
              <a
                href="#"
                className="group flex items-center justify-center border-2 border-gray-300 text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 hover:border-gray-400 transition-all duration-300 bg-white/80 backdrop-blur"
              >
                <span className="mr-2 group-hover:scale-110 transition-transform duration-300">▶️</span> 
                Watch Demo
              </a>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200/50">
              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-center space-x-1 text-yellow-500 mb-2 group-hover:scale-110 transition-transform duration-300">
                  {Array(5).fill().map((_, i) => (
                    <span key={i} className="animate-pulse" style={{ animationDelay: `${i * 100}ms` }}>★</span>
                  ))}
                </div>
                <p className="text-3xl font-bold text-gray-900">4.9</p>
                <p className="text-sm text-gray-500 font-medium">Average Rating</p>
              </div>
              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-center mb-2">
                  <span className="text-blue-500 text-2xl group-hover:scale-110 transition-transform duration-300">⬇️</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">50K+</p>
                <p className="text-sm text-gray-500 font-medium">Downloads</p>
              </div>
              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-center mb-2">
                  <span className="text-purple-500 text-2xl group-hover:scale-110 transition-transform duration-300">👨‍👩‍👧‍👦</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">15K+</p>
                <p className="text-sm text-gray-500 font-medium">Happy Families</p>
              </div>
            </div>
          </div>

          {/* Enhanced Hero Image/Visual */}
          <div className="relative animate-bounce-in w-full max-w-lg mx-auto lg:mx-0 px-2">
            <div className="relative">
              <div className="aspect-square max-w-lg mx-auto relative">
                {/* Enhanced Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-3xl blur-xl transform rotate-6 animate-pulse"></div>
                
                {/* Enhanced Main Card */}
                <div className="relative bg-gradient-to-br from-white via-gray-50 to-white rounded-3xl p-8 shadow-2xl transform -rotate-3 hover:rotate-0 transition-all duration-500 hover:shadow-3xl border border-gray-100">
                  <img
                    src="https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=600&h=600&fit=crop"
                    alt="Children using educational technology"
                    className="w-full h-full object-cover rounded-2xl shadow-lg"
                  />
                  
                  {/* Enhanced Floating Elements */}
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-xl animate-bounce hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">★</span>
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-purple-400 to-purple-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-xl animate-pulse hover:scale-110 transition-transform duration-300">
                    <span className="text-xl">▶️</span>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Floating Cards */}
              <div className="absolute top-8 -left-8 bg-white/90 backdrop-blur border border-gray-200 rounded-2xl p-4 shadow-xl max-w-xs animate-float hidden lg:block hover:scale-105 transition-transform duration-300">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl flex items-center justify-center text-2xl shadow-sm">
                    🎮
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-gray-900">Math Adventure</p>
                    <p className="text-xs text-gray-500">4.9 ⭐ (127 reviews)</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-8 -right-8 bg-white/90 backdrop-blur border border-gray-200 rounded-2xl p-4 shadow-xl max-w-xs animate-float delay-1000 hidden lg:block hover:scale-105 transition-transform duration-300">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-purple-200 rounded-xl flex items-center justify-center text-2xl shadow-sm">
                    🎨
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-gray-900">Creative Studio</p>
                    <p className="text-xs text-gray-500">Best Seller</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
