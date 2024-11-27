import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, ShowProducts } from "../features/productSlice";

export default function Listofproduct() {
  const dispatch = useDispatch();
  const { product, isLoading, isError } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(ShowProducts());
    console.log("data", product);
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
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Product List
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {product.map((data) => (
          <div
            key={data.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 flex flex-col h-full"
          >
            <img
              src={data.image}
              alt={data.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col flex-grow">
              <h2 className="text-lg font-semibold text-gray-700">
                {data.name}
              </h2>
              <p className="text-sm text-gray-500 mb-4">{data.description}</p>
              <div className="mt-auto">
                <p className="text-lg font-bold text-indigo-600">
                  ₹{data.price}
                </p>
                <button
                  className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300"
                  onClick={() => handleAddToCart(data)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
