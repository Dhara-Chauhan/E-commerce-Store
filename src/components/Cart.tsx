import React from "react";
import { Card, Layout, Button } from "antd";

const { Content } = Layout;

const cart: React.FC = () => {
  return (
    <>
      <Content>
        <h1>Your Cart</h1>
        <Card style={{ marginBottom: "20px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>Image</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>

            <tbody style={{ textAlign: "center" }}>
              <tr key="item1" className="cart-item hover:bg-gray-100 h-20">
                <td>
                  <img src="#" alt="item1" />
                </td>
                <td>Shirt</td>
                <td>2</td>
                <td>$20.00</td>
                <td>$40.00</td>
                <td>
                  <Button type="primary">Remove</Button>
                </td>
              </tr>
            </tbody>
          </table>
        </Card>
      </Content>
    </>
  );
};

export default cart;
