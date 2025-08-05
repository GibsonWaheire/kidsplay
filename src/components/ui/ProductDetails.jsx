import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useNotifications } from '../../hooks/useNotifications';
import { products } from '../../data/mockData';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { addCartItemAdded, addDownloadReady } = useNotifications();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <Link
            to="/products"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors duration-200"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    addCartItemAdded(product.title);
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
          <img
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
              {Array(Math.round(product.rating)).fill("★").join("")}
              <span className="ml-2 text-gray-700 font-medium">{product.rating}</span>
            </div>
            <span className="bg-gray-100 px-3 py-1 rounded-full text-gray-700 font-medium">
              {product.age}
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
                <p className="text-gray-600 mt-1">No payment required</p>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-blue-600">${product.price}</span>
                {product.oldPrice && (
                  <span className="text-2xl line-through text-gray-400">${product.oldPrice}</span>
                )}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="space-y-4">
            {product.price === 0 ? (
              <button
                onClick={handleDownload}
                className="w-full bg-green-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-green-700 transition-colors duration-200"
              >
                Download Now
              </button>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="font-medium text-gray-700">Quantity:</label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Add to Cart
                </button>
              </div>
            )}
          </div>

          {/* Back to Products */}
          <div className="border-t border-gray-200 pt-6">
            <Link
              to="/products"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Back to Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails; 