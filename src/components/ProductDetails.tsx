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

  const [quantity, setQuantity] = useState(1);

  const [product, setProduct] = useState<CartItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchproductDetails = async () => {
      try {
        const res = await fetch(`https://dummyJSON.com/products/${id}`);
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
          className="max-w-5xl mx-auto p-4 
                h-full sm:h-[400px] md:h-[480px] lg:h-[580px]"
        >
          <Card hoverable className="h-full p-4">
            <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row gap-8">
              <div className="flex flex-col gap-12 justify-center items-center">
                <img
                  src={product.images ? product.images[0] : product.thumbnail}
                  alt={product.title}
                  className="max-h-64 sm:max-h-80 md:max-h-[420px] lg:max-h-96 object-contain hover:scale-125 transition-transform duration-300"
                />
              </div>

              <div className="flex-1">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
                  {product.title}
                </h1>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-2xl sm:text-3xl md:text-4xl text-green-600 font-semibold hover:scale-103 transition-transform duration-500">
                      {usdToInr(product.price)}
                      <span className="text-sm text-[#db3964] font-normal ml-3">
                        🔻{product.discountPercentage}% off
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-wrap md:flex-nowrap items-center gap-2">
                    <div className="flex items-center border rounded">
                      <button
                        className="px-3 py-1 text-lg font-bold"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      >
                        -
                      </button>
                      <span className="px-4">{quantity}</span>
                      <button
                        className="px-3 py-1 text-lg font-bold"
                        onClick={() => setQuantity((q) => q + 1)}
                      >
                        +
                      </button>
                    </div>
                    <Button
                      type="primary"
                      size="large"
                      shape="default"
                      disabled={!product.stock}
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <p
                    className={` ${
                      product.availabilityStatus === "In Stock"
                        ? "bg-green-600"
                        : "bg-yellow-600"
                    } text-white rounded w-fit p-0.5 mb-3`}
                  >
                    {product.availabilityStatus}
                  </p>
                  <p>
                    {product.availabilityStatus == "Low Stock"
                      ? `Hurry! Only ${product.stock} left in stock.`
                      : product.availabilityStatus == "Out of Stock"
                      ? "Currently unavailable."
                      : ""}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 italic mb-2">
                    {product.category}
                  </p>
                  <p className="text-gray-700 mb-6">
                    Rating:
                    <span className="font-semibold flex items-center">
                      {Array.from({ length: 5 }, (_, i) =>
                        i < Math.round(product.rating || 0) ? (
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
                      <span className="ml-1 font-normal text-xs items-center">
                        {product.rating}
                      </span>
                    </span>
                    {/* <span>{product.reviews?.[0].comment}</span>
                  <span>{product.reviews?.[1].comment}</span>
                  <span>{product.reviews?.[2].comment}</span> */}
                  </p>
                </div>
                <p className="text-gray-700 mb-6"></p>
                <p className="text-gray-700 mb-6">{product.description}</p>
                <p>
                  <span className="font-semibold">More Details: </span>
                  <ul className="list-disc list-inside">
                    <li>Brand: {product.brand || "N/A"}</li>
                    <li>Shipping Information: {product.shippingInformation}</li>
                    <li>Warranty Information: {product.warrantyInformation}</li>
                    <li>Return Policy: {product.returnPolicy}</li>
                  </ul>
                </p>
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
