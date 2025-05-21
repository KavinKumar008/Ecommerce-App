import React, { Children, createContext, useContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const baseurl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const res = await axios.get(`${baseurl}/getallProducts`);
        if (res.status === 200) {
          setProducts(res.data.getAllProducts);
          console.log(res.data.getAllProducts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllProducts();
  }, []);

  // const filteringProducts = products.filter((item) =>
  //   item?.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  // console.log(filteringProducts, "filterrinefweifjiofj");
  return (
    <ProductContext.Provider value={{ products, searchTerm, setSearchTerm }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
