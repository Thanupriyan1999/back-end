const express = require('express');
const app = express();
const DbConnection = require('./DB/db');
const path = require('path');
const cors = require('cors');
const UserController = require('./Controllers/UserController');
const newLocal = './Controllers/ProductController';
const ProductController = require(newLocal);

require('dotenv').config();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Database connection
DbConnection();

// Controller
app.use('/auth/user/v1/', UserController);
app.use('/auth/product/v1/', ProductController);

app.get('/*', (req, res) => {
  res.status(404).send('<h1>404 Error<h1>');
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
