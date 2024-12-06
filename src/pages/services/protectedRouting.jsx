import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRouting = () => {
  const isAuthenticated = localStorage.getItem("hasloggedin") !== null;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
export default ProtectedRouting;
