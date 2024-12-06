import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddProduct from "./pages/Addproduct";
import Home from "./pages/home";
import Layout from "./pages/Layout";
import Listofproduct from "./pages/Listofproduct";
import Cart from "./pages/Cart";
import { useEffect } from "react";
import { loadCartFromLocalStorage } from "./features/productslice";
import { useDispatch } from "react-redux";
import Contactpage from "./pages/Contactpage";
import ProductDetails from "./pages/ProductDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Wishlist from "./pages/Wishlist";
import Blog from "./pages/Blog";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import SignupPage from "./pages/signupPage";
import LoginPage from "./pages/loginpage";
import ProtectedRouting from "./pages/services/protectedRouting";
import NotFound from "./pages/NotFound";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCartFromLocalStorage());
  }, [dispatch]);

  return (
    <div>
      <ToastContainer />
      <BrowserRouter future={{ v7_startTransition: true }}>
        <Routes>
          <Route exact path="/signup" element={<SignupPage />} />
          <Route exact path="*" element={<NotFound />} />

          <Route exact path="/login" element={<LoginPage />} />
          {/* protected Routes  */}
          <Route path="/" element={<ProtectedRouting />}>
            <Route path="/" element={<Layout />}>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/addproduct" element={<AddProduct />} />
              <Route exact path="/listofproduct" element={<Listofproduct />} />
              <Route exact path="/product/:id" element={<ProductDetails />} />
              <Route exact path="/cart" element={<Cart />} />
              <Route exact path="/contact" element={<Contactpage />} />
              <Route exact path="/wishlist" element={<Wishlist />} />
              <Route exact path="/blog" element={<Blog />} />
              <Route exact path="/privacy-policy" element={<PrivacyPolicy />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
