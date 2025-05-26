import express from "express";
import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  paymentDetails: {
    uName: String,
    uMobileNO: String,
    uAddress: String,
    uCity: String,
    uState: String,
    uPincode: String,
  },
  product: {
    image: String,
    name: String,
    subtotal: Number,
    discount: String,
    totalPrice: Number,
  },
  category: {
    type: String,
    enum: ["electronic", "smartphone", "featured"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const Payment = mongoose.model("Payment", paymentSchema);
