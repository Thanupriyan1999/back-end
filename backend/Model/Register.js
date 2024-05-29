const mongoose = require('mongoose');
const validator = require('validator');

const passwordValidator = (value) => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
  return passwordRegex.test(value);
};

const UserSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: [true, 'Please enter Name'],
  },
  ID: {
    type: String,
    required: [true, 'Please enter ID'],
    unique: true,
  },
  UserPassword: {
    type: String,
    required: [true, 'Please enter Password'],
    validate: {
      validator: passwordValidator,
      message: 'Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character (!@#$%^&*)',
    },
  },
});

module.exports = mongoose.model('User', UserSchema);
