import React, { useEffect, useState } from "react";
// import NavBar from "../navbar/NavBar";
import { useCart } from "../CartProvider.jsx";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import NavBar from "../navbar/NavBar.jsx";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../ProductProvider.jsx";
import { MdCancel } from "react-icons/md";

const CartPage = () => {
  const { category, id } = useParams();
  const {
    cartItems,
    setCartItems,
    handlePlus,
    handleMinus,
    showCartItems,
    setShowCartItems,
  } = useCart();
  const [count, setCount] = useState(1);
  // const [showCartItems, setShowCartItems] = useState([]);
  const navigate = useNavigate();
  const baseurl = import.meta.env.VITE_API_URL;
  const { products } = useProducts();

  console.log(products, "procucts for cart page");

  // const handlePlus = (e, itemId) => {
  //   console.log(itemId, "itemiddddd");
  //   e.preventDefault();
  //   setShowCartItems((prevItems) =>
  //     prevItems.map((item) =>
  //       item._id === itemId ? { ...item, quantity: item.quantity + 1 } : item
  //     )
  //   );
  // };
  console.log(cartItems, "cartitems");

  // const handleMinus = (e, itemId) => {
  //   e.preventDefault();
  //   setShowCartItems((prevItems) =>
  //     prevItems.map((item) =>
  //       item._id === itemId && item.quantity > 1
  //         ? { ...item, quantity: item.quantity - 1 }
  //         : item
  //     )
  //   );
  // };

  const handleRemoveItem = async (itemId) => {
    try {
      const deleteRes = await axios.delete(`${baseurl}/cart-details/delete`, {
        data: { id: itemId },
      });
      if (deleteRes.status === 200) {
        console.log(deleteRes);
      }
      const updatedCartItem = showCartItems.filter(
        (item) => item._id !== itemId
      );
      setCartItems(updatedCartItem);
      setShowCartItems(updatedCartItem);
      console.log(updatedCartItem, "updatedCartItem");
      console.log(itemId, "itemememem");
    } catch (error) {
      console.log("unable to remove the item from cart", error);
    }
  };

  useEffect(() => {
    const getCartItems = async () => {
      try {
        const res = await axios.get(`${baseurl}/cart-details/getallcartitems`);
        if (res.status === 200) {
          setShowCartItems(res.data.cartItems);
          console.log(res.data.cartItems);
        }
      } catch (error) {
        console.log("unable to get the cert items", error);
      }
    };
    getCartItems();
  }, []);

  console.log(showCartItems.length, "dmfnsdfn");

  const product =
    showCartItems &&
    products.find((item) => item?._id === id && item?.category === category);
  // console.log(product, "productttttttt", category, id);
  // const handleCartDetails = (category, id) => {
  //   navigate(`/productdetails/${category}/${id}`);
  // };
  return (
    <>
      <NavBar />
      <div className="p-3 mt-6">
        <h2 className="text-2xl font-bold mb-4 p-3">Your Cart Items</h2>
        {showCartItems.length === 0 ? (
          <p className="p-3">Your cart is empty.</p>
        ) : (
          showCartItems.map((item) => (
            <div
              key={item._id}
              className="relative p-3 mb-2 sm:flex sm:flex-col xl:flex xl:flex-row xl:gap-96 xl:items-center lg:flex lg:gap-68 md:flex md:flex-row md:items-center md:gap-34 rounded border-1 border-[#f0f0f0] shadow-md"
            >
              <div className="flex lg:gap-6 gap-4">
                <div>
                  <img
                    src={item.image}
                    alt="image"
                    className="w-[150px] h-[150px] p-5 cursor-pointer transition-transform duration-100 ease-in-out transform hover:scale-105 rounded-lg border border-[#f0f0f0] shadow-md"
                    onClick={() =>
                      navigate(`/productdetails/${item?.category}/${item?._id}`)
                    }
                  />
                </div>
                <div className="flex flex-col gap-5 mt-10">
                  <div>
                    <p
                      className="font-semibold truncate w-50 xl:truncate xl:w-72 xl:text-[20px] md:text-[16px] text-[13px]"
                      title={item?.name || "No Name Available"}
                    >
                      {item.name}
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <p className="xl:text-xl font-semibold">₹ {item.price}</p>
                    <p className="line-through decoration-cyan-700 xl:text-xl font-semibold">
                      {item.originalPrice}
                    </p>
                    <p className="text-[#fb641b] xl:text-xl font-semibold">
                      {item.discount}
                    </p>
                  </div>
                </div>
              </div>
              <div className="gap-40 xl:flex xl:gap-30 md:flex md:gap-20">
                <div className="flex flex-col gap-10">
                  <p className="font-bold text-xl mt-6">
                    Your Total Price : {item.price * item.quantity}
                  </p>
                  <div className="flex gap-12 items-center justify-center">
                    <FaMinus
                      className="cursor-pointer"
                      onClick={(e) => handleMinus(e, item._id)}
                    />
                    <h4 className="border-1 border-[#fb6f92] w-10 h-8 flex items-center justify-center">
                      {item.quantity}
                    </h4>
                    <FaPlus
                      className="cursor-pointer"
                      onClick={(e) => handlePlus(e, item._id)}
                    />
                  </div>
                  <button
                    className="border-1 border-red-300 hover:bg-[#fb641b] hover:transition-all  hover:duration-100 hover:ease-in-out hover:text-white p-3 rounded-xl text-lg font-semibold cursor-pointer"
                    onClick={() =>
                      navigate(`/payment/${item?.category}/${item?._id}`)
                    }
                  >
                    Buy Now
                  </button>
                </div>
                <button
                  className="absolute top-2 right-2"
                  onClick={() => handleRemoveItem(item._id)}
                >
                  <MdCancel className="cursor-pointer text-xl" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default CartPage;
