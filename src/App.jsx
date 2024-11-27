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

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCartFromLocalStorage());
  }, [dispatch]);

  return (
    <BrowserRouter future={{ v7_startTransition: true }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/addproduct" element={<AddProduct />} />
          <Route exact path="/listofproduct" element={<Listofproduct />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/contact" element={<Contactpage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
