const mongoose = require("mongoose");

const productschema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    productPrice: { type: Number, required: true },
    productRating: { type: Number, required: true },
    productReviews: { type: String, required: true },
    productCategory: { type: String, required: true },
    productDesc: { type: String, required: true },
    productImage: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Products", productschema);
