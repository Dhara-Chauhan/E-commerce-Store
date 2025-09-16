import { Button, Spin } from "antd";
import { Link } from "react-router-dom";
import Card from "antd/es/card/Card";
import Meta from "antd/es/card/Meta";
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
          <Card
            key={item.id}
            hoverable
            className="transition-shadow duration-300 hover:shadow-xl"
            cover={
              <img
                alt={item.title}
                src={item.image}
                className="h-48 object-contain p-4"
              />
            }
            actions={[
              <Button
                type="primary"
                shape="round"
                onClick={() => addToCart(item)}
              >
                Add to Cart
              </Button>,
              <Link to={`/products/${item.id}`}>
                <Button shape="round">View Details</Button>
              </Link>,
            ]}
          >
            <Meta
              title={
                <span className="text-base font-semibold">{item.title}</span>
              }
              description={
                <div className="flex flex-col gap-1">
                  <p className="text-lg font-bold text-green-600">
                    {usdToInr(item.price)}
                  </p>
                  <p className="text-sm text-gray-500">{item.category}</p>
                </div>
              }
            />
          </Card>
        ))}
      </div>
    </>
  );
};

export default Products;
