import React, { useEffect, useState } from "react";
// import NavBar from "../navbar/NavBar";
import { useCart } from "../CartProvider.jsx";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import NavBar from "../navbar/NavBar.jsx";
import axios from "axios";

const CartPage = () => {
  const { cartItems, setCartItems } = useCart();
  const [count, setCount] = useState(1);
  const [showCartItems, setShowCartItems] = useState([]);
  const baseurl = import.meta.env.VITE_API_URL;

  const handlePlus = (e, itemId) => {
    console.log(itemId, "itemiddddd");
    e.preventDefault();
    setShowCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };
  console.log(cartItems, "cartitems");

  const handleMinus = (e, itemId) => {
    e.preventDefault();
    setShowCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemoveItem = async (itemId) => {
    try {
      const deleteRes = await axios.delete(`${baseurl}/cart-details/delete`, {
        data: { id: itemId },
      });
      const updatedCartItem = showCartItems.filter(
        (item) => item._id !== itemId
      );
      setCartItems(updatedCartItem);
      console.log(updatedCartItem, "updatedCartItem");
      console.log(itemId, "itemememem");
    } catch (error) {}
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
  return (
    <>
      <NavBar />
      <div className="p-3">
        <h2 className="text-2xl font-bold mb-4 p-3">Your Cart Items</h2>
        {showCartItems.length === 0 ? (
          <p className="p-3">Your cart is empty.</p>
        ) : (
          showCartItems.map((item) => (
            <div
              key={item._id}
              className="p-3 mb-2 lg:flex lg:gap-96 rounded border-1 border-[#f0f0f0] shadow-md"
            >
              <div className="flex lg:gap-6 gap-4">
                <div>
                  <img
                    src={item.image}
                    alt="image"
                    className="w-[150px] h-[150px]"
                  />
                </div>
                <div className="flex flex-col gap-5">
                  <div>
                    <p className="font-semibold lg:truncate lg:w-72 text-[13px]">
                      {item.name}
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <p>₹ {item.price}</p>
                    <p className="line-through decoration-cyan-700">
                      {item.originalPrice}
                    </p>
                    <p className="text-[#fb641b]">{item.discount}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-8">
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
                  className="border-1 border-red-300 hover:bg-red-600 hover:transition-all  hover:duration-100 hover:ease-in-out hover:text-white p-3 rounded-xl text-lg font-semibold cursor-pointer"
                  onClick={() => handleRemoveItem(item._id)}
                >
                  Remove
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
