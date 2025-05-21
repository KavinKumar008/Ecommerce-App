import express from "express";
import { CartItem } from "../models/CartItem.js";

const router = express.Router();
console.log(router, "kfjhfkh");

router.post("/cart-items/addtocart", async (req, res) => {
  try {
    const productData = req.body;

    const products = new CartItem(productData);
    await products.save();

    res.status(200).json({ products });
  } catch (error) {
    console.log("Unable to Add Data to the cart :", error);
    res.status(400).json({
      message: "unable to add the data to the cart item to db",
      error,
    });
  }
});

router.get("/cart-details/getallcartitems", async (req, res) => {
  try {
    const cartItems = await CartItem.find();
    res.status(200).json({ cartItems });
  } catch (error) {
    console.log("Unable to get the data from db");
    res.status(400).json({ "Failed to retrive cart details ": error });
  }
});

router.delete("/cart-details/delete", async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Cart item ID is required" });
    }
    const toDeleteItem = await CartItem.deleteOne({ _id: id });

    if (toDeleteItem.deletedCount === 0) {
      res.status(404).json({ message: "Cart item not found" });
    }
    res.status(200).json({ message: "Cart item deleted", toDeleteItem });
  } catch (error) {
    console.log("Unable to delete the cart item");
    res.status(400).json({ "Unable to delete the cart item ": error });
  }
});

export default router;
