import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./component/Header";
import Footer from "./component/Footer";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import UserDashboard from "./pages/user/UserDashboard";
import CreateProduct from "./pages/admin/CreateProduct";
import PrivateRoutes from "./component/PrivateRoutes";
import ProductInfo from "./pages/ProductInfo";
import ChangePassword from "./pages/user/ChangePassword";
import CheckoutSuccess from "./pages/user/CheckoutSuccess";
import NotFound from "./pages/user/NotFound";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reset/password/:token" element={<ChangePassword />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/product/:id" element={<ProductInfo />} />
        <Route path="/admin/create/product" element={<CreateProduct />} />
        <Route path="/user/checkout-success" element={<CheckoutSuccess />} />
        <Route path="*" element={<NotFound />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/user/dashboard" element={<UserDashboard />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
