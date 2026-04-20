const express = require("express");
const router = express.Router();
const Products = require("../Database/products");
const multer = require("multer");
const { trusted } = require("mongoose");

const upload = multer({ storage: multer.memoryStorage() });

router.post("/products", upload.single("productImage"), async (req, res) => {
  try {
    const {
      productName,
      productPrice,
      productRating,
      productReviews,
      productCategory,
      productDesc,
    } = req.body;

    if (
      !productName ||
      !productPrice ||
      !productRating ||
      !productReviews ||
      !productCategory ||
      !productDesc
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all fields" });
    }

    const newProduct = new Products({
      productName,
      productPrice,
      productRating,
      productReviews,
      productCategory,
      productDesc,
      productImage: req.file
        ? {
            data: req.file.buffer,
            contentType: req.file.mimetype,
          }
        : null,
    });

    await newProduct.save();

    res.status(200).json({ success: true, message: "New Product Added" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

router.get("/products", async (req, res) => {
  try {
    const prodcuts = await Products.find();
    res.status(200).json({ success: true, prodcuts });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

router.delete("/products/:id", async (req, res) => {
  try {
    const deleteProducts = await Products.findByIdAndDelete(req.params.id);

    if (!deleteProducts) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;
