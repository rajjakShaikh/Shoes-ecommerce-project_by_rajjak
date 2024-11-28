import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, ShowProducts } from "../features/productSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useSearchParams } from "react-router-dom";

// eslint-disable react-hooks/exhaustive-deps

export default function Listofproduct() {
  const dispatch = useDispatch();
  const { product, isLoading, isError } = useSelector((state) => state.product);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    dispatch(ShowProducts());
  }, [dispatch]);

  if (isLoading) {
    return <div className="text-center py-10 text-xl">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-center py-10 text-red-600">An error occurred</div>
    );
  }

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  // Get unique categories from products
  const categories = [...new Set(product.map((item) => item.category))];

  // Handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategories((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(category)) {
        newSelected.delete(category);
      } else {
        newSelected.add(category);
      }
      return newSelected;
    });
  };

  // Filter products based on search term and selected categories
  const filteredProducts = product.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategories.size === 0 || selectedCategories.has(item.category))
  );

  // Filter your products based on category
  const filteredProductsByCategory = filteredProducts.filter((product) => {
    if (!category) return true; // Show all products if no category is selected
    return product.category.toLowerCase() === category.toLowerCase();
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer />

      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Discover Amazing Products
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our curated collection of high-quality products. From everyday
          essentials to unique finds, we've got something special for everyone.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Category filter - updated styling */}
        <div className="md:w-1/4">
          <div className="sticky top-4">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
              Refine Your Search
            </h2>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search products..."
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    🔍
                  </span>
                </div>
              </div>

              <h3 className="font-semibold text-gray-700 mb-3">Categories</h3>
              {categories.map((category) => (
                <div key={category} className="mb-2">
                  <label className="inline-flex items-center hover:text-indigo-600 cursor-pointer">
                    <input
                      type="checkbox"
                      className="form-checkbox text-indigo-600 rounded"
                      checked={selectedCategories.has(category)}
                      onChange={() => handleCategoryChange(category)}
                    />
                    <span className="ml-2 text-gray-700">{category}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid - updated styling */}
        <div className="md:w-3/4">
          {filteredProductsByCategory.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-gray-500 text-lg">
                We couldn't find any products matching your criteria.
              </p>
              <p className="text-gray-400">
                Try adjusting your search or filters to find what you're looking
                for.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProductsByCategory.map((data) => (
                <div
                  key={data.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col h-full"
                >
                  <Link
                    to={`/product/${data.id.toString()}`}
                    className="flex-1 flex flex-col"
                  >
                    <div className="relative group">
                      <img
                        src={data.image}
                        alt={data.name}
                        className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <span className="text-xs text-indigo-600 font-semibold uppercase tracking-wider mb-2">
                        {data.category}
                      </span>
                      <h2 className="text-xl font-bold text-gray-800 mb-2">
                        {data.name}
                      </h2>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {data.description}
                      </p>
                      <div className="mt-auto">
                        <p className="text-2xl font-bold text-indigo-600">
                          ₹{data.price}
                        </p>
                      </div>
                    </div>
                  </Link>
                  <div className="px-6 pb-6">
                    <button
                      className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 flex items-center justify-center gap-2"
                      onClick={() => handleAddToCart(data)}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                      </svg>
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
