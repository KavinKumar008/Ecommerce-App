import express from "express";
import { Product } from "../models/Product.js";

const router = express.Router();

// const app = express();

router.get("/", (req, res) => {
  res.send("hello from express");
  console.log("hello from express");
});

router.post("/products/add", async (req, res) => {
  try {
    const products = req.body;
    console.log(products);
    await Product.insertMany(products);
    res.status(200).json({ message: "Products added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error adding products" });
  }
});

router.get("/getallProducts", async (req, res) => {
  try {
    const getAllProducts = await Product.find();
    console.log(getAllProducts, "sjdnsdns");
    res.status(200).json({ getAllProducts });
  } catch (error) {
    console.log("Failed to get all the data", error);
    res.status(400).json({ "Unable to get all products details": error });
  }
});

export default router;
