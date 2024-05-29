const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const { hashPassword, generateAccessToken } = require('./helper');
const signUpSchema = require('../Model/Register');
const router = express.Router();

router.use(cors({ credentials: true, origin: 'http://localhost:5174' }));
router.use(express.json());
router.use(cookieParser());

router.post('/register', async (req, res) => {
  try {
    const existID_No = await signUpSchema.findOne({ ID: req.body.id });

    if (existID_No) {
      return res.status(500).json("ID already exists");
    }

    const hashPwd = await hashPassword(req.body.password);

    if (hashPwd) {
      const signUpData = new signUpSchema({
        Name: req.body.name,
        ID: req.body.id,
        UserPassword: hashPwd,
      });

      const postUser = await signUpData.save();

      if (postUser) {
        return res.status(200).json("Registered successfully!");
      }
    }
  } catch (err) {
    return res.status(400).json(err.message);
  }
});

router.post('/login', async (req, res) => {
  try {
    const validData = await signUpSchema.findOne({ ID: req.body.id }).select('+UserPassword');

    if (!validData) {
      return res.status(500).json("Invalid ID");
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, validData.UserPassword);

    if (isPasswordValid) {
      const userToken = generateAccessToken(validData);
      return res.header('Authorization', `Bearer ${userToken}`).json({ token: userToken });
    } else {
      return res.status(400).json("Invalid password");
    }
  } catch (err) {
    return res.status(500).json(err.message);
  }
});

module.exports = router;
