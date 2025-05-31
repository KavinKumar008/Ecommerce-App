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

    const newPayment = new Payment({
      paymentDetails,
      product,
      razorpay,
      category,
    });

    if (!newPayment) {
      res.status(400).json({ message: "Payment details are required" });
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
