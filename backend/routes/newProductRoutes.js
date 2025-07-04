import express from "express";
import { addNewProduct } from "../models/AddNewProduct.js";

const router = express.Router();
console.log(router, "routerrrrrr");

router.post("/addNewProduct", async (req, res) => {
  try {
    const { addInputs } = req.body;
    console.log(addInputs, "newproductdataaaa");

    const newProduct = new addNewProduct(addInputs);
    await newProduct.save();
    res
      .status(200)
      .json({ message: "New Product Added Successfuly", newProduct });
  } catch (error) {
    console.log("Unale To add New Product", error);
    res.status(400).json({ message: "Unable to add new product", error });
  }
});

export default router;
