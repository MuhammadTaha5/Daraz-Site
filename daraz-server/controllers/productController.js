const Product = require("../models/product");

exports.getProducts = async (req, res) => {
  try {
    const { category, keyword } = req.query;

    let filter = {};

    if (category) filter.category = category;
    if (keyword) {
      filter.title = { $regex: keyword, $options: "i" };
    }

    const products = await Product.find(filter).populate("category");

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFlashSaleProducts = async (req, res) => {
  try {
    const products = await Product.find({ isFlashSale: true });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};