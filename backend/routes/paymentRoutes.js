import express from "express";
import { Payment } from "../models/Payment.js";
import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();
// console.log(router, "routerrrrrr");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post("/create-order", async (req, res) => {
  const { amount, currency } = req.body;
  try {
    const options = {
      amount,
      currency,
      receipt: `receipt_order_${Date.now()}`,
    };
    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    console.log("Error catching order", error);
    res.status(500).json({ message: "Error creating order", error });
  }
});

router.post("/payment", async (req, res) => {
  try {
    const { paymentDetails, product, category, razorpay } = req.body;
    const { uName, uMobileNO, uState, uCity, uAddress, uPincode } =
      paymentDetails;

    const nameRegex = /^[a-zA-Z][a-zA-Z\s]{1,49}$/;
    const mobileRegex = /^[6-9]\d{9}$/;
    const pincodeRegex = /^[1-9][0-9]{5}$/;
    const cityStateRegex = /^[a-zA-Z\s]{2,}$/;
    const addresRegex = /^[a-zA-Z0-9\s,.'-]{10,100}$/;

    let errors = [];

    if (!nameRegex.test(uName)) errors.push("Invalid name");
    if (!mobileRegex.test(uMobileNO)) errors.push("Invalid Mobile Number");
    if (!pincodeRegex.test(uPincode)) errors.push("Invalid Pincode");
    if (!cityStateRegex.test(uCity)) errors.push("Invalid City");
    if (!cityStateRegex.test(uState)) errors.push("Invalid State");
    if (!addresRegex.test(uAddress)) errors.push("Invalid Address");

    const newPayment = new Payment({
      paymentDetails: {
        uName,
        uMobileNO,
        uAddress,
        uCity,
        uState,
        uPincode,
      },
      product,
      razorpay,
      category,
    });

    if (errors.length > 0) {
      res.status(400).json({ message: "Validation failed", errors });
    }
    await newPayment.save();

    res
      .status(200)
      .json({ message: "Payment Data seved Successfully", newPayment });
    console.log(paymentDetails, "paymentbodydataaaaaa", product);
  } catch (error) {
    console.log("Unable to save the payment detils to db :", error);
    res
      .status(400)
      .json({ message: "unable to save the payment details to db" });
  }
});

export default router;
