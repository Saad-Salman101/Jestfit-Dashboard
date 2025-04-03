import React from "react";
import { Navigate } from "react-router-dom";
import * as storeAccess from "store/storeUtility";

const isAuthenticated = () => {
  const data = storeAccess.getUserState();
  return data.isAuthenticated;
};

const ProtectedRoute = ({ element: Component, isBoth = false, ...rest }) => {
  const access = isAuthenticated();

  return access || isBoth ? <Component {...rest} /> : <Navigate to="/" />;
};

export default ProtectedRoute;
