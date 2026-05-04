// models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    price: { type: Number, required: true },
    discount: String,
    comments: String,

    image: { type: String, required: true },
    relatedImages: [String],

    productDetails: [String],

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },

    isFlashSale: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);