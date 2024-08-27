import React from "react";
import Navbar from "../components/layouts/Navbar";
import Sidebar from "../components/pages/user/Sidebar";
import Login from "../components/pages/auth/Login";
import { useSelector } from "react-redux/es/hooks/useSelector";

const UserRoute = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));

  if (user && user.user.token) {
    return (
      <>
        <Navbar />
        {children}
       
        <Sidebar/>
      </>
      
      );
    } else {
      return <Login />;
  }
};

export default UserRoute;
