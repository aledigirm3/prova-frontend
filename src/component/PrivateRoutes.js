import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const PrivateRoute = () => {
  const auth = document.cookie.match("accessToken");
  if (!auth) {
    toast.error("Devi prima autenticarti");
  }
  return auth ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
