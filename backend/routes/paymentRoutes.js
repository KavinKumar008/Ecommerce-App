import express from "express";
import { Payment } from "../models/Payment.js";

const router = express.Router();
// console.log(router, "routerrrrrr");

router.post("/payment", async (req, res) => {
  try {
    const { paymentDetails, product, category } = req.body;

    const newPayment = new Payment({
      paymentDetails,
      product,
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
