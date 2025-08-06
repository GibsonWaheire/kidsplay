import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ui/ProductCard";
import Toast from "../components/ui/Toast";
import { specialNeedsProducts, accessibilityCategories } from "../data/specialNeedsProducts";

const SpecialNeeds = () => {
  const [toast, setToast] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts = selectedCategory === "all" 
    ? specialNeedsProducts 
    : specialNeedsProducts.filter(product => 
        product.accessibilityFeatures.some(feature => 
          accessibilityCategories.find(cat => cat.name.toLowerCase().includes(selectedCategory))
            ?.features.some(catFeature => feature.toLowerCase().includes(catFeature.toLowerCase()))
        )
      );

  const handleDownload = (product) => {
    setToast({
      message: `Download started for ${product.title}!`,
      type: 'success'
    });
  };

  const handleAddToCart = (product) => {
    setToast({
      message: `${product.title} added to cart!`,
      type: 'success'
    });
  };

  const handleToastClose = () => {
    setToast(null);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
        {/* Header */}
        <section className="py-16 bg-gradient-to-r from-teal-600 to-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                Special Needs & Accessibility Support
              </h1>
              <p className="text-xl text-teal-100 max-w-3xl mx-auto mb-8">
                Inclusive learning tools and games designed specifically for children with diverse abilities and learning needs
              </p>
              
              {/* Accessibility Promise */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-4xl mx-auto border border-white/20">
                <h2 className="text-2xl font-bold mb-4">Our Accessibility Promise</h2>
                <p className="text-teal-100">
                  Every child deserves access to quality education and fun learning experiences. Our specially designed tools support children with visual, hearing, cognitive, and motor challenges, ensuring no child is left behind in their learning journey.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Accessibility Categories */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Accessibility Categories
              </h2>
              <p className="text-xl text-gray-600">
                Find tools tailored to specific accessibility needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {accessibilityCategories.map((category) => (
                <div
                  key={category.name}
                  className={`bg-white rounded-xl p-6 shadow-sm border-2 transition-all duration-300 hover:shadow-lg cursor-pointer ${
                    selectedCategory === category.name.toLowerCase().split(' ')[0]
                      ? 'border-teal-500 bg-teal-50'
                      : 'border-gray-200 hover:border-teal-300'
                  }`}
                  onClick={() => setSelectedCategory(
                    selectedCategory === category.name.toLowerCase().split(' ')[0] 
                      ? "all" 
                      : category.name.toLowerCase().split(' ')[0]
                  )}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setSelectedCategory(
                        selectedCategory === category.name.toLowerCase().split(' ')[0] 
                          ? "all" 
                          : category.name.toLowerCase().split(' ')[0]
                      );
                    }
                  }}
                  aria-label={`Filter by ${category.name}`}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl" role="img" aria-label={category.name}>
                        {category.icon}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{category.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{category.description}</p>
                    <div className="text-sm text-teal-600 font-medium">
                      {category.productCount} tools available
                    </div>
                    
                    {/* Features */}
                    <div className="mt-3 flex flex-wrap gap-1 justify-center">
                      {category.features.slice(0, 2).map((feature) => (
                        <span key={feature} className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-full">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Filter Reset */}
            {selectedCategory !== "all" && (
              <div className="text-center mb-8">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className="text-teal-600 hover:text-teal-700 font-medium underline"
                >
                  Show All Products
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Products Grid */}
        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Accessible Learning Tools
              </h2>
              <p className="text-xl text-gray-600">
                {filteredProducts.length} products designed with accessibility in mind
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product, index) => (
                  <div 
                    key={product.id} 
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative">
                      <ProductCard 
                        product={product} 
                        onDownload={handleDownload} 
                        onAddToCart={handleAddToCart}
                      />
                      
                      {/* Accessibility Features Overlay */}
                      <div className="mt-4 bg-teal-50 rounded-lg p-3 border border-teal-200">
                        <p className="text-xs font-semibold text-teal-700 mb-2">
                          Accessibility Features:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {product.accessibilityFeatures.slice(0, 3).map((feature) => (
                            <span 
                              key={feature} 
                              className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-full"
                            >
                              {feature}
                            </span>
                          ))}
                          {product.accessibilityFeatures.length > 3 && (
                            <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-full">
                              +{product.accessibilityFeatures.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4" role="img" aria-label="No results">🔍</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">
                  Try selecting a different accessibility category or view all products.
                </p>
                <button
                  onClick={() => setSelectedCategory("all")}
                  className="bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
                >
                  Show All Products
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Support Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Need Additional Support?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Our accessibility team is here to help you find the perfect tools for your child's unique needs.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-teal-50 rounded-xl p-6 border border-teal-200">
                <h3 className="font-bold text-lg text-gray-900 mb-3">
                  Accessibility Consultation
                </h3>
                <p className="text-gray-600 mb-4">
                  Get personalized recommendations from our accessibility experts.
                </p>
                <Link
                  to="/accessibility-consultation"
                  className="bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors inline-block"
                >
                  Schedule Consultation
                </Link>
              </div>
              
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h3 className="font-bold text-lg text-gray-900 mb-3">
                  Special Needs Tutors
                </h3>
                <p className="text-gray-600 mb-4">
                  Connect with certified tutors who specialize in special needs education.
                </p>
                <Link
                  to="/tutors?specialty=special-needs"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
                >
                  Find Specialist Tutors
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={handleToastClose}
        />
      )}
    </>
  );
};

export default SpecialNeeds;