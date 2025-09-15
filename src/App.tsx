import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Products from "./components/Products";
import Cart from "./components/Cart";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "antd/es/layout/layout";

function App() {
  return (
    <>
      <Router>
        <Layout>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            {/* <Route path="/product/:id" element={<ProductDetail />} /> */}
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
