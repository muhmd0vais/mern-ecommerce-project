import React from "react";
import { useCart } from "../contexts/CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function formatPrice(n) {
  return "₹" + n.toLocaleString();
}
const addToWishlist = () => {
  const list = JSON.parse(localStorage.getItem("wishlist") || "[]");
  if (!list.find(x => x.id === product.id)) {
    list.push({ id: product.id, name: product.name, image: product.image, price: product.price });
    localStorage.setItem("wishlist", JSON.stringify(list));
    dispatch({ type: "ADD_TOAST", payload: { message: "Added to wishlist", type: "success" }});
  }
};

export default function ProductCard({ product }) {
  const { dispatch } = useCart();
  const navigate = useNavigate();

  const addToCart = () => {
    dispatch({ type: "ADD", payload: { id: product.id, name: product.name, price: product.price, image: product.image }});
  };

  const view = () => navigate(`/product/${encodeURIComponent(product.id)}`);

  return (
    <div className="card">
      <img src={product.image || "https://via.placeholder.com/300"} alt={product.name} />
      <h3>{product.name}</h3>
      <div className="rating">{"★".repeat(Math.round(product.rating || 0))}{"☆".repeat(5 - Math.round(product.rating || 0))}</div>
      <p className="desc">{product.shortDescription}</p>
      <div className="card-bottom">
        <div className="price">{formatPrice(product.price)}</div>
        <div>
          <button onClick={addToCart} className="btn-primary">Add</button>
          <button onClick={view} className="btn-secondary">View</button>
        </div>
      </div>
    </div>
  );
}
