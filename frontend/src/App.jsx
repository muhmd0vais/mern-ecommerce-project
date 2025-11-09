import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminAdd from "./pages/AdminAdd";
import { CartProvider } from "./contexts/CartContext";
import "./styles/global.css";

function App() {
  const [search, setSearch] = useState("");

  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar onSearch={setSearch} />
        <Routes>
          <Route path="/" element={<ProductList search={search} />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminAdd />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
