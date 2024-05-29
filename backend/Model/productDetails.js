const mongoose = require('mongoose');

const productDetailsSchema = new mongoose.Schema({
  huCode: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: String,
    required: true,
  },
  material: {
    type: String,
    required: true,
  },
  spaBatch: {
    type: String,
    required: true,
  },
  supplierBatch: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  startWidth: {
    type: Number,
    required: true,
  },
  middleWidth: {
    type: Number,
    required: true,
  },
  endWidth: {
    type: Number,
    required: true,
  },
  length: {
    type: Number,
    required: true,
  },
  notes: {
    type: String,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('productDetail', productDetailsSchema);
