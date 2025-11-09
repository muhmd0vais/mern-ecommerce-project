require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("./logger");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// ✅ Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Mongo error", err));

// ✅ Routes
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart"); // <-- added

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes); // <-- added

// ✅ Test route
app.get("/", (req, res) => {
  res.send("E-commerce backend is running successfully 🚀");
});

// ✅ Welcome endpoint with logging
app.get("/welcome", (req, res) => {
  logger.info(`Request received: ${req.method} ${req.path}`);
  res.json({ message: "Welcome to the E-commerce API!" });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
