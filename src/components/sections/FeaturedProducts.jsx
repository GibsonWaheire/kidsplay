import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../ui/ProductCard";
import Toast from "../ui/Toast";
import { dataService, fallbackData } from "../../lib/dataService";

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        setLoading(true);
        const data = await dataService.getFeaturedProducts();
        setFeaturedProducts(data.slice(0, 6));
      } catch (err) {
        console.error('Error loading featured products:', err);
        setError(err.message);
        // Use fallback data if Supabase is not available
        const fallbackFeatured = fallbackData.products.filter(p => p.featured).slice(0, 6);
        setFeaturedProducts(fallbackFeatured);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedProducts();
  }, []);

  const handleDownload = (product) => {
    // Simulate download process
    setToast({
      message: `Download started for ${product.title}!`,
      type: 'success'
    });
    
    // In a real app, you would trigger an actual download here
    // For now, we'll just show the toast
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

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-16">
              <div className="mb-6 md:mb-0">
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                  Featured Products
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl">
                  Hand-picked premium content for the best learning experience
                </p>
              </div>
              <Link
                to="/products"
                className="hidden md:inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                View All Products
                <span className="text-lg">→</span>
              </Link>
            </div>

            {/* Products Grid */}
            {featuredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {featuredProducts.map((product, index) => (
                  <div 
                    key={product.id} 
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <ProductCard 
                      product={product} 
                      onDownload={handleDownload} 
                      onAddToCart={handleAddToCart}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎮</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No featured products available</h3>
                <p className="text-gray-500">Check back soon for new featured content!</p>
              </div>
            )}

            {/* Mobile CTA */}
            <div className="text-center md:hidden">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                View All Products
                <span className="text-lg">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
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

export default FeaturedProducts; 