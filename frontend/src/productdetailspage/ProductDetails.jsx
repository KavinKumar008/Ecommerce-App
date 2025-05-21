import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { ElectronicItem } from "../productspage/ElectronicItem";
// import { SmartPhoneItem } from "../productspage/SmartPhoneItem";
import { AiFillThunderbolt } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import NavBar from "../navbar/NavBar";
import { FaStar } from "react-icons/fa";
// import { product } from "../productspage/product";
import { useCart } from "../CartProvider.jsx";
import { useProducts } from "../ProductProvider.jsx";
import { Navigate } from "react-router-dom";

const ProductDetails = () => {
  const { category, id } = useParams();
  const { addToCart } = useCart();
  const { products } = useProducts();
  const baseurl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [selectedImages, setSelectedImages] = useState("");
  console.log(products, "weioreioruioruioruqio");
  console.log(category, id, "sdkjfnkfj");

  const product = products.find((item) => {
    console.log("Checking:", item._id, item.category);
    return item._id.toString() === id && item.category === category;
  });
  console.log(product, "skjsdkfdjkf");

  useEffect(() => {
    if (product?.category) {
      setSelectedImages(product.image);
    }
  }, [product]);

  // const handleAddToCart = async () => {
  //   try {
  //     const res = await axios.post(`${baseurl}/add/cart-items`, { product });
  //   } catch (error) {
  //     console.log("Unable To Add to cart :", error);
  //   }
  // };

  // const [selectedImages, setSelectedImages] = useState(product.image);

  // if (!product && !product && !product)
  //   return <p className="p-15">Page Not Found</p>;

  const handleNavigateProfile = () => {
    navigate("/payment");
  };
  return (
    <>
      <NavBar />
      {products.length === 0 || !product ? (
        <p>Loading Product....</p>
      ) : (
        <>
          {product?.category === "electronic" && (
            <section className="p-8 flex lg:flex-row flex-col justify-around">
              <div className="w-full lg:w-1/2 lg:p-5 sm:w-full sm:flex sm:flex-col">
                <div className="lg:flex lg:gap-8 lg:items-center md:flex md:items-center md:justify-center flex gap-8 items-center">
                  <div className="flex flex-col gap-10">
                    {product.changeImages &&
                      product.changeImages.map((image, i) => (
                        <div key={i}>
                          <img
                            src={image}
                            alt="images"
                            className="w-[100px] h-[70px] cursor-pointer"
                            onClick={() => setSelectedImages(image)}
                          />
                        </div>
                      ))}
                  </div>
                  <div>
                    <img
                      src={selectedImages}
                      alt={product.image}
                      className="w-[500px] h-[400px] p-12 mb-4 border-[1px] border-[#f0f0f0]"
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-8">
                  <button
                    className="w-[60%] flex gap-3 items-center justify-center cursor-pointer bg-[#ff9f00] text-white p-3 rounded-sm outline-none"
                    onClick={() => addToCart(product)}
                  >
                    <FaShoppingCart />
                    <p>Add To Cart</p>
                  </button>
                  <button
                    className="w-[60%] flex gap-3 items-center justify-center cursor-pointer bg-[#fb641b] text-white p-3 rounded-sm outline-none"
                    onClick={handleNavigateProfile}
                  >
                    <AiFillThunderbolt /> Buy Now
                  </button>
                </div>
              </div>
              <div className="lg:w-1/2 lg:p-5 sm:w-full">
                <h2 className="text-xl mt-5 sm:text-sm md:text-lg lg:text-2xl font-medium mb-4">
                  {product.name}
                </h2>
                <p className="bg-amber-600 w-[50px] flex gap-2 items-center justify-center text-white rounded-md">
                  {product.rating}
                  <FaStar className="text-white" />
                </p>
                <div className="text-xl font-bold mb-2 flex flex-col gap-3 mt-2">
                  <div>
                    <span className="text-[#fb641b] font-medium">
                      Special Price
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <p>₹ {product.price}</p>
                    <p className="line-through decoration-cyan-700">
                      {product.originalPrice}
                    </p>
                    <p className="text-[#fb641b]">{product.discount}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 mt-3">
                  <p className="font-bold text-xl">Description</p>
                  <p className="text-gray-700">{product.description}</p>
                </div>
              </div>
            </section>
          )}
          {product?.category === "smartphone" && (
            <section className="lg:p-8 p-5 lg:flex justify-around">
              <div className="lg:w-[50%] w-full lg:p-5">
                <div className="lg:flex lg:gap-8 lg:items-center md:flex md:items-center md:justify-center flex gap-8 items-center">
                  <div className="flex flex-col gap-10">
                    {product.changeImages.map((image, i) => (
                      <div key={i}>
                        <img
                          src={image}
                          alt="images"
                          className="lg:w-[100px] lg:h-[70px] w-[150px] h-[80px] cursor-pointer"
                          onClick={() => setSelectedImages(image)}
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <img
                      src={selectedImages}
                      alt={product.name}
                      className="lg:w-[500px] lg:h-[400px] w-[700px] h-[400px] p-12 mb-4 border-[1px] border-[#f0f0f0]"
                    />
                  </div>
                </div>
                <div className="flex gap-3 lg:mt-8">
                  <button
                    className="w-[60%] flex gap-3 items-center justify-center cursor-pointer bg-[#ff9f00] text-white p-3 rounded-sm outline-none"
                    onClick={() => addToCart(product)}
                  >
                    <FaShoppingCart />
                    <p>Add To Cart</p>
                  </button>
                  <button
                    className="w-[60%] flex gap-3 items-center justify-center cursor-pointer bg-[#fb641b] text-white p-3 rounded-sm outline-none"
                    onClick={handleNavigateProfile}
                  >
                    <AiFillThunderbolt /> Buy Now
                  </button>
                </div>
              </div>
              <div className="lg:w-[50%] w-full lg:p-5">
                <h2 className="lg:text-2xl text-xl mt-5 font-medium mb-4">
                  {product.name}
                </h2>
                <p className="bg-amber-600 w-[50px] flex gap-2 items-center justify-center text-white rounded-md">
                  {product.rating}
                  <FaStar className="text-white" />
                </p>
                <div className="text-xl font-bold mb-2 flex flex-col gap-3 mt-2">
                  <div>
                    <span className="text-[#fb641b] font-medium">
                      Special Price
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <p>₹ {product.price}</p>
                    <p className="line-through decoration-cyan-700">
                      {product.originalPrice}
                    </p>
                    <p className="text-[#fb641b]">{product.discount}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 mt-3">
                  <p className="font-bold text-xl">Description</p>
                  <p className="text-gray-700">{product.description}</p>
                </div>
              </div>
            </section>
          )}
          {product?.category === "featured" && (
            <section className="p-8 lg:flex justify-around">
              <div className="lg:w-[50%] w-full lg:p-5">
                <div className="flex gap-8 items-center">
                  <div className="flex flex-col gap-10">
                    {product.changeImages &&
                      product.changeImages.map((image, i) => (
                        <div key={i}>
                          <img
                            src={image}
                            alt="images"
                            className="w-[100px] h-[70px] cursor-pointer"
                            onClick={() => setSelectedImages(image)}
                          />
                        </div>
                      ))}
                  </div>
                  <div>
                    <img
                      src={selectedImages}
                      alt={product.name}
                      className="lg:w-[500px] lg:h-[400px] h-[400px] w-[650px] lg:p-12 mb-4 border-[1px] border-[#f0f0f0]"
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-8">
                  <button
                    className="w-[60%] flex gap-3 items-center justify-center cursor-pointer bg-[#ff9f00] text-white p-3 rounded-sm outline-none"
                    onClick={() => addToCart(product)}
                  >
                    <FaShoppingCart />
                    <p>Add To Cart</p>
                  </button>
                  <button
                    className="w-[60%] flex gap-3 items-center justify-center cursor-pointer bg-[#fb641b] text-white p-3 rounded-sm outline-none"
                    onClick={handleNavigateProfile}
                  >
                    <AiFillThunderbolt /> Buy Now
                  </button>
                </div>
              </div>
              <div className="lg:w-[50%] w-full p-5">
                <h2 className="text-lg mt-5 sm:text-sm md:text-lg lg:text-2xl font-bold mb-4">
                  {product.name}
                </h2>
                <p className="bg-amber-600 w-[50px] flex gap-2 items-center justify-center text-white rounded-md">
                  {product.rating}
                  <FaStar className="text-white" />
                </p>
                <div className="text-xl font-bold mb-2 flex flex-col gap-3 mt-2">
                  <div>
                    <span className="text-[#fb641b] font-medium">
                      Special Price
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <p>₹ {product.price}</p>
                    <p className="line-through decoration-cyan-700">
                      {product.originalPrice}
                    </p>
                    <p className="text-[#fb641b]">{product.discount}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 mt-3">
                  <p className="font-bold text-xl">Description</p>
                  <p className="text-gray-700">{product.description}</p>
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;
