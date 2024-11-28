import React, { useState, useEffect } from "react";
import {
  FaTruck,
  FaUndo,
  FaHeadset,
  FaShieldAlt,
  FaInstagram,
  FaStar,
  FaPlay,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { addToCart } from "../features/productslice";
import { useDispatch } from "react-redux";

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

const brandHighlights = [
  { number: "50K+", label: "Happy Customers" },
  { number: "300+", label: "Shoe Models" },
  { number: "25+", label: "Countries Served" },
  { number: "100%", label: "Authentic Products" },
];

const instagramPosts = [
  {
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772",
    likes: "2.5k",
  },
  {
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    likes: "1.8k",
  },
  {
    image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb",
    likes: "3.2k",
  },
  {
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa",
    likes: "2.1k",
  },
];

const bannerSlides = [
  {
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    title: "Step into Greatness",
    description:
      "Discover our new collection of premium footwear for every occasion",
  },
  {
    image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2",
    title: "Premium Collection",
    description: "Experience comfort and style with our exclusive range",
  },
  {
    image: "https://images.unsplash.com/photo-1556906781-9a412961c28c",
    title: "New Season Arrivals",
    description: "Explore the latest trends in athletic and casual footwear",
  },
];

export default function Home() {
  const dispatch = useDispatch();
  const [videoModal, setVideoModal] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[600px] overflow-hidden">
        {bannerSlides.map((slide, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{
              opacity: currentSlide === index ? 1 : 0,
              zIndex: currentSlide === index ? 1 : 0,
            }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0"
          >
            <img
              src={slide.image}
              alt={`Hero ${index + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/20"></div>
            <div className="relative h-full container mx-auto px-4 flex items-center z-10">
              <div className="max-w-2xl text-white">
                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-5xl font-bold mb-4"
                >
                  {slide.title}
                </motion.h1>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-xl mb-8"
                >
                  {slide.description}
                </motion.p>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <Link
                    to="/listofproduct"
                    className="inline-block bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Shop Now
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Carousel Navigation Dots */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {bannerSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentSlide === index ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-200">
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
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="flex items-center space-x-4 p-6 bg-white rounded-lg shadow-sm"
            >
              <div className="text-3xl text-blue-600">{feature.icon}</div>
              <div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            Shop by Category
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
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
                    to={`/listofproduct?category=${category.title.toLowerCase()}`}
                    className="text-white underline hover:no-underline"
                  >
                    Shop Now
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* New Arrivals Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            New Arrivals
          </motion.h2>
          <div className="grid md:grid-cols-4 gap-8">
            {newArrivals.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
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
                  <button
                    className="w-full bg-gray-900 text-white py-2 rounded-full hover:bg-gray-800 transition-colors"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Brand Story Video Section */}
      <div className="py-20 bg-gray-900 text-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">
                Our Journey to Excellence
              </h2>
              <p className="text-gray-300 mb-8">
                From humble beginnings to becoming a global footwear leader, our
                passion for quality and innovation remains unchanged. Every pair
                tells a story of craftsmanship and dedication.
              </p>
              <button
                onClick={() => setVideoModal(true)}
                className="flex items-center gap-3 bg-white text-gray-900 px-6 py-3 rounded-full hover:bg-gray-100 transition-colors"
              >
                <FaPlay /> Watch Our Story
              </button>
            </motion.div>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1556906781-9a412961c28c"
                alt="Brand Story"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                  <FaPlay className="text-gray-900 text-2xl ml-1" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Numbers/Stats Section */}
      <div className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {brandHighlights.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <h3 className="text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Instagram Feed Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl font-bold"
            >
              Follow Us on Instagram
            </motion.h2>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              @yourbrand <FaArrowRight />
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {instagramPosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group overflow-hidden rounded-lg aspect-square"
              >
                <img
                  src={post.image}
                  alt={`Instagram post ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="flex items-center gap-2 text-white">
                    <FaInstagram className="text-2xl" />
                    <span>{post.likes} likes</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust Badges Section */}
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
            {["Nike", "Adidas", "Puma", "New Balance", "Under Armour"].map(
              (brand, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-2xl font-bold text-gray-400"
                >
                  {brand}
                </motion.div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-16 bg-gray-900 text-white mb-20"
      >
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
      </motion.div>
    </div>
  );
}
