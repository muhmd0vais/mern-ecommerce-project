import React, { useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import "./Toast.css";

export default function Toast() {
  const { state, dispatch } = useCart();
  const t = state.toast;
  useEffect(() => {
    if (!t) return;
    const id = setTimeout(() => dispatch({ type: "CLEAR_TOAST" }), 2000);
    return () => clearTimeout(id);
  }, [t]);

  if (!t) return null;
  return (
    <div className={`toast ${t.type}`}>
      {t.message}
    </div>
  );
}
