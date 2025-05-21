import express from "express";
import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  image: String,
  name: String,
  price: Number,
  originalPrice: Number,
  discount: String,
  totalPrice: Number,
  quantity: {
    type: Number,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const CartItem = mongoose.model("CartItem", cartItemSchema);
