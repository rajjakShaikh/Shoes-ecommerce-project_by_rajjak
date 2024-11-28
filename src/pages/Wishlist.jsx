import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromWishlist } from "../features/productSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

export default function Wishlist() {
  const dispatch = useDispatch();
  const { wishlist = [] } = useSelector((state) => state.product);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`);
  };

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist(productId));
    toast.info("Removed from wishlist");
  };

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <FaHeart className="mx-auto text-6xl text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Your Wishlist is Empty
          </h2>
          <p className="text-gray-600 mb-8">
            Start adding items you love to your wishlist!
          </p>
          <Link
            to="/listofproduct"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Explore Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Wishlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={() => handleRemoveFromWishlist(item.id)}
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
              >
                <FaHeart className="text-red-500" />
              </button>
            </div>
            <div className="p-6">
              <Link
                to={`/product/${item.id}`}
                className="text-xl font-bold text-gray-900 hover:text-indigo-600 transition-colors"
              >
                {item.name}
              </Link>
              <p className="text-gray-600 mt-2">{item.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-2xl font-bold text-indigo-600">
                  ₹{item.price}
                </span>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <FaShoppingCart />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
