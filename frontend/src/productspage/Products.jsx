import React, { useState } from "react";

// import { ElectronicItem } from "./ElectronicItem";
// import { SmartPhoneItem } from "./SmartPhoneItem";
// import { FeaturedBrands } from "./FeaturedBrands";
// import { SlideBrands } from "./SlideBrands";
import Footer from "../footer/Footer";
import { useNavigate } from "react-router-dom";
import NavBar from "../navbar/NavBar";
import { useEffect } from "react";
import axios from "axios";
import { useProducts } from "../ProductProvider";

const Products = () => {
  // console.log(JSON.stringify(SmartPhoneItem, "itememememeem"));
  const navigate = useNavigate();
  const { products, filteringProducts } = useProducts();

  const baseurl = import.meta.env.VITE_API_URL;
  console.log(baseurl, "baseurllllll");

  // const [products, setProducts] = useState([]);

  function handleSeparateItemDetails(category, id) {
    navigate(`/productdetails/${category}/${id}`);
  }

  // useEffect(() => {
  //   const sendProducts = async () => {
  //     try {
  //       const dataWithCategory = SlideBrands.map((item) => ({
  //         ...item,
  //         category: "slideimages",
  //       }));
  //       console.log(dataWithCategory, "data with category");
  //       await axios.post(`${baseurl}/products/add`, dataWithCategory);
  //       console.log("uploaded");
  //     } catch (error) {
  //       console.log("error uploading :", error);
  //     }
  //   };
  //   sendProducts();
  // }, []);

  // useEffect(() => {
  //   const getAllProducts = async () => {
  //     try {
  //       const res = await axios.get(`${baseurl}/getall`);
  //       if (res.status === 200) {
  //         setProducts(res.data.getAllProducts);
  //         console.log(res.data.getAllProducts);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getAllProducts();
  // }, []);

  // console.log(products, "lfjwefwefwejfnhweo");

  const electronicitems = products.filter(
    (item) => item.category === "electronic"
  );

  const smartphoneitems = products.filter(
    (item) => item.category === "smartphone"
  );

  const featureditems = products.filter((item) => item.category === "featured");
  console.log(electronicitems);

  const slideImageItems = products.filter(
    (item) => item.category === "slideimages"
  );

  return (
    <main>
      <NavBar />
      <section className="bg-yellow-400 mt-25 ml-3 mr-3 shadow-md">
        <p className="">SlideImages</p>
        {slideImageItems &&
          slideImageItems?.map((item) => (
            <div key={item._id}>
              <img src={item?.image} alt={item?.name} />
            </div>
          ))}
      </section>
      <section className="bg-white mt-25 ml-3 mr-3 shadow-md">
        <p className="p-4 lg:text-2xl text-xl font-bold">Best Of Electronics</p>
        <div className="lg:grid lg:grid-cols-3 gap-4 mt-5 grid grid-cols-1 md:grid md:grid-cols-2">
          {electronicitems &&
            electronicitems?.map((item) => (
              <div key={item._id} className="grid place-items-center mb-10">
                <img
                  src={item.image || ""}
                  alt="electronics"
                  className="transition-transform duration-100 ease-in-out transform hover:scale-105 rounded-lg w-[150px] h-[250px] cursor-pointer mb-5"
                  onClick={() =>
                    handleSeparateItemDetails("electronic", item._id)
                  }
                />
                <p
                  className="lg:truncate lg:w-64 truncate w-44"
                  title={item?.name || "No Name Available"}
                >
                  {item.name}
                </p>
                <p className="text-xl font-bold">₹ {item.price}</p>
              </div>
            ))}
        </div>
      </section>
      <section className="bg-white mt-5 ml-3 mr-3 shadow-md">
        <p className="p-4 lg:text-2xl text-xl font-bold">
          Best Deals On Smartphones
        </p>
        <div className="lg:grid lg:grid-cols-3 gap-4 mt-5 grid grid-cols-1 md:grid md:grid-cols-2">
          {smartphoneitems &&
            smartphoneitems?.map((mobile) => (
              <div key={mobile._id} className="grid place-items-center mb-10">
                <img
                  src={mobile.image || ""}
                  alt="mobiles"
                  className="transition-transform duration-100 ease-in-out transform hover:scale-105 rounded-lg w-[150px] h-[250px] cursor-pointer mb-5"
                  onClick={() =>
                    handleSeparateItemDetails("smartphone", mobile._id)
                  }
                />
                <p
                  className="truncate w-64"
                  title={mobile?.name || "No Name Available"}
                >
                  {mobile.name}
                </p>
                <p className="text-xl font-bold">₹ {mobile.price}</p>
              </div>
            ))}
        </div>
      </section>
      <section className="bg-white mt-5 ml-3 mr-3 shadow-md mb-5">
        <p className="p-4 lg:text-2xl text-xl font-bold">Featured Brands</p>
        <div className="lg:grid lg:grid-cols-2 grid grid-cols-1 md:grid md:grid-cols-2">
          {featureditems &&
            featureditems?.map((brand) => (
              <div className="grid place-items-center mb-10" key={brand._id}>
                <img
                  src={brand.image || ""}
                  alt="featuredbrands"
                  className="cursor-pointer md:w-[300px] xl:w-[450px]"
                  onClick={() =>
                    handleSeparateItemDetails("featured", brand._id)
                  }
                />
              </div>
            ))}
        </div>
      </section>
      <section>
        <Footer />
      </section>
    </main>
  );
};

export default Products;
