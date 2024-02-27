const mongoose = require('mongoose');
const validator = require('validator');

const productSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    minLength: 3
  },
  brand: {
    type: String,
    required: true,
    minLength: 3
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  }
});

const Product = mongoose.model('products', productSchema);

module.exports = Product;