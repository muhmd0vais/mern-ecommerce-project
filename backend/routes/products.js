// backend/routes/products.js
const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

// Load JSON fallback if you need (if you used DB you can switch to Mongoose)
function loadProductsJson() {
  const p = path.join(__dirname, "../data/products.json"); // adjust if your file name/ location different
  if (fs.existsSync(p)) {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  }
  return [];
}

const rawProducts = loadProductsJson();

// GET /api/products?limit=20&skip=0&category=Shoes
router.get("/", (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit || 20), 200);
    const skip = parseInt(req.query.skip || 0);
    const category = req.query.category?.toLowerCase();

    // filter by category string appearing in product_category_tree or brand or name
    let filtered = rawProducts.filter(p => {
      if (!p) return false;
      if (!category) return true;
      const cats = (p.product_category_tree || p.category || "").toString().toLowerCase();
      return cats.includes(category) || (p.brand || "").toString().toLowerCase().includes(category);
    });

    // map to normalized response
    const mapped = filtered.map(p => ({
      id: p._id || p.uniq_id || p.pid || (p._id ? p._id : undefined) || (Math.random() + ""), // fallback id
      name: p.name || p.product_name || p.title || "No Name",
      description: (p.description || "").toString(),
      shortDescription: ((p.description || "").toString().slice(0, 150) + "..."),
      price: Number(p.price || p.discounted_price || p.retail_price || 0),
      brand: p.brand || "",
      images: Array.isArray(p.images) ? p.images : (p.image ? (typeof p.image === "string" ? (() => { try { return JSON.parse(p.image) } catch(e){ return p.image.split(",").map(s=>s.trim()) } })() : [p.image]) : []),
      rating: p.overall_rating || p.product_rating || 0,
      raw: p
    }));

    const page = mapped.slice(skip, skip + limit);

    res.json({ total: mapped.length, count: page.length, products: page });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/products/:id
router.get("/:id", (req, res) => {
  const id = req.params.id;
  let product = rawProducts.find(p => p.uniq_id === id || p.pid === id || (p._id && p._id === id));
  if (!product) {
    // try by name (case-insensitive)
    const nameLower = id.toLowerCase();
    product = rawProducts.find(p => (p.name || p.product_name || "").toString().toLowerCase() === nameLower);
  }
  if (!product) return res.status(404).json({ message: "Product not found" });

  // return normalized product
  const normalized = {
    id: product._id || product.uniq_id || product.pid,
    name: product.name || product.product_name,
    description: product.description || "",
    price: Number(product.price || product.discounted_price || product.retail_price || 0),
    brand: product.brand || "",
    images: Array.isArray(product.images) ? product.images : (product.image ? (() => { try { return JSON.parse(product.image) } catch(e){ return product.image.split(",").map(s=>s.trim()) } })() : []),
    rating: product.overall_rating || product.product_rating || 0,
    raw: product
  };

  res.json(normalized);
});

module.exports = router;
