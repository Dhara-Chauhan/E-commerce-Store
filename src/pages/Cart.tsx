import React from "react";
import { Card, Layout, Button } from "antd";
import type { CartItem } from "../featues/cart/cartSlice";
import { removeFromCart, updateQuantity } from "../featues/cart/cartSlice";
import { useApp } from "../context/AppContext";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../app/store";
import QuantityBtn from "../components/QuantityBtn";

const { Content } = Layout;

const Cart: React.FC = () => {
  const { usdToInr } = useApp();
  const dispatch = useDispatch();

  const RemoveFromCart = (item: CartItem) => {
    dispatch(removeFromCart(item));
  };

  const UpdateQuantity = (item: CartItem, quantity: number) => {
    dispatch(updateQuantity({ id: item.id, quantity }));
  };
  const cartItem = useSelector((state: RootState) => state.cart.cart);
  // console.log(cartItem);

  return (
    <>
      <Content>
        <h1 className="text-2xl font-bold">Your Cart</h1>
        <Card style={{ marginBottom: "20px" }}>
          {cartItem.length > 0 ? (
            cartItem.map((item) => (
              <div key={item.id} className="mb-4 flex items-center gap-4">
                <img
                  alt={item.title}
                  src={item.thumbnail}
                  className="h-20 object-contain p-4 hover:scale-125 transition-transform duration-300"
                />
                <h2>{item.title}</h2>
                <h2>Price: {usdToInr(item.price)}</h2>
                <h2>Total: {usdToInr(item.price * item.quantity)}</h2>
                {/* <div className="flex items-center border rounded">
                  <button
                    className="px-3 py-1 text-lg font-bold"
                    onClick={() => UpdateQuantity(item, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="px-3 py-1 text-lg font-bold"
                    onClick={() => UpdateQuantity(item, item.quantity + 1)}
                  >
                    +
                  </button>
                </div> */}
                <QuantityBtn
                  value={item.quantity}
                  onChange={(newQty) => UpdateQuantity(item, newQty)}
                />
                <Button
                  type="primary"
                  onClick={() => {
                    RemoveFromCart(item);
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
