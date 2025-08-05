import React from "react";
import { Link } from "react-router-dom";

const categories = [
  {
    icon: "🎮",
    name: "Educational Games",
    desc: "Interactive learning games for children",
    color: "bg-blue-50 border-blue-200",
    iconBg: "bg-blue-100",
    count: "50+ Games"
  },
  {
    icon: "🌱",
    name: "Adventure Games",
    desc: "Exciting adventure games for kids",
    color: "bg-green-50 border-green-200",
    iconBg: "bg-green-100",
    count: "30+ Games"
  },
  {
    icon: "🎨",
    name: "Creative Software",
    desc: "Tools for creativity and imagination",
    color: "bg-purple-50 border-purple-200",
    iconBg: "bg-purple-100",
    count: "25+ Tools"
  },
  {
    icon: "📖",
    name: "Digital Books",
    desc: "Interactive digital books and stories",
    color: "bg-orange-50 border-orange-200",
    iconBg: "bg-orange-100",
    count: "100+ Books"
  },
  {
    icon: "🧩",
    name: "Game Bundles",
    desc: "Value packs with multiple games",
    color: "bg-pink-50 border-pink-200",
    iconBg: "bg-pink-100",
    count: "15+ Bundles"
  },
  {
    icon: "🎯",
    name: "Puzzle Games",
    desc: "Brain-teasing puzzles and logic games",
    color: "bg-indigo-50 border-indigo-200",
    iconBg: "bg-indigo-100",
    count: "40+ Puzzles"
  }
];

const ExploreCategories = () => (
  <section className="w-full py-20 bg-gradient-to-br from-gray-50 to-white">
    <div className="max-w-7xl mx-auto px-6">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Explore by Category
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover amazing digital content tailored for different interests and age groups
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat, index) => (
          <div
            key={cat.name}
            className={`group bg-white border-2 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${cat.color} hover:border-gray-300`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Icon */}
            <div className={`w-16 h-16 ${cat.iconBg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
              <span className="text-3xl">{cat.icon}</span>
            </div>

            {/* Content */}
            <div className="space-y-3">
              <h3 className="font-bold text-xl text-gray-900 group-hover:text-gray-700 transition-colors">
                {cat.name}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {cat.desc}
              </p>
              <div className="flex items-center justify-between pt-4">
                <span className="text-sm font-medium text-gray-500 bg-white px-3 py-1 rounded-full shadow-sm">
                  {cat.count}
                </span>
                <Link 
                  to={`/categories/${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="flex items-center text-blue-600 hover:text-blue-700 font-semibold group-hover:translate-x-1 transition-transform duration-300"
                >
                  Explore 
                  <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="flex justify-center mt-16">
        <Link
          to="/categories"
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center group"
        >
          View All Categories 
          <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
        </Link>
      </div>
    </div>
  </section>
);

export default ExploreCategories; 