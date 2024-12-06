import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { RiLogoutCircleLine } from "react-icons/ri";

export default function Header() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useSelector((state) => state.product);
  const [getloggeduserName, setgetloggeduserName] = useState("");
  const cartCount = cart.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  const handleLogout = () => {
    localStorage.removeItem("hasloggedin");
    navigate("/login");
  };
  useEffect(() => {
    const loggeduserNameShow = JSON.parse(localStorage.getItem("userSignup"));
    setgetloggeduserName(loggeduserNameShow.email);
    console.log(loggeduserNameShow.email);
  }, []);

  return (
    <header className="w-full bg-white border-b">
      {/* Enhanced top banner with gradient */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-3">
        <div className="container mx-auto px-4 flex justify-between">
          <div className="flex items-center">
            <p className="text-sm font-medium">
              Welcome,{" "}
              <span className="text-blue-400">{getloggeduserName}</span>
            </p>
            <div className="flex items-center space-x-4 ml-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                onClick={handleLogout}
              >
                <RiLogoutCircleLine className="text-2xl  text-white hover:text-gray-900" />
              </motion.button>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-4">
            <div className="hidden sm:flex items-center space-x-4">
              <span className="text-blue-400">🚚</span>
              <p className="text-sm font-medium">
                Free shipping on orders over $50
                <span className="mx-2">|</span>
                <span className="text-blue-400 hover:text-blue-300 transition-colors cursor-pointer">
                  Express Delivery Available
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced main header */}
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between h-20">
          {/* Enhanced Logo with animation */}
          <Link to="/" className="flex items-center min-w-[180px]">
            <motion.div whileHover={{ scale: 1.05 }} className="relative">
              <span className="text-3xl tracking-tight whitespace-nowrap font-extrabold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Kick
                <span className="inline-block transform -rotate-6 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  It
                </span>
                <span className="inline-block bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Up
                </span>
                <span className="absolute -top-1 -right-2 text-xs text-pink-500">
                  ®
                </span>
              </span>
              <span className="absolute -bottom-2 left-0 text-[10px] text-gray-600 font-medium tracking-wider whitespace-nowrap">
                PREMIUM FOOTWEAR
              </span>
            </motion.div>
          </Link>

          {/* Enhanced Desktop Navigation */}
          <nav className="hidden md:flex  items-center space-x-8">
            {[
              { path: "/", label: "Home" },
              { path: "/listofproduct", label: "Products" },
              { path: "/contact", label: "Contact" },
              { path: "/wishlist", label: "Wishlist" },
              { path: "/blog", label: "Style Guide" },
            ].map(({ path, label, icon }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `nav-link group flex items-center gap-2 font-bold py-2 rounded-full transition-all duration-300 hover:bg-gray-100 ${
                    isActive
                      ? "text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text font-semibold"
                      : ""
                  }`
                }
              >
                <span className="text-sm">{icon}</span>
                <span className="relative">
                  {label}
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 transform scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                </span>
              </NavLink>
            ))}

            {/* Enhanced action buttons */}
            <Link
              to="/cart"
              className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <FaShoppingCart className="text-2xl text-gray-700 hover:text-gray-900" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs animate-bounce">
                  {cartCount}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>

      {/* Enhanced Mobile Navigation */}
      <nav
        className={`fixed inset-y-0 right-0 w-72 bg-white shadow-2xl transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden z-50 rounded-l-2xl`}
      ></nav>
    </header>
  );
}

const styles = `
  .nav-link {
    @apply text-gray-600 hover:text-gray-900 font-medium transition-colors;
  }

  .mobile-nav-link {
    @apply block text-gray-600 hover:text-gray-900 font-medium transition-colors py-2;
  }
`;
