import { createContext, useContext } from "react";

// api datatype for value
export interface CartItem {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  rating: number;
  quantity: number;
  images?: string[];
  thumbnail: string;
  discountPercentage?: number;
  stock?: number;
  brand?: string;
  tags?: string[];
  reviews?: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
  }[];
  shippingInformation?: string;
  availabilityStatus?: string;
  returnPolicy?: string;
  warrantyInformation?: string;
}

// functions/things of cart which are use in it
export interface CartItemType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  // removeFromCart: (id: number) => void;
  // clearCart: () => void;
  usdToInr: (usd: number) => string;
}

export const CartContext = createContext<CartItemType | undefined>(undefined);

// custom hook for useContext

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw Error("useCart must be in CartProvider");
  return context;
};
