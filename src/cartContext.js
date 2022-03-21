import React, { useReducer, useEffect, useContext } from "react";
import cartReducer from "./cartReducer";

const CartContext = React.createContext(null);

let initialCart;
try {
  initialCart = JSON.parse(localStorage.getItem("cart")) ?? []; // If null, use []
} catch (error) {
  console.error("The cart could not be parsed into JSON");
}

export function CartProvider(props) {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);
  useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);

  const contextValue = { cart, dispatch }
  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  return context;
} // Custom hook to give indirect access to the context
