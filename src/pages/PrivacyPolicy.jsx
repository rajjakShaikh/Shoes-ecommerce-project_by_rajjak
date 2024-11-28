import React from "react";
import { motion } from "framer-motion";
import { FaShieldAlt, FaLock, FaCookie, FaUserShield } from "react-icons/fa";

export default function PrivacyPolicy() {
  const sections = [
    {
      icon: <FaShieldAlt />,
      title: "Information We Collect",
      content: [
        "Personal identification information (Name, email address, phone number)",
        "Shipping and billing information",
        "Payment details (stored securely through our payment processors)",
        "Device and browser information",
        "Shopping preferences and history",
      ],
    },
    {
      icon: <FaLock />,
      title: "How We Protect Your Data",
      content: [
        "SSL encryption for all data transmission",
        "Regular security audits and updates",
        "Secure data storage with limited access",
        "Employee training on data protection",
        "Regular backup procedures",
      ],
    },
    {
      icon: <FaCookie />,
      title: "Cookies & Tracking",
      content: [
        "Essential cookies for site functionality",
        "Analytics cookies to improve user experience",
        "Marketing cookies (with your consent)",
        "Session cookies for shopping cart",
        "Preference cookies to remember your choices",
      ],
    },
    {
      icon: <FaUserShield />,
      title: "Your Rights",
      content: [
        "Right to access your personal data",
        "Right to correct inaccurate data",
        "Right to delete your data",
        "Right to withdraw consent",
        "Right to data portability",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600">
            Your privacy is important to us. This policy outlines how we
            collect, use, and protect your personal information.
          </p>
        </motion.div>

        <div className="space-y-12">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="text-2xl text-indigo-600">{section.icon}</div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  {section.title}
                </h2>
              </div>
              <ul className="space-y-4">
                {section.content.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex items-center space-x-3 text-gray-600"
                  >
                    <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 bg-indigo-50 rounded-2xl p-8 text-center"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Questions About Our Privacy Policy?
          </h2>
          <p className="text-gray-600 mb-6">
            If you have any questions or concerns about our privacy policy,
            please don't hesitate to contact us.
          </p>
          <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors">
            Contact Us
          </button>
        </motion.div>
      </div>
    </div>
  );
}
