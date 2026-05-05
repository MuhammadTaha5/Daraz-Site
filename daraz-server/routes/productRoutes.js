const express = require("express");
const router = express.Router();

const {
  getProducts,
  getFlashSaleProducts,
  getProductById,
} = require("../controllers/productController");

router.get("/", getProducts);

router.get("/flash-sale", getFlashSaleProducts);

router.get("/:id", getProductById);

module.exports = router;