// backend/routes/cart.js
const express = require("express");
const router = express.Router();

// GET /api/cart/test — just to verify the route works
router.get("/test", (req, res) => {
  res.json({ message: "Cart route is working!" });
});

module.exports = router;
