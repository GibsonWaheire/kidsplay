import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';

const Categories = () => {
  const [selectedAge, setSelectedAge] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const categories = [
    {
      id: 1,
      name: "Educational Games",
      icon: "🎮",
      description: "Interactive learning games for children",
      color: "bg-blue-50 border-blue-200",
      iconBg: "bg-blue-100",
      count: "50+ Games",
      ageGroups: ["3-5", "6-8", "9-12", "13-16"],
      type: "games",
      featured: true,
      image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400"
    },
    {
      id: 2,
      name: "Adventure Games",
      icon: "🌱",
      description: "Exciting adventure games for kids",
      color: "bg-green-50 border-green-200",
      iconBg: "bg-green-100",
      count: "30+ Games",
      ageGroups: ["6-8", "9-12", "13-16"],
      type: "games",
      featured: false,
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400"
    },
    {
      id: 3,
      name: "Creative Software",
      icon: "🎨",
      description: "Tools for creativity and imagination",
      color: "bg-purple-50 border-purple-200",
      iconBg: "bg-purple-100",
      count: "25+ Tools",
      ageGroups: ["6-8", "9-12", "13-16", "17+"],
      type: "software",
      featured: true,
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400"
    },
    {
      id: 4,
      name: "Digital Books",
      icon: "📖",
      description: "Interactive digital books and stories",
      color: "bg-orange-50 border-orange-200",
      iconBg: "bg-orange-100",
      count: "100+ Books",
      ageGroups: ["3-5", "6-8", "9-12"],
      type: "books",
      featured: false,
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400"
    },
    {
      id: 5,
      name: "Game Bundles",
      icon: "🧩",
      description: "Value packs with multiple games",
      color: "bg-pink-50 border-pink-200",
      iconBg: "bg-pink-100",
      count: "15+ Bundles",
      ageGroups: ["3-5", "6-8", "9-12", "13-16"],
      type: "bundles",
      featured: true,
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400"
    },
    {
      id: 6,
      name: "Puzzle Games",
      icon: "🎯",
      description: "Brain-teasing puzzles and logic games",
      color: "bg-indigo-50 border-indigo-200",
      iconBg: "bg-indigo-100",
      count: "40+ Puzzles",
      ageGroups: ["6-8", "9-12", "13-16"],
      type: "games",
      featured: false,
      image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400"
    },
    {
      id: 7,
      name: "Science & STEM",
      icon: "🔬",
      description: "Science experiments and STEM learning",
      color: "bg-yellow-50 border-yellow-200",
      iconBg: "bg-yellow-100",
      count: "35+ Activities",
      ageGroups: ["6-8", "9-12", "13-16"],
      type: "educational",
      featured: true,
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400"
    },
    {
      id: 8,
      name: "Language Learning",
      icon: "🌍",
      description: "Interactive language learning programs",
      color: "bg-teal-50 border-teal-200",
      iconBg: "bg-teal-100",
      count: "20+ Languages",
      ageGroups: ["3-5", "6-8", "9-12", "13-16"],
      type: "educational",
      featured: false,
      image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400"
    }
  ];

  const ageGroups = [
    { id: 'all', name: 'All Ages' },
    { id: '3-5', name: '3-5 Years' },
    { id: '6-8', name: '6-8 Years' },
    { id: '9-12', name: '9-12 Years' },
    { id: '13-16', name: '13-16 Years' },
    { id: '17+', name: '17+ Years' }
  ];

  const types = [
    { id: 'all', name: 'All Types' },
    { id: 'games', name: 'Games' },
    { id: 'software', name: 'Software' },
    { id: 'books', name: 'Books' },
    { id: 'bundles', name: 'Bundles' },
    { id: 'educational', name: 'Educational' }
  ];

  // Filter categories based on selected filters
  const filteredCategories = categories.filter(category => {
    const ageMatch = selectedAge === 'all' || category.ageGroups.includes(selectedAge);
    const typeMatch = selectedType === 'all' || category.type === selectedType;
    return ageMatch && typeMatch;
  });

  return (
    <PageContainer className="py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Explore Categories
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover amazing digital content tailored for different interests and age groups
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Age Filter */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Age Group
            </label>
            <select
              value={selectedAge}
              onChange={(e) => setSelectedAge(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {ageGroups.map((age) => (
                <option key={age.id} value={age.id}>
                  {age.name}
                </option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {types.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-8">
        <p className="text-gray-600">
          Showing {filteredCategories.length} of {categories.length} categories
        </p>
      </div>

      {/* Categories Grid */}
      {filteredCategories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCategories.map((category, index) => (
            <div 
              key={category.id} 
              className={`group bg-white border-2 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${category.color} hover:border-gray-300`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Category Image */}
              <div className="relative mb-6">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-48 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                />
                {category.featured && (
                  <span className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Featured
                  </span>
                )}
              </div>

              {/* Icon */}
              <div className={`w-16 h-16 ${category.iconBg} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-3xl">{category.icon}</span>
              </div>

              {/* Content */}
              <div className="space-y-3">
                <h3 className="font-bold text-xl text-gray-900 group-hover:text-gray-700 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {category.description}
                </p>
                
                {/* Age Groups */}
                <div className="flex flex-wrap gap-2">
                  {category.ageGroups.map((age) => (
                    <span
                      key={age}
                      className="text-xs bg-white px-2 py-1 rounded-full text-gray-600 font-medium shadow-sm"
                    >
                      {age}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4">
                  <span className="text-sm font-medium text-gray-500 bg-white px-3 py-1 rounded-full shadow-sm">
                    {category.count}
                  </span>
                  <Link 
                    to={`/products?category=${category.name.toLowerCase().replace(/\s+/g, '-')}`}
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
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No categories found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your filters</p>
          <button
            onClick={() => {
              setSelectedAge('all');
              setSelectedType('all');
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* CTA Section */}
      <div className="mt-16 text-center">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Can't find what you're looking for?
          </h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Our team is constantly adding new categories and content. Let us know what you'd like to see!
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg">
            Suggest New Category
          </button>
        </div>
      </div>
    </PageContainer>
  );
};

export default Categories; 