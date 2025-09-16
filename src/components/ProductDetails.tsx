import React from "react";
import { useState, useEffect } from "react";
import { Button, Spin } from "antd";
import { useParams } from "react-router-dom";
import Card from "antd/es/card/Card";
import { useCart, type CartItem } from "../context/CartContext";
import { StarFilled, StarOutlined } from "@ant-design/icons";

const ProductDetails: React.FC = () => {
  const { addToCart, usdToInr } = useCart();

  const { id } = useParams();
  console.log("Product ID from URL:", id);

  const [product, setProduct] = useState<CartItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchproductDetails = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    if (id) {
      fetchproductDetails();
    }
  }, [id]);
  return (
    <>
      <h1 className="pl-4 pt-2 text-3xl">ProductDetails</h1>

      {loading ? (
        <Spin className="m-10" />
      ) : product ? (
        <div
          className="max-w-5xl mx-auto mt-8 p-4 
                h-auto sm:h-[400px] md:h-[500px] lg:h-[580px]"
        >
          <Card>
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left: Image */}
              <div className="flex-1 flex justify-center items-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-h-72 md:max-h-96 object-contain"
                />
              </div>

              {/* Right: Details */}
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold mb-4">
                  {product.title}
                </h1>
                <p className="text-2xl sm:text-3xl md:text-4xl text-green-600 font-semibold mb-3">
                  {usdToInr(product.price)}
                </p>
                <p className="text-gray-500 italic mb-2">{product.category}</p>
                <p className="text-gray-700 mb-6">
                  Rating:
                  <span className="font-semibold flex items-center">
                    {Array.from({ length: 5 }, (_, i) =>
                      i < Math.round(product.rating?.rate || 0) ? (
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
                  <span>{product.rating?.count}</span>
                </p>
                <p className="text-gray-700 mb-6"></p>
                <p className="text-gray-700 mb-6">{product.description}</p>

                <Button
                  type="primary"
                  size="large"
                  shape="round"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </Card>
        </div>
      ) : (
        <p className="text-center text-red-500">Product not found</p>
      )}
    </>
  );
};

export default ProductDetails;
