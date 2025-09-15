import React from "react";
import { Link } from "react-router-dom";
import { Layout, Select } from "antd";
const { Header } = Layout;

const Navbar: React.FC = () => {
  return (
    <>
      <Header className="flex items-center justify-between">
        <div className="flex flex-col md:flex-r ow md:items-center md:justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold pt-2">
            <Link to="/">E-Store</Link>
          </h1>
        </div>
        <div className="flex items-center gap-1 md:w-auto md:gap-2">
          <Select
            defaultValue="All Products"
            className="w-full sm:w-1/6 md:w-48"
            style={{
              width: 150,
            }}
            onChange={(value) => console.log(value)}
          >
            <Select.Option value="products">All Products</Select.Option>
            <Select.Option value="women's clothing">
              Women's Clothing
            </Select.Option>
            <Select.Option value="men's clothing">Men's Clothing</Select.Option>
            <Select.Option value="jewelery">Jewelery</Select.Option>
            <Select.Option value="electronics">Electronics</Select.Option>
          </Select>
          <div className="flex justify-center gap-2 text-lg sm:gap-2">
            <Link to="/shop">Products</Link>
            <Link to="/cart">Cart</Link>
          </div>
        </div>
      </Header>
    </>
  );
};

export default Navbar;
