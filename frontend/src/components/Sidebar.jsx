import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaList, FaHeart, FaShoppingBag, FaCog } from "react-icons/fa";
import "./Sidebar.css";

export default function Sidebar({ isOpen }) {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <Link to="/"><FaHome /> Home</Link>
      <Link to="/categories"><FaList /> Categories</Link>
      <Link to="/wishlist"><FaHeart /> Wishlist</Link>
      <Link to="/orders"><FaShoppingBag /> My Orders</Link>
      <Link to="/settings"><FaCog /> Settings</Link>
    </div>
  );
}
