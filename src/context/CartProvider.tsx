import React from "react";
import { useState } from "react";
import { CartContext, type CartItem } from "../context/CartContext";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        // If item exists, update quantity
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      // If item doesn't exist, add it to the cart
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const usdToInr = (usd: number) => {
    const rate = 83; // approx conversion rate
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(usd * rate);
  };

  return (
    <>
      <CartContext.Provider value={{ cart, addToCart, usdToInr }}>
        {children}
      </CartContext.Provider>
    </>
  );
};

export default CartProvider;
