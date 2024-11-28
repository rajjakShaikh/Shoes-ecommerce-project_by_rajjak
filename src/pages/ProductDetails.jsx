import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/productSlice";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, cart } = useSelector((state) => state.product);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  const currentProduct = product.find((p) => p.id.toString() === id);

  const reviews = [
    {
      id: 1,
      user: "John Doe",
      rating: 5,
      date: "2024-03-15",
      comment: "Great product! Very comfortable and stylish.",
      helpful: 12,
    },
    {
      id: 2,
      user: "Jane Smith",
      rating: 4,
      date: "2024-03-10",
      comment: "Good quality but sizing runs a bit small.",
      helpful: 8,
    },
  ];

  const sizes = ["US 7", "US 8", "US 9", "US 10", "US 11"];

  const handleAddToCart = () => {
    console.log("Add to cart button clicked");

    if (!selectedSize) {
      toast.error("Please select a size", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    if (!currentProduct) {
      console.log("No current product found");
      return;
    }

    try {
      const cartItem = {
        id: currentProduct.id,
        name: currentProduct.name,
        price: currentProduct.price,
        image: currentProduct.image,
        size: selectedSize,
        quantity: quantity,
      };

      console.log("Cart item being dispatched:", cartItem);
      dispatch(addToCart(cartItem));
      toast.success(`${product.name} added to cart!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error("Error in handleAddToCart:", error);
      toast.error("Failed to add item to cart", {
        position: "top-center",
        autoClose: 1500,
      });
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    return stars;
  };

  // Add console.log to debug
  console.log("ID from params:", id);
  console.log("All products:", product);
  console.log("Current product:", currentProduct);

  if (!currentProduct) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h2>
          <p className="text-gray-600">
            Sorry, we couldn't find the product you're looking for.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
            <img
              src={currentProduct.image}
              alt={currentProduct.name}
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden"
              >
                <img
                  src={currentProduct.image}
                  alt={`View ${i + 1}`}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {currentProduct.name}
          </h1>
          <div className="flex items-center space-x-2">
            <div className="flex">{renderStars(4.5)}</div>
            <span className="text-gray-500">
              (4.5) · {reviews.length} reviews
            </span>
          </div>
          <p className="text-2xl font-bold text-indigo-600">
            ₹{currentProduct.price}
          </p>

          {/* Size Selection */}
          <div>
            <h3 className="text-sm font-medium text-gray-900">Select Size</h3>
            <div className="grid grid-cols-5 gap-2 mt-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2 text-sm font-medium rounded-md ${
                    selectedSize === size
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-50 text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selection */}
          <div>
            <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
            <div className="flex items-center space-x-3 mt-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 border rounded-md"
              >
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 border rounded-md"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => {
              console.log("Button clicked");
              handleAddToCart();
            }}
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {["description", "details", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-8">
          {activeTab === "description" && (
            <div className="prose max-w-none">
              <p>{currentProduct.description}</p>
            </div>
          )}

          {activeTab === "details" && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Product Details</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Material: Premium quality material</li>
                <li>Style: Casual</li>
                <li>Season: All season</li>
                <li>Care Instructions: Machine washable</li>
              </ul>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-8">
              {reviews.map((review) => (
                <div key={review.id} className="border-b pb-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{review.user}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex">{renderStars(review.rating)}</div>
                        <span className="text-sm text-gray-500">
                          {review.date}
                        </span>
                      </div>
                    </div>
                    <button className="text-sm text-gray-500 hover:text-gray-700">
                      Helpful ({review.helpful})
                    </button>
                  </div>
                  <p className="mt-4 text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
