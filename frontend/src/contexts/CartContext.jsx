import React, { createContext, useReducer, useContext } from "react";

const CartContext = createContext();

const initialState = {
  cart: [],
  toasts: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      const existing = state.cart.find((p) => p.id === action.payload.id);
      if (existing) {
        // Limit to max 5 units
        const updated = state.cart.map((p) =>
          p.id === action.payload.id
            ? { ...p, qty: Math.min(p.qty + 1, 5) }
            : p
        );
        return { ...state, cart: updated };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, qty: 1 }],
      };

    case "REMOVE":
      return {
        ...state,
        cart: state.cart.filter((p) => p.id !== action.payload),
      };

    case "CLEAR":
      return { ...state, cart: [] };

    case "ADD_TOAST":
      return { ...state, toasts: [...state.toasts, action.payload] };

    case "REMOVE_TOAST":
      return {
        ...state,
        toasts: state.toasts.filter((_, i) => i !== 0),
      };

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <CartContext.Provider value={{ cart: state.cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
export { CartContext };
