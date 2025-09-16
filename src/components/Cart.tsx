import React from "react";
import { Card, Layout, Button } from "antd";
import { type CartItem } from "../context/CartContext";
import { useCart } from "../context/CartContext";

const { Content } = Layout;

const Cart: React.FC = () => {
  const [cartItem, setCartItem] = React.useState<CartItem[]>([]);
  const { usdToInr } = useCart();

  return (
    <>
      <Content>
        <h1>Your Cart</h1>
        <Card style={{ marginBottom: "20px" }}>
          {cartItem.length > 0 ? (
            cartItem.map((item) => (
              <div key={item.id} className="mb-4 flex items-center gap-4">
                <h2>{item.title}</h2>
                <p>Price: {usdToInr(item.price)}</p>
                <Button
                  type="primary"
                  onClick={() => {
                    setCartItem(cartItem.filter((i) => i.id !== item.id));
                  }}
                >
                  Remove
                </Button>
              </div>
            ))
          ) : (
            <p className="text-center font-bold text-2xl">
              Your cart is empty..!!
            </p>
          )}
        </Card>
      </Content>
    </>
  );
};

export default Cart;
