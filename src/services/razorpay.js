import axios from "axios";

const RAZORPAY_KEY_ID = "rzp_live_C7ayx7PaJJkARf";
const BACKEND_URL = "http://localhost:5000/api";

export const initializeRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export const createOrder = async (amount) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/create-order`, {
      amount: Math.round(amount * 100),
    });
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};
