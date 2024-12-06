import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import CryptoJS from "crypto-js";
import { toast, ToastContainer } from "react-toastify";

export default function SignupPage() {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const SECRET_KEY = "f$%d3L0#tS!aR@";

  const handleSubmit = (e) => {
    e.preventDefault();
    const encryptedPassword = CryptoJS.AES.encrypt(
      formData.password,
      SECRET_KEY
    ).toString();
    const encryptedSignupData = {
      ...formData,
      password: encryptedPassword,
    };

    localStorage.setItem("userSignup", JSON.stringify(encryptedSignupData));
    console.log("encryptedSignupDat", encryptedSignupData);
    toast.success("successfully login", {
      autoClose: 700,
      position: "top-center",
    });
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-blue-500 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <ToastContainer />

      <div className="max-w-md w-full mx-auto space-y-8 bg-white/95 backdrop-blur-sm p-10 rounded-2xl shadow-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-purple-600 hover:text-purple-500 transition-colors duration-200 hover:underline"
            >
              Sign in
            </a>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md space-y-5">
            <div className="group">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-lg block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-gray-100"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="group">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  required
                  className="appearance-none rounded-lg block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-gray-100"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <div
                  className="absolute inset-y-0 right-0 flex items-center px-4 cursor-pointer text-gray-600 hover:text-purple-500 transition-colors duration-200"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 transform hover:scale-[1.02]"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
