import React from "react";
import { Link } from "react-router-dom";
import { categories } from "../../data/categories";

const ExploreCategories = () => (
  <section className="w-full py-20 bg-gradient-to-br from-gray-50 to-white">
    <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
      <div className="max-w-7xl mx-auto">
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
              className={`group bg-white border-2 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${cat.color} hover:border-gray-300 ${cat.featured ? 'ring-2 ring-teal-400 ring-opacity-50' : ''} relative`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Featured Badge */}
              {cat.featured && (
                <div className="absolute top-4 right-4 bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                  Inclusive
                </div>
              )}

              {/* Icon */}
              <div className={`w-16 h-16 ${cat.iconBg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-3xl" role="img" aria-label={cat.name}>{cat.icon}</span>
              </div>

              {/* Content */}
              <div className="space-y-3">
                <h3 className="font-bold text-xl text-gray-900 group-hover:text-gray-700 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {cat.desc}
                </p>
                
                {/* Accessibility Features */}
                {cat.accessibilityFeatures && (
                  <div className="pt-2">
                    <p className="text-xs font-semibold text-teal-700 mb-2">Accessibility Features:</p>
                    <div className="flex flex-wrap gap-1">
                      {cat.accessibilityFeatures.slice(0, 2).map((feature) => (
                        <span key={feature} className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-full">
                          {feature}
                        </span>
                      ))}
                      {cat.accessibilityFeatures.length > 2 && (
                        <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-full">
                          +{cat.accessibilityFeatures.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4">
                  <span className="text-sm font-medium text-gray-500 bg-white px-3 py-1 rounded-full shadow-sm">
                    {cat.count}
                  </span>
                  <Link 
                    to={`/categories/${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="flex items-center text-blue-600 hover:text-blue-700 font-semibold group-hover:translate-x-1 transition-transform duration-300"
                    aria-label={`Explore ${cat.name} category`}
                  >
                    Explore 
                    <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true">→</span>
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
    </div>
  </section>
);

export default ExploreCategories; 