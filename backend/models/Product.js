// backend/models/Product.js
const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
  name: String,
  title: String,
  description: String,
  price: Number,
  images: { type: [String], default: [] },   // array of image URLs
  videos: { type: [String], default: [] },   // array of video URLs (optional)
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Product', ProductSchema);
