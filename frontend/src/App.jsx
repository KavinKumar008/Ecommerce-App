import React from "react";
import SignUp from "./signuppage/SignUp";
import Products from "./productspage/Products";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CartPage from "./cartpage/CartPage";
import ProductDetails from "./productdetailspage/ProductDetails";
import Profile from "./profilepage/Profile";
import { ToastContainer } from "react-toastify";
import Payment from "./paymentpage/Payment";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/products" element={<Products />} />
        <Route
          path="/productdetails/:category/:id"
          element={<ProductDetails />}
        />
        <Route path="/cartpage" element={<CartPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/payment/:category/:id" element={<Payment />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
