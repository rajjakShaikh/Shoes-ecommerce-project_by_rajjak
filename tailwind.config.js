/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "gradient-x": "gradient-x 3s ease infinite",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".nav-link": {
          "@apply text-gray-600 hover:text-gray-900 font-medium transition-colors duration-300":
            {},
        },
        ".mobile-nav-link": {
          "@apply block text-gray-600 hover:text-gray-900 font-medium transition-all duration-300 py-3 px-4 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:pl-6":
            {},
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
