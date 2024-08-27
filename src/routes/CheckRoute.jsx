import React from "react";
import Home from "../components/pages/Home";
import { useSelector } from "react-redux/es/hooks/useSelector";

const CheckRoute = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));

  return user && user.user.token ? <Home /> : children;
};
export default CheckRoute;
