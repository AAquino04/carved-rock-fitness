
export default function cartReducer(cart, action) {
  switch (action.type) {
    case "empty":
      return [];
    case "add":
      const { id, sku } = action;
      const itemInCart = cart.find((i) => i.sku === sku);

      if (itemInCart) { // If item in cart, increase quantity
        return cart.map((i) => i.sku === sku
          ? { ...i, quantity: i.quantity + 1 }
          : i);
      } else { // Otherwise, concatenate item to cart items
        return [...cart, { id, sku, quantity: 1 }];
      }
    case "updateQuantity": {
      const { quantity, sku } = action;

      if (quantity === 0) { // Removes item from cart if quantity = 0 
        return cart.filter((item) => item.sku !== sku);
      }
      return cart.map((item) => item.sku === sku
        ? { ...item, quantity }
        : item);
    }
    default:
      throw new Error("Unhandled action " + action.type);
  }
}
