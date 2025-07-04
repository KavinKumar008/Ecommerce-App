import mongoose, { model } from "mongoose";

const addNewProductSchema = new mongoose.Schema({
  image: String,
  name: String,
  price: Number,
  originalPrice: Number,
  description: String,
  rating: Number,
  discount: String,
  changeImages: [String],
  isNeww: {
    type: Boolean,
    default: true,
  },
  category: {
    type: String,
    enum: ["electronic", "smartphone", "featured"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const addNewProduct = mongoose.model(
  "addNewProduct",
  addNewProductSchema
);
