import React from "react";
import { AppContext } from "./AppContext";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const usdToInr = (usd: number) => {
    const rate = 88.28; // approx conversion rate
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(usd * rate);
  };

  return (
    <>
      <AppContext.Provider value={{ usdToInr }}>{children}</AppContext.Provider>
    </>
  );
};

export default CartProvider;
