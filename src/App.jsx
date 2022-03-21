import React, { useState, useEffect } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import Detail from "./Detail";
import Cart from "./Cart";
import Checkout from "./Checkout";
import { Routes, Route } from "react-router-dom";

export default function App() {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) ?? []; // If null, use []
    } catch (error) {
      console.error("The cart could not be parsed into JSON");
      return [];
    }
  }); // Functions are lazy rendered, so this function will only run on first render

  useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);

  function addToCart(id, sku) {
    setCart((items) => {
      const itemInCart = items.find((i) => i.sku === sku);

      if (itemInCart) { // If item in cart, increase quantity
        return items.map((i) => i.sku === sku
          ? { ...i, quantity: i.quantity + 1 }
          : i);
      } else { // Otherwise, concatenate item to cart items
        return [...items, { id, sku, quantity: 1 }];
      }
    })
  }

  function updateQuantity(sku, quantity) {
    setCart((items) => {
      if (quantity === 0) { // Removes item from cart if quantity = 0 
        return items.filter((i) => i.sku !== sku);
      }
      return items.map((i) => i.sku === sku
        ? { ...i, quantity }
        : i);
    })
  }

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1>Welcome to Carved Rock Fitness</h1>} />
            <Route path="/:category" element={<Products />} />
            <Route
              path="/:category/:id"
              element={<Detail addToCart={addToCart} />}
            />
            <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity} />} />
            <Route path="/checkout" element={<Checkout cart={cart} />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
