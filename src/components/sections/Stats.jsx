import React from 'react';
import { stats } from '../../data/stats';

const Stats = () => {
  const getColorClasses = (color) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-50 border-blue-200 text-blue-600';
      case 'purple':
        return 'bg-purple-50 border-purple-200 text-purple-600';
      case 'yellow':
        return 'bg-yellow-50 border-yellow-200 text-yellow-600';
      case 'green':
        return 'bg-green-50 border-green-200 text-green-600';
      case 'orange':
        return 'bg-orange-50 border-orange-200 text-orange-600';
      case 'pink':
        return 'bg-pink-50 border-pink-200 text-pink-600';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-600';
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Families Worldwide
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands of families who have made KidzPlay Connect their go-to platform for educational entertainment
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                {/* Icon */}
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full border-2 flex items-center justify-center text-2xl ${getColorClasses(stat.color)}`}>
                  {stat.icon}
                </div>
                
                {/* Number */}
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                
                {/* Description */}
                <div className="text-sm text-gray-600 font-medium">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-8 bg-white rounded-2xl shadow-sm border border-gray-200 px-8 py-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔒</span>
                <span className="text-sm font-medium text-gray-700">100% Safe for Kids</span>
              </div>
              <div className="w-px h-8 bg-gray-200"></div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">✅</span>
                <span className="text-sm font-medium text-gray-700">COPPA Compliant</span>
              </div>
              <div className="w-px h-8 bg-gray-200"></div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎓</span>
                <span className="text-sm font-medium text-gray-700">Education Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats; 