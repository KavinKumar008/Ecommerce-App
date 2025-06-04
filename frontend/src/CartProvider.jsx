import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const cartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const baseurl = import.meta.env.VITE_API_URL;
  const [showCartItems, setShowCartItems] = useState([]);

  const addToCart = async (item) => {
    try {
      const res = await axios.post(`${baseurl}/cart-items/addtocart`, item);

      if (res.status === 200) {
        toast.success("Item added to cart");

        setCartItems((prevItems) => {
          const existingItem = prevItems.find(
            (cartItem) => cartItem._id === item._id
          );

          if (existingItem) {
            // Increment quantity if item already in cart
            return prevItems;
          } else {
            // Add new item with quantity 1
            return [...prevItems, { ...item, quantity: 1 }];
          }
        });
      }
    } catch (error) {
      console.error("Unable to add to cart:", error);
      toast.error("Failed to add item");
    }
  };

  const handlePlus = (e, itemId) => {
    console.log(itemId, "itemiddddd");
    e.preventDefault();
    setShowCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

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

  // console.log(addToCart, "addtocart");

  return (
    <cartContext.Provider
      value={{
        cartItems,
        addToCart,
        setCartItems,
        handlePlus,
        handleMinus,
        showCartItems,
        setShowCartItems,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export const useCart = () => useContext(cartContext);
