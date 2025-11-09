// backend/seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const data = [
  { title: 'Blue T-shirt', description: '100% cotton', price: 499, image: '' },
  { title: 'Sneakers', description: 'Comfort shoes', price: 1999, image: '' }
];

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Product.deleteMany({});
  await Product.insertMany(data);
  console.log('Seeded products');
  process.exit();
}).catch(err => {
  console.error(err);
  process.exit(1);
});
