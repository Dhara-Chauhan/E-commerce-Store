import { Layout } from "antd";
import React from "react";
import Navbar from "./Navbar";
const { Content } = Layout;

const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <Layout>
        <Navbar />
        <Content style={{ marginTop: 64, padding: "16px" }}>{children}</Content>
      </Layout>
    </>
  );
};

export default LayoutWrapper;
