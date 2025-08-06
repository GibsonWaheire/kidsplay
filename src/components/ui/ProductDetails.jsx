import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useNotifications } from "../../hooks/useNotifications";
import { dataService, fallbackData } from "../../lib/dataService";
import LazyImage from "./LazyImage";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { addCartItemAdded, addDownloadReady } = useNotifications();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await dataService.getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error('Error loading product:', err);
        setError(err.message);
        // Use fallback data if Supabase is not available
        const fallbackProduct = fallbackData.products.find(p => p.id === parseInt(id));
        setProduct(fallbackProduct);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error && !product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error loading product</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    addCartItemAdded(`${quantity} ${quantity === 1 ? 'item' : 'items'} added to cart`);
  };

  const handleDownload = () => {
    addDownloadReady(product.title);
    alert(`Download started for ${product.title}!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative">
          <LazyImage
            src={product.image}
            alt={product.title}
            className="w-full h-96 object-cover rounded-2xl shadow-lg"
          />
          {product.badge && (
            <span className={`absolute top-4 left-4 text-sm font-bold px-4 py-2 rounded-full ${
              product.badge === "Free" ? "bg-green-100 text-green-700" :
              product.badge === "Sale" ? "bg-red-100 text-red-700" :
              product.badge === "Popular" ? "bg-blue-100 text-blue-700" :
              product.badge === "New" ? "bg-purple-100 text-purple-700" :
              "bg-orange-100 text-orange-700"
            }`}>
              {product.badge}
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.title}</h1>
            <p className="text-gray-600 text-lg">{product.description}</p>
          </div>

          {/* Rating and Age */}
          <div className="flex items-center gap-4">
            <div className="flex items-center text-yellow-500">
              {Array(Math.round(product.rating || 0)).fill("★").join("")}
              <span className="ml-2 text-gray-700 font-medium">{product.rating || 0}</span>
            </div>
            <span className="bg-gray-100 px-3 py-1 rounded-full text-gray-700 font-medium">
              {product.age_range || product.age}
            </span>
          </div>

          {/* Platforms */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Available Platforms</h3>
            <div className="flex flex-wrap gap-2">
              {product.platforms &&
                product.platforms.map((platform) => (
                  <span
                    key={platform}
                    className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {platform}
                  </span>
                ))}
            </div>
          </div>

          {/* Price */}
          <div className="border-t border-gray-200 pt-6">
            {product.price === 0 ? (
              <div className="text-center">
                <span className="text-3xl font-bold text-green-600">Free</span>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                {product.old_price && (
                  <span className="text-xl text-gray-500 line-through">${product.old_price}</span>
                )}
              </div>
            )}
          </div>

          {/* Quantity and Actions */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="font-semibold text-gray-900">Quantity:</label>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-gray-100 transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 hover:bg-gray-100 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Add to Cart
              </button>
              <button
                onClick={handleDownload}
                className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Download Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails; 