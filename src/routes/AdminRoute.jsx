import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";

import MenubarAdmin from "../components/layouts/MenubarAdmin";
import Notfound404 from "../components/pages/Notfound404";
import Loading from "../components/layouts/Loading";

import { currentAdmin } from "../components/function/auth";

const AdminRoute = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user && user.user.token) {
      currentAdmin(user.user.token)
        .then(() => {
          setIsAdmin(true);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  return isAdmin ? (
    <div className="flex flex-row h-full bg-gray-100">
      <MenubarAdmin />
      {children}
    </div>
  ) : (
    <Notfound404 text={"Admin Only !!!!!"} />
  );
};

export default AdminRoute;
