import React from "react";
import { Link } from "react-router-dom";
import LazyImage from "../ui/LazyImage";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 lg:py-32">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Enhanced Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Enhanced Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold shadow-sm border border-blue-200/50">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              Trusted by 15,000+ Families Worldwide
            </div>

            {/* Enhanced Main Heading */}
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Where Learning Meets
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Fun & Adventure
              </span>
            </h1>

            {/* Enhanced Subheading */}
            <p className="text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Discover educational games, interactive content, and safe entertainment 
              designed to spark curiosity and foster learning in children of all ages.
            </p>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/products"
                className="group flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold"
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
                  <LazyImage
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
