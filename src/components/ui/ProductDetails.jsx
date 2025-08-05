import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { products } from '../../data/mockData';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Find the product by ID
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
          <Link to="/products" className="text-blue-600 hover:underline">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const handleDownload = () => {
    alert(`Download started for ${product.title}!`);
  };

  // Mock gallery images
  const galleryImages = [
    product.image,
    "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400",
    "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400",
    "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400",
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <span>→</span>
        <Link to="/products" className="hover:text-blue-600">Products</Link>
        <span>→</span>
        <span className="text-gray-900">{product.title}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Product Gallery */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
            <img
              src={galleryImages[selectedImage]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnail Gallery */}
          <div className="grid grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  selectedImage === index
                    ? 'border-blue-500 shadow-lg'
                    : 'border-transparent hover:border-gray-300'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Badge */}
          {product.badge && (
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
              product.badge === "Free" ? "bg-green-100 text-green-700" :
              product.badge === "Sale" ? "bg-red-100 text-red-700" :
              product.badge === "Popular" ? "bg-blue-100 text-blue-700" :
              product.badge === "New" ? "bg-purple-100 text-purple-700" :
              "bg-orange-100 text-orange-700"
            }`}>
              {product.badge}
            </span>
          )}

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900">{product.title}</h1>

          {/* Rating */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {Array(Math.round(product.rating)).fill("★").join("")}
              <span className="ml-2 font-semibold text-gray-900">{product.rating}</span>
            </div>
            <span className="text-gray-500">({product.reviews} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4">
            {product.price === 0 ? (
              <span className="text-3xl font-bold text-green-600">Free</span>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-blue-600">${product.price}</span>
                {product.oldPrice && (
                  <span className="text-xl text-gray-400 line-through">${product.oldPrice}</span>
                )}
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-lg text-gray-600 leading-relaxed">{product.description}</p>

          {/* Age Group */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500">Age Group:</span>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium">
              {product.age}
            </span>
          </div>

          {/* Platforms */}
          <div className="space-y-2">
            <span className="text-sm font-medium text-gray-500">Platforms:</span>
            <div className="flex flex-wrap gap-2">
              {product.platforms.map((platform) => (
                <span
                  key={platform}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium"
                >
                  {platform}
                </span>
              ))}
            </div>
          </div>

          {/* Quantity (for paid products) */}
          {product.price > 0 && (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-500">Quantity:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200 flex items-center justify-center text-gray-600 font-bold"
                >
                  -
                </button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200 flex items-center justify-center text-gray-600 font-bold"
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            {product.price === 0 ? (
              <button
                onClick={handleDownload}
                className="flex-1 bg-green-600 text-white py-4 px-8 rounded-xl font-semibold hover:bg-green-700 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Download Now
              </button>
            ) : (
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-blue-600 text-white py-4 px-8 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Add to Cart - ${(product.price * quantity).toFixed(2)}
              </button>
            )}
          </div>

          {/* Additional Info */}
          <div className="border-t border-gray-200 pt-6 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-500">📦</span>
              <span className="text-sm">Instant download</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">🔄</span>
              <span className="text-sm">30-day money-back guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">🛡️</span>
              <span className="text-sm">Safe and secure</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails; 