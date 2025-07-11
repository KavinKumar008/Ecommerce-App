import React from "react";
import SignUp from "./signuppage/SignUp";
import Products from "./productspage/Products";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CartPage from "./cartpage/CartPage";
import ProductDetails from "./productdetailspage/ProductDetails";
import Profile from "./profilepage/Profile";
import { ToastContainer } from "react-toastify";
import Payment from "./paymentpage/Payment";
import ImageCarousel from "./imagecarousel/ImageCarousel";
// import AddnewProduct from "./addnewproduct/AddnewProduct";
// import ShowNewProductPage from "./shownewproductpage/ShowNewProductPage";

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
        <Route path="/sliderimages/:category/:id" element={<ImageCarousel />} />
        {/* <Route path="/addnewproduct" element={<AddnewProduct />} />
        <Route path="/shownewproductpage" element={<ShowNewProductPage />} /> */}
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
