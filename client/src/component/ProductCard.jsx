import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const ProductCard = ({ product }) => {
  const { navigate, addToCart, removeFromCart, cartItems } = useContext(AppContext);

  if (!product) return null;

  // ✅ FIX: using _id
  const productId = product._id;

  const count = cartItems?.[productId] || 0;

  return (
    <div className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white min-w-56 max-w-56 w-full">

      {/* Image */}
      <div
        onClick={() => navigate(`/product/${productId}`)}
        className="group cursor-pointer flex items-center justify-center px-2"
      >
        <img
          className="group-hover:scale-105 transition max-w-26 md:max-w-36"
          src={`http://localhost:5000/images/${product.image[0]}`}
          alt={product.name}
        />
      </div>

      {/* Details */}
      <div className="text-gray-500/60 text-sm">
        <p>{product.category}</p>

        <p
          onClick={() => navigate(`/product/${productId}`)}
          className="text-gray-700 font-medium text-lg truncate w-full cursor-pointer"
        >
          {product.name}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-0.5">
          {Array(5).fill('').map((_, i) =>
            product.rating > i ? <span key={i}>⭐</span> : <span key={i}>☆</span>
          )}
          <p>({product.rating})</p>
        </div>

        {/* Price */}
        <div className="flex items-end justify-between mt-3">
          <p className="md:text-xl text-base font-medium text-indigo-500">
            ${product.offerPrice}{' '}
            <span className="text-gray-500/60 md:text-sm text-xs line-through">
              ${product.price}
            </span>
          </p>

          {/* Cart */}
          <div className="text-indigo-500">
            {count === 0 ? (
              <button
                className="bg-indigo-100 border border-indigo-300 px-3 py-1 rounded text-indigo-600"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(productId);
                }}
              >
                Add
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-indigo-100 px-2 py-1 rounded">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromCart(productId);
                  }}
                >
                  -
                </button>

                <span>{count}</span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(productId);
                  }}
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;