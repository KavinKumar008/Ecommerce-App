import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  originalPrice: Number,
  discount: String,
  image: String,
  changeImages: [String],
  description: String,
  rating: Number,
  category: {
    type: String,
    enum: ["electronic", "smartphone", "featured"],
    required: true,
  },
});

export const Product = mongoose.model("Product", productSchema);
