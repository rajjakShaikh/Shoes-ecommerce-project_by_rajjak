import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../features/productSlice";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";
import { initializeRazorpay, createOrder } from "../services/razorpay";

export default function Cart() {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.product);

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
    toast.error("Product removed from cart!", {
      position: "top-right",
      autoClose: 400,
    });
  };

  const handleUpdateQuantity = (id, type) => {
    dispatch(updateQuantity({ id, type }));
  };

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => {
    const price = parseFloat(item.price) || 0;
    const quantity = parseInt(item.quantity) || 1;
    return total + price * quantity;
  }, 0);

  const handleCheckout = async () => {
    const res = await initializeRazorpay();

    if (!res) {
      toast.error("Razorpay SDK Failed to load");
      return;
    }

    try {
      const orderData = await createOrder(totalPrice);

      const options = {
        key: "rzp_live_C7ayx7PaJJkARf",
        amount: orderData.amount,
        currency: "INR",
        name: "KickItUp",
        description: "Purchase from KickItUp",
        order_id: orderData.id,
        handler: function (response) {
          toast.success("Payment Successful!");
          console.log("Payment Response:", response);
          dispatch(clearCart());
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Customer Address",
        },
        theme: {
          color: "#4F46E5",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error creating order. Please try again.");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Your Cart is Empty
          </h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link
            to="/listofproduct"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-center gap-4 bg-white p-4 rounded-lg shadow-md mb-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-md"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.name}
                </h3>
                <p className="text-gray-600">Size: {item.size}</p>
                <p className="text-indigo-600 font-bold">
                  ₹{parseFloat(item.price).toFixed(2)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleUpdateQuantity(item.id, "decrement")}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <FaMinus />
                </button>
                <span className="w-8 text-center">{item.quantity || 1}</span>
                <button
                  onClick={() => handleUpdateQuantity(item.id, "increment")}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <FaPlus />
                </button>
              </div>
              <button
                onClick={() => handleRemoveFromCart(item)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md h-fit">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Order Summary
          </h2>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg mt-6 hover:bg-indigo-700 transition-colors"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
