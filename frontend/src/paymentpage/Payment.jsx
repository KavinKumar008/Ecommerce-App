import React, { useState } from "react";
import cameraimg1 from "../assets/cameraimgviews/cameraimg1.jpeg";
import { useProducts } from "../ProductProvider";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

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

  const baseurl = import.meta.env.VITE_API_URL;
  console.log(baseurl);

  console.log(category, "paramssss", id);

  const product = products.find((item) => {
    console.log("Checking:", item._id, item.category);
    return item._id.toString() === id && item.category === category;
  });
  console.log(paymentDetails);
  console.log(products, "products", product);

  const loadRazorParScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorParScript();
    if (!res) {
      toast.error("Razorpay SDK failed to load. Are you online?");
      return;
    }
    const { data: order } = await axios.post(`${baseurl}/create-order`, {
      amount: product.price * 100,
    });
    const options = {
      key: "rzp_test_bwMRDnSLV4R3vI",
      amount: product.price,
      currency: "INR",
      name: "E-commerce Payment",
      description: "Payment for your order",
      image: product.image,
      order_id: order.id,
      handler: function (response) {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
          response;
        console.log(
          "Payment Success:",
          razorpay_payment_id,
          razorpay_order_id,
          razorpay_signature
        );
        handlePaymentApi(response);
        toast.success("Payment Successful!");
      },
      prefill: {
        name: paymentDetails.uName,
        mobile: paymentDetails.uMobileNO,
        city: paymentDetails.uCity,
      },
      theme: { color: "3399cc" },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handlePaymentApi = async (response) => {
    try {
      const res = await axios.post(`${baseurl}/payment`, {
        paymentDetails,
        product: {
          image: product.image,
          name: product.name,
          subtotal: product.price,
          discount: product.discount,
          totalPrice: product.price,
        },
        razorpay: {
          orderId: response.razorpay_order_id,
          paymentId: response.razorpay_payment_id,
          signature: response.razorpay_signature,
        },
        category,
      });

      if (res.status === 200) {
        console.log(res);
      }
    } catch (error) {
      console.log("Error posting the payment details :", error);
    }
  };
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
              required
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
              required
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
              required
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
                required
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
                required
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
                required
              />
            </label>
          </div>
        </form>
      </section>
      <section className="lg:w-[50%]  p-5">
        <p className="text-2xl font-bold">Your Ordered Item</p>
        <div className="mt-12 lg:h-[180px] xl:flex xl:gap-5 md:flex md:gap-20 h-auto p-4 rounded-md shadow-md">
          <div className="lg:flex lg:flex-col flex justify-around items-center">
            <img
              src={product?.image}
              alt="image"
              className="h-[100px] w-[130px]  p-2"
            />
            <p
              className="p-2 truncate w-[400px] xl:w-[300px] text-sm"
              title={product?.name}
            >
              {product?.name}
            </p>
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
            onClick={handlePayment}
          >
            Place Order
          </button>
        </div>
      </section>
    </main>
  );
};

export default Payment;
