import React from "react";
import { useCart } from "../../context/CartContext";

const ProductCard = ({ product, onDownload, onAddToCart }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const handleDownload = () => {
    if (onDownload) {
      onDownload(product);
    } else {
      // Default download behavior
      alert(`Download started for ${product.title}!`);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl border border-gray-100 p-5 flex flex-col h-full relative group transition-all duration-300 hover:-translate-y-1">
    {/* Badge */}
    {product.badge && (
      <span className={`absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full z-10 ${
        product.badge === "Free" ? "bg-green-100 text-green-700" :
        product.badge === "Sale" ? "bg-red-100 text-red-700" :
        product.badge === "Popular" ? "bg-blue-100 text-blue-700" :
        product.badge === "New" ? "bg-purple-100 text-purple-700" :
        "bg-orange-100 text-orange-700"
      }`}>
        {product.badge}
      </span>
    )}
    
    {/* Image */}
    <img
      src={product.image}
      alt={product.title}
      className="rounded-lg mb-4 w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
    />
    
    <div className="flex-1 flex flex-col">
      {/* Age and Rating */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600 font-medium">
          {product.age}
        </span>
        <div className="flex items-center text-yellow-500 text-sm">
          {Array(Math.round(product.rating)).fill("★").join("")}
          <span className="ml-1 text-gray-500 font-medium">{product.rating}</span>
        </div>
      </div>
      
      {/* Title */}
      <h3 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">
        {product.title}
      </h3>
      
      {/* Description */}
      <p className="text-gray-600 text-sm mb-3 flex-1">
        {product.description}
      </p>
      
      {/* Platforms */}
      <div className="flex items-center mb-4 flex-wrap gap-1">
        {product.platforms &&
          product.platforms.map((plat) => (
            <span
              key={plat}
              className="text-xs text-gray-500 bg-gray-50 rounded-full px-2 py-1 border border-gray-200"
            >
              {plat}
            </span>
          ))}
      </div>
      
      {/* Price and Button */}
      <div className="mt-auto flex items-center justify-between">
        <div>
          {product.price === 0 ? (
            <span className="font-bold text-green-600 text-lg">Free</span>
          ) : (
            <div className="flex items-center gap-2">
              <span className="font-bold text-blue-700 text-lg">${product.price}</span>
              {product.oldPrice && (
                <span className="line-through text-gray-400 text-sm">${product.oldPrice}</span>
              )}
            </div>
          )}
        </div>
        <button 
          onClick={product.price === 0 ? handleDownload : handleAddToCart}
          className={`text-sm rounded-lg px-4 py-2 font-semibold transition-all duration-300 cursor-pointer ${
            product.price === 0 
              ? "bg-green-600 text-white hover:bg-green-700 hover:scale-105" 
              : "bg-blue-600 text-white hover:bg-blue-700 hover:scale-105"
          }`}
        >
          {product.price === 0 ? "Download" : "Add to Cart"}
        </button>
      </div>
    </div>
  </div>
  );
};

export default ProductCard; 