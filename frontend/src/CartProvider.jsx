import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const cartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const baseurl = import.meta.env.VITE_API_URL;

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

  console.log(addToCart, "addtocart");

  return (
    <cartContext.Provider value={{ cartItems, addToCart, setCartItems }}>
      {children}
    </cartContext.Provider>
  );
};

export const useCart = () => useContext(cartContext);
