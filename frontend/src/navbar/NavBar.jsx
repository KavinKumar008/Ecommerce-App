import React, { useState } from "react";
import brandlogo from "../assets/brandlogo.jpeg";
import { FaHome } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// import { ElectronicItem } from "../productspage/ElectronicItem";
import { useLocation, Link } from "react-router-dom";
import { useCart } from "../CartProvider";
import { useProducts } from "../ProductProvider";
import ProductCard from "../productcart/ProductCard";

const NavBar = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const { products, searchTerm, setSearchTerm } = useProducts();
  const location = useLocation();
  console.log(location, "Locationnnnn");
  console.log(cartItems, "cartitemssssnavbar");
  console.log(products, "wdkwdwk", searchTerm);
  function handleToHome() {
    navigate("/products");
  }

  function handleProfilePage() {
    navigate("/profile");
  }

  // function handleCartPage() {
  //   navigate("/cartpage");
  // }

  const filteringProducts = products.filter((item) => {
    item.name.toLowerCase().includes(searchTerm.toLocaleLowerCase());
  });

  console.log(filteringProducts, "filterrinefweifjiofj");

  const cartCount = cartItems.reduce(
    (accu, currentValue) => accu + (currentValue.quantity || 1),
    0
  );
  console.log(cartCount, "cartcount");
  return (
    <div className="bg-white fixed top-0 z-10 shadow-md p-2 w-full sm:w-full md:w-full lg:w-full">
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
          />
        </div>

        <div className="flex lg:gap-20 gap-10 md:flex-none">
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
      {/* <div className="flex flex-wrap gap-4">
        {filteringProducts.length > 0 ? (
          filteringProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div> */}
    </div>
  );
};

export default NavBar;
