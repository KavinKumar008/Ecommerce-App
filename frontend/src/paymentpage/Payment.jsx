import React, { useState } from "react";
import cameraimg1 from "../assets/cameraimgviews/cameraimg1.jpeg";
import { useProducts } from "../ProductProvider";
import { useParams } from "react-router-dom";

const Payment = () => {
  const { category, id } = useParams();
  const { products } = useProducts();
  const [paymentDetails, setPaymentDetails] = useState({
    uName: "",
    uMobileNO: "",
    uAddress: "",
    uCity: "",
    uState: "",
    uPincode: "",
  });

  console.log(category, "paramssss", id);

  const product = products.find((item) => {
    console.log("Checking:", item._id, item.category);
    return item._id.toString() === id && item.category === category;
  });
  console.log(paymentDetails);
  console.log(products, "products", product);

  return (
    <main className="lg:flex lg:h-screen">
      <section className="lg:w-[50%] lg:pl-10 p-5 flex flex-col gap-5">
        <form action="" className="flex flex-col lg:gap-9 gap-5">
          <h1 className="text-2xl font-bold">Payment page</h1>
          <label for="uname">
            <p className="mb-2 text-lg font-semibold">Full Name</p>
            <input
              type="text"
              id="uname"
              name="uName"
              placeholder="Enter your name"
              className="w-full p-3 outline-0 border-1 border-gray-300 rounded-md"
              value={paymentDetails.uName || ""}
              onChange={(e) =>
                setPaymentDetails({
                  ...paymentDetails,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </label>
          <label for="mobileno">
            <p className="mb-2 text-lg font-semibold">Mobile No</p>
            <input
              type="tel"
              id="mobileno"
              name="uMobileNO"
              placeholder="Enrer your mobile no"
              className="w-full p-3 outline-0 border-1 border-gray-300 rounded-md"
              value={paymentDetails.uMobileNO || ""}
              onChange={(e) =>
                setPaymentDetails({
                  ...paymentDetails,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </label>
          <label for="address">
            <p className="mb-2 text-lg font-semibold">Address</p>
            <textarea
              type="text"
              id="address"
              name="uAddress"
              className="w-full h-[100px] p-3 outline-0 border-1 border-gray-300 rounded-md"
              value={paymentDetails.uAddress || ""}
              onChange={(e) =>
                setPaymentDetails({
                  ...paymentDetails,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </label>
          <div className="lg:flex justify-between">
            <label for="city">
              <p className="mb-1 text-lg font-semibold">City</p>
              <input
                type="text"
                id="city"
                name="uCity"
                className="lg:w-full w-full p-1 outline-0 border-1 border-gray-300 rounded-md"
                value={paymentDetails.uCity || ""}
                onChange={(e) =>
                  setPaymentDetails({
                    ...paymentDetails,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </label>
            <label for="state">
              <p className="mb-1 text-lg font-semibold">State</p>
              <input
                type="text"
                id="state"
                name="uState"
                className="lg:w-full w-full p-1 outline-0 border-1 border-gray-300 rounded-md"
                value={paymentDetails.uState || ""}
                onChange={(e) =>
                  setPaymentDetails({
                    ...paymentDetails,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </label>
            <label for="pincode">
              <p className="mb-1 text-lg font-semibold">Pincode</p>
              <input
                type="text"
                id="pincode"
                name="uPincode"
                className="lg:w-full w-full p-1 outline-0 border-1 border-gray-300 rounded-md"
                value={paymentDetails.uPincode || ""}
                onChange={(e) =>
                  setPaymentDetails({
                    ...paymentDetails,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </label>
          </div>
        </form>
      </section>
      <section className="lg:w-[50%]  p-5">
        <p className="text-2xl font-bold">Your Ordered Item</p>
        <div className="mt-12 lg:h-[180px] xl:flex xl:gap-10 md:flex md:gap-20 h-auto p-4 rounded-md shadow-md">
          <div className="lg:flex lg:flex-col flex justify-around items-center">
            <img
              src={product?.image}
              alt="image"
              className="h-[80px] w-[100px]  p-2"
            />
            <p className="p-2 truncate w-[300px] text-sm">{product?.name}</p>
          </div>
          <div className="">
            <div className="mt-10 xl:mt-0 md:mt-0 flex flex-col gap-4 items-center">
              <div className="flex items-center justify-center gap-4">
                <p className="font-bold text-lg">Subtotal</p>
                <p className="flex justify-center items-center w-[150px] h-[40px] border border-gray-300">
                  <span className="text-xl">{product?.price}</span>
                </p>
              </div>
              <div className="flex items-center justify-center gap-4">
                <p className="font-bold text-lg">Discount</p>
                <p className="flex justify-center items-center w-[150px] h-[40px] border border-gray-300">
                  <span className="text-xl">{product?.discount}</span>
                </p>
              </div>
              <div className="flex items-center justify-center gap-4">
                <p className="font-bold text-lg">Total</p>
                <p className="flex justify-center items-center ml-7 w-[150px] h-[40px] border border-gray-300">
                  <span className="text-xl">{product?.price}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center lg:gap-30 gap-8 mt-16">
          <button className="lg:w-[200px] border border-red-400 p-3 bg-red-400 text-white rounded-md cursor-pointer text-lg font-semibold">
            Cancel Order
          </button>
          <button
            className="lg:w-[200px] border border-green-400 p-3 bg-green-400 text-white rounded-md cursor-pointer text-lg font-semibold"
            onClick={() => console.log("clickedddd")}
          >
            Place Order
          </button>
        </div>
      </section>
    </main>
  );
};

export default Payment;
