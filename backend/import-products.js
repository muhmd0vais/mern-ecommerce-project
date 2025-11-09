require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const Product = require("./models/Product");

// connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

async function importProducts() {
  try {
    const data = fs.readFileSync("./products.json", "utf-8");
    const products = JSON.parse(data);

    await Product.deleteMany(); // clear old data
    await Product.insertMany(products);

    console.log(`✅ Successfully imported ${products.length} products`);
    process.exit();
  } catch (err) {
    console.error("❌ Import failed:", err.message);
    process.exit(1);
  }
}

importProducts();
