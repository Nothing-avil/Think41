const { Product } = require("../models");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json({ success: true, data: products });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id))
      return res.status(400).json({ success: false, message: "Invalid ID" });

    const product = await Product.findByPk(id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    res.status(200).json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
