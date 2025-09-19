import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "antd/es/layout/layout";
import Login from "./components/Login";
import LayoutWrapper from "./components/LayoutWrapper";

function App() {
  return (
    <>
      <Router>
        <Layout>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <LayoutWrapper>
                  <Home />
                </LayoutWrapper>
              }
            />
            <Route
              path="/shop"
              element={
                <LayoutWrapper>
                  <Products />
                </LayoutWrapper>
              }
            />
            <Route
              path="/cart"
              element={
                <LayoutWrapper>
                  <Cart />
                </LayoutWrapper>
              }
            />
            <Route
              path="/products/:id"
              element={
                <LayoutWrapper>
                  <ProductDetails />
                </LayoutWrapper>
              }
            />
            <Route
              path="/login"
              element={
                <LayoutWrapper>
                  <Login />
                </LayoutWrapper>
              }
            />
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
