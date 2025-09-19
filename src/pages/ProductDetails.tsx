import React from "react";
import { useState, useEffect } from "react";
import { Button, Spin } from "antd";
import { useParams } from "react-router-dom";
import Card from "antd/es/card/Card";
// import { StarFilled, StarOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { type CartItem } from "../featues/cart/cartSlice";
import { addToCart } from "../featues/cart/cartSlice";
import RatingStars from "../components/RatingStars";
import QuantityBtn from "../components/QuantityBtn";
import StockStatus from "../components/StockStatus";

const ProductDetails: React.FC = () => {
  const dispatch = useDispatch();

  const AddToCart = (item: CartItem) => {
    dispatch(addToCart(item));
  };

  const usdToInr = (usd: number) => {
    const rate = 88.28; // approx conversion rate
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(usd * rate);
  };

  const { id } = useParams();
  console.log("Product ID from URL:", id);

  const [product, setProduct] = useState<CartItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

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
                      <span className="text-sm text-[#db3964] font-normal ml-2">
                        🔻{product.discountPercentage}% off
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-wrap md:flex-nowrap items-center gap-2">
                    <QuantityBtn value={quantity} onChange={setQuantity} />
                    <Button
                      type="primary"
                      size="large"
                      shape="default"
                      disabled={!product.stock}
                      onClick={() => AddToCart({ ...product, quantity })}
                      onClickCapture={() => alert("Added to Cart")}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
                <StockStatus
                  status={product.availabilityStatus}
                  stock={product.stock}
                />
                <div>
                  <p className="text-gray-500 italic mb-2">
                    {product.category}
                  </p>
                  <RatingStars rating={product.rating} />
                  {/* <span>{product.reviews?.[0].comment}</span>
                  <span>{product.reviews?.[1].comment}</span>
                  <span>{product.reviews?.[2].comment}</span> */}
                </div>
                <p className="text-gray-700 mb-6"></p>
                <p className="text-gray-700 mb-6 max-w-xl">
                  {product.description}
                </p>
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
