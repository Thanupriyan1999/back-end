const express = require("express");
const bcrypt = require("bcryptjs");
const { hashPassword, generateAccessToken } = require("./helper");
const authenticateToken = require("./helper").authenticateToken;
const signUpSchema = require("../Model/Register");
const product = require("../Model/productDetails");
const cors = require("cors");
const app = express();
const router = express.Router();

app.use(cors());

router.post("/create-product", authenticateToken, async (req, res) => {
  try {
    const existsHuCode = product.find({ hucode: req.body.hucode });
    if(existsHuCode){
      return res.status(400).json({ message: "hucode already exists" });
    }
    const productDetails = new product({
      ...req.body,
      user: req.user.name,
    });
    await productDetails.save();
    res.status(201).json({ productDetails: productDetails });
  } catch (err) {
    res.status(500).json({ error: err.message || err });
  }
});

router.get("/get-product/:huCode", authenticateToken, async (req, res) => {
  try {
    const data = await product.findOne({ huCode: req.params.huCode });
    if (!data) {
      return res.status(404).json({ message: "haven't any product", err: err });
    }
    res.json({ product: data });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/update-product/:huCode", authenticateToken, async (req, res) => {
  try {
    const updatedData = await product.findOneAndUpdate(
      { huCode: req.params.huCode },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedData) {
      return res.status(404).json({ error: "Data not found" });
    }

    res.json({ data: updatedData });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/all-product-details", authenticateToken, async (req, res) => {
  try {
    const data = await product.find({});
    res.json({product: data});
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
