import { Button, Spin } from "antd";
// import { Link } from "react-router-dom";
import Card from "antd/es/card/Card";
import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { type CartItem } from "../context/CartContext";

const Products: React.FC = () => {
  const { addToCart, usdToInr } = useCart();

  const [Products, setProducts] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchproducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);
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
          <Card key={item.id}>
            <h1 className="text-xl">{item.title}</h1>
            <img src={item.image} alt={item.title}></img>
            <p className="text-bold text-2xl text-green-700">
              {usdToInr(item.price)}
            </p>
            <p>{item.category}</p>
            <p>{item.description}</p>
            <Button
              type="primary"
              shape="round"
              onClick={() => addToCart(item)}
            >
              Add to Cart
            </Button>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Products;
