import React from "react";
import { useCart } from "../contexts/CartContext";

export default function CartPage() {
  const { cart, dispatch } = useCart();

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE", payload: id });
  };

  const total = cart.reduce((sum, p) => sum + (p.price * p.qty), 0);

  return (
    <div className="container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <div>
                <strong>{item.name}</strong> — {item.qty} × ₹{item.price}
              </div>
              <button
                className="btn ghost"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
          <hr />
          <h3>Total: ₹{total}</h3>
        </div>
      )}
    </div>
  );
}
