import React from "react";
import { FaTruck, FaUndo, FaHeadset, FaShieldAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

// Sample product data
const categories = [
  {
    title: "Running",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    color: "from-blue-500",
  },
  {
    title: "Casual",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772",
    color: "from-green-500",
  },
  {
    title: "Sport",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa",
    color: "from-red-500",
  },
];

const newArrivals = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb",
    title: "Classic White Sneaker",
    price: "129.99",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329",
    title: "Sport Runner",
    price: "149.99",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
    title: "Urban Style",
    price: "139.99",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86",
    title: "Casual Comfort",
    price: "119.99",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[600px]">
        <img
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/20"></div>
        <div className="relative h-full container mx-auto px-4 flex items-center z-10">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl font-bold mb-4">Step into Greatness</h1>
            <p className="text-xl mb-8">
              Discover our new collection of premium footwear for every occasion
            </p>
            <Link
              to="/listofproduct"
              className="inline-block bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
          {[
            {
              icon: <FaTruck />,
              title: "Free Shipping",
              desc: "On orders over $50",
            },
            {
              icon: <FaUndo />,
              title: "Easy Returns",
              desc: "30-day return policy",
            },
            {
              icon: <FaHeadset />,
              title: "24/7 Support",
              desc: "Always here to help",
            },
            {
              icon: <FaShieldAlt />,
              title: "Secure Payment",
              desc: "100% secure checkout",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 p-6 bg-white rounded-lg shadow-sm"
            >
              <div className="text-3xl text-blue-600">{feature.icon}</div>
              <div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Shop by Category
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-lg h-80"
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${category.color} to-transparent opacity-60 group-hover:opacity-70 transition-opacity`}
                ></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {category.title}
                  </h3>
                  <Link
                    to="/listofproduct"
                    className="text-white underline hover:no-underline"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* New Arrivals Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">New Arrivals</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {newArrivals.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden group"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                      New
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{product.title}</h3>
                  <p className="text-gray-600 mb-2">${product.price}</p>
                  <button className="w-full bg-gray-900 text-white py-2 rounded-full hover:bg-gray-800 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="py-16 bg-gray-900 text-white mb-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="mb-8 text-gray-300">
            Subscribe to get special offers, free giveaways, and updates.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full text-gray-900 focus:outline-none"
            />
            <button className="bg-blue-600 px-8 py-3 rounded-full hover:bg-blue-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
