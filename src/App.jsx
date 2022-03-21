import React, { useReducer, useEffect } from "react";
import cartReducer from "./cartReducer";
import { CartContext } from "./cartContext";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import Detail from "./Detail";
import Cart from "./Cart";
import Checkout from "./Checkout";
import { Routes, Route } from "react-router-dom";

let initialCart;

try {
  initialCart = JSON.parse(localStorage.getItem("cart")) ?? []; // If null, use []
} catch (error) {
  console.error("The cart could not be parsed into JSON");
}

export default function App() {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1>Welcome to Carved Rock Fitness</h1>} />
            <Route path="/:category" element={<Products />} />
            <Route
              path="/:category/:id"
              element={<Detail dispatch={dispatch} />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout dispatch={dispatch} />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </CartContext.Provider>
  );
}
