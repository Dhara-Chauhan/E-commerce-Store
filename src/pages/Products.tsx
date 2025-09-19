import { Spin } from "antd";
import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { type CartItem } from "../featues/cart/cartSlice";
import { useDispatch } from "react-redux";
import { addToCart } from "../featues/cart/cartSlice";
import ProductCard from "../components/ProductCard";

const Products: React.FC = () => {
  const { usdToInr } = useApp();

  const dispatch = useDispatch();

  const AddToCart = (item: CartItem) => {
    dispatch(addToCart(item));
  };

  const [Products, setProducts] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchproducts = async () => {
      try {
        const res = await fetch("https://dummyJSON.com/products?limit=195");
        const data = await res.json();
        setProducts(data.products);
        setLoading(false);
      } catch {
        console.error("Error fetching products:", Error);
      }
    };
    fetchproducts();
  }, []);

  return (
    <>
      <h1 className="pl-4 pt-2 text-3xl">Products</h1>
      {loading && <Spin style={{ margin: 24 }} />}
      <div className="grid gap-4 p-2 pt-0 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Products.map((item) => (
          <ProductCard
            item={item}
            AddToCart={AddToCart}
            priceFormatter={usdToInr}
          />
        ))}
      </div>
    </>
  );
};

export default Products;
