const express = require("express");
const router = express.Router();

const {
  getProducts,
  getFlashSaleProducts,
  getProductById,
} = require("../controllers/productController");

// all products + filters
router.get("/", getProducts);

// flash sale
router.get("/flash-sale", getFlashSaleProducts);

// single product
router.get("/:id", getProductById);

module.exports = router;