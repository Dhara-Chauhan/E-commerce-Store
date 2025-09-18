import { Button, Spin } from "antd";
import { Link } from "react-router-dom";
import Card from "antd/es/card/Card";
import Meta from "antd/es/card/Meta";
import React, { useState, useEffect } from "react";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import { useApp } from "../context/AppContext";
import { type CartItem } from "../featues/cart/cartSlice";
import { useDispatch } from "react-redux";
import { addToCart } from "../featues/cart/cartSlice";

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
          <Card
            key={item.id}
            hoverable
            className="transition-shadow duration-300 hover:shadow-xl"
            cover={
              <img
                alt={item.title}
                src={item.thumbnail}
                className="h-48 object-contain p-4 hover:scale-125 transition-transform duration-300"
              />
            }
            actions={[
              <Button
                type="primary"
                shape="round"
                onClick={() => AddToCart(item)}
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
                  <p className="text-gray-700 mb-6">
                    <span className="font-semibold">
                      {Array.from({ length: 5 }, (_, i) =>
                        i < Math.round(item.rating || 0) ? (
                          <StarFilled
                            style={{ color: "#DE7921" }}
                            key={i}
                            className="text-yellow-500 text-lg"
                          />
                        ) : (
                          <StarOutlined
                            key={i}
                            className="text-gray-400 text-lg"
                          />
                        )
                      )}
                    </span>
                  </p>
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
