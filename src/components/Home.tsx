import React from "react";
import { Link } from "react-router-dom";
import { Button, Layout } from "antd";
const { Content } = Layout;

const Home: React.FC = () => {
  return (
    <>
      <Content className="p-4">
        <h1 className="text-3xl font-bold">Welcome to E-Shop 🛍️</h1>
        <p>Find the best products at amazing prices.</p>
        <Button type="primary">
          <Link to="/shop">Go to Shop</Link>
        </Button>
      </Content>
    </>
  );
};

export default Home;
