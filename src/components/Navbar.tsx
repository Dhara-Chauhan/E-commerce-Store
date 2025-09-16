import React from "react";
import { Link } from "react-router-dom";
import { Layout, Dropdown } from "antd";
import type { MenuProps } from "antd";
import { DownOutlined } from "@ant-design/icons";
const { Header } = Layout;

const Navbar: React.FC = () => {
  const items: MenuProps["items"] = [
    { key: "all", label: "All Products" },
    { key: "women", label: "Women's Clothing" },
    { key: "men", label: "Men's Clothing" },
    { key: "jewelery", label: "Jewelery" },
    { key: "electronics", label: "Electronics" },
  ];

  return (
    <>
      <Header className="flex items-center justify-between">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold pt-2">
            <Link to="/">E-Store</Link>
          </h1>
        </div>
        <div className="flex items-center gap-1 md:w-auto md:gap-2">
          <div className="flex justify-center md:w-auto pr-2">
            <Dropdown menu={{ items }} trigger={["click"]}>
              <a
                onClick={(e) => e.preventDefault()}
                className="text-lg cursor-pointer flex items-center gap-1"
              >
                Categories <DownOutlined className="text-sm pt-1" />
              </a>
            </Dropdown>
          </div>
          <div className="flex justify-center text-lg sm:gap-2">
            <Link to="/shop" className="pr-1">
              Products
            </Link>
            <Link to="/cart" className="pl-1">
              Cart
            </Link>
          </div>
        </div>
      </Header>
    </>
  );
};

export default Navbar;
