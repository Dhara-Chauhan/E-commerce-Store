import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import Card from "antd/es/card/Card";
import Meta from "antd/es/card/Meta";
import RatingStars from "../components/RatingStars";
import type { CartItem } from "../featues/cart/cartSlice";

type Props = {
  item: CartItem;
  AddToCart: (item: CartItem) => void;
  priceFormatter: (price: number) => string;
};

const ProductCard: React.FC<Props> = ({ item, AddToCart, priceFormatter }) => {
  return (
    <>
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
            onClickCapture={() => alert("Added to Cart")}
          >
            Add to Cart
          </Button>,
          <Link to={`/products/${item.id}`}>
            <Button shape="round">View Details</Button>
          </Link>,
        ]}
      >
        <Meta
          title={<span className="text-base font-semibold">{item.title}</span>}
          description={
            <div className="flex flex-col gap-1">
              <p className="text-lg font-bold text-green-600">
                {priceFormatter(item.price)}
              </p>
              <p className="text-sm text-gray-500">{item.category}</p>
              <RatingStars rating={item.rating} />
            </div>
          }
        />
      </Card>
    </>
  );
};

export default ProductCard;
