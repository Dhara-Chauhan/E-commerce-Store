import React, { useState } from "react";
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

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const login = () => {
    setIsAuthenticated(true);
  };
  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <>
      <AppContext.Provider value={{ usdToInr, login, logout, isAuthenticated }}>
        {children}
      </AppContext.Provider>
    </>
  );
};

export default CartProvider;
