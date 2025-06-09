import React, { useState } from "react";
import brandlogo from "../assets/brandlogo.jpeg";
import { FaHome, FaShoppingCart, FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useCart } from "../CartProvider";
import { useProducts } from "../ProductProvider";

const NavBar = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const { products, searchTerm, setSearchTerm } = useProducts();
  const location = useLocation();

  const cartCount = cartItems.reduce(
    (accu, currentValue) => accu + (currentValue.quantity || 1),
    0
  );

  const handleToHome = () => {
    navigate("/products");
  };

  const handleProfilePage = () => {
    navigate("/profile");
  };

  const handleSearchTerm = () => {
    const foundItem = products.find(
      (product) =>
        product.name.toLowerCase() === searchTerm.trim().toLowerCase()
    );

    const category = foundItem?.category;
    const id = foundItem?._id;

    if (foundItem) {
      navigate(`/productdetails/${category}/${id}`);
      setSearchTerm("");
    } else {
      alert("Product Not Found");
      setSearchTerm("");
    }
  };

  return (
    <div className="bg-white fixed top-0 z-10 shadow-md p-2 w-full">
      <section className="flex justify-around items-center lg:pl-7 lg:pr-9">
        <div>
          <img
            src={brandlogo}
            className="w-[100px] h-[70px] cursor-pointer"
            onClick={handleToHome}
          />
        </div>

        <div className="relative lg:w-[400px] lg:block hidden">
          <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-600" />
          <input
            type="text"
            placeholder="Search for products and more"
            className="pl-10 pr-3 py-3 xl:w-[500px] lg:w-[430px] outline-0 rounded-lg bg-[aliceblue]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearchTerm();
              }
            }}
          />

          {searchTerm &&
            products
              .filter((item) =>
                item.name.toLowerCase().startsWith(searchTerm.toLowerCase())
              )
              .slice(0, 5)
              .map((product) => (
                <div
                  key={product._id}
                  className="absolute bg-white w-full shadow-md border border-gray-200 z-20 p-2 hover:bg-gray-100 cursor-pointer rounded-md mt-3"
                  onClick={() => {
                    setSearchTerm("");
                    navigate(
                      `/productdetails/${product.category}/${product._id}`
                    );
                  }}
                >
                  <p className="flex items-center justify-center rounded-md">
                    {product.name}
                  </p>
                </div>
              ))}
        </div>

        <div className="flex lg:gap-20 gap-10">
          {location.pathname !== "/products" && (
            <Link to="/products">
              <FaHome className="text-2xl cursor-pointer" />
            </Link>
          )}

          {location.pathname !== "/cartpage" && (
            <Link to="/cartpage" className="relative">
              <FaShoppingCart className="text-2xl cursor-pointer" />
              {cartCount > 0 && (
                <span className="absolute top-2 right-2 bg-red-200 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                  {cartCount}
                </span>
              )}
            </Link>
          )}

          <CgProfile
            className="text-2xl cursor-pointer"
            onClick={handleProfilePage}
          />
        </div>
      </section>
    </div>
  );
};

export default NavBar;
