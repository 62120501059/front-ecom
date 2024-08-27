import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Page
import Home from "./components/pages/Home";
import Register from "./components/pages/auth/Register";
import Login from "./components/pages/auth/Login";
import Notfound404 from "./components/pages/Notfound404";
import EmailVerify from "./components/pages/auth/EmailVerify";
import Forgotpassword from "./components/pages/auth/Forgotpassword";
import Forgot from "./components/pages/auth/Forgot";
import Success from "./components/pages/Success";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";

//Page User
import Product from "./components/pages/user/Product";
import ProductDetails from "./components/pages/user/ProductDetails";
import QrCode from "./components/pages/QrCode";

import Settings from "./components/pages/user/Settings";
import History from "./components/pages/user/History";

//Page Admin
import HomeAdmin from "./components/pages/admin/HomeAdmin";
import CreateCategory from "./components/pages/admin/category/CreateCategory";
import ManageUser from "./components/pages/admin/manageUser/ManageUser";
import MainForm from "./components/pages/admin/product/CreateProduct";
import Listproducts from "./components/pages/admin/product/Listproducts";
import Delivery from "./components/pages/admin/status/Delivery";
import SuccessDelivery from "./components/pages/admin/status/SuccessDelivery";
import FailDelivery from "./components/pages/admin/status/FailDelivery";
import Verify from "./components/pages/admin/status/Verify";
import SuccessVerify from "./components/pages/admin/status/SuccessVerify";
import FailVerify from "./components/pages/admin/status/FailVerify";
import Refund from "./components/pages/admin/status/Refund";

//Check Route
import AdminRoute from "./routes/AdminRoute";
import UserRoute from "./routes/UserRoute";
import CheckRoute from "./routes/CheckRoute";
//function
import { currentUser } from "./components/function/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login as loginRedux } from "./store/userSlice";
import Checkout2 from "./components/pages/user/Checkout2";
import Payment from "./components/pages/user/Payment";
import Tidy from "./components/pages/user/Tidy";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const idToken = localStorage.getItem("token");

    if (idToken) {
      currentUser(idToken)
        .then((res) => {
          // console.log("APP.js", res.data);
          dispatch(
            loginRedux({
              id: res.data._id,
              name: `${res.data.firstname} ${res.data.lastname}`,
              email: res.data.email,
              role: res.data.role,
              address: res.data.address,
              // images: res.data.images,
              id: res.data._id,
              fname: res.data.firstname,
              lname: res.data.lastname,
              tel: res.data.tel,
              token: idToken,
            })
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Notfound404 text="Not Found" />} />
        <Route path="/" element={<Home />} />
        <Route path="/tidy" element={<Tidy />} />
        <Route path="/qrcode" element={<QrCode />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route
          path="/users/password-reset/:id/verify/:token"
          element={<Forgot />}
        />
        <Route path="/success" element={<Success />} />
        {/* Auth */}
        <Route
          path="/register"
          element={
            <CheckRoute>
              <Register />
            </CheckRoute>
          }
        />
        <Route
          path="/login"
          element={
            <CheckRoute>
              <Login />
            </CheckRoute>
          }
        />

        {/* User */}
        <Route
          path="/user/product"
          element={
            <UserRoute>
              <Product />
            </UserRoute>
          }
        />

        <Route
          path="/user/checkout"
          element={
            <UserRoute>
              <Checkout2 />
            </UserRoute>
          }
        />

        <Route
          path="/user/payment"
          element={
            <UserRoute>
              <Payment />
            </UserRoute>
          }
        />
        <Route
          path="/user/productDetails"
          element={
            <UserRoute>
              <ProductDetails />
            </UserRoute>
          }
        />

        <Route
          path="/user/settings"
          element={
            <UserRoute>
              <Settings />
            </UserRoute>
          }
        />

        <Route
          path="/user/history"
          element={
            <UserRoute>
              <History />
            </UserRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/admin/index"
          element={
            <AdminRoute>
              <HomeAdmin />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/create-category"
          element={
            <AdminRoute>
              <CreateCategory />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/manage-admin"
          element={
            <AdminRoute>
              <ManageUser />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/create-product"
          element={
            <AdminRoute>
              <MainForm />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/list-product"
          element={
            <AdminRoute>
              <Listproducts />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/delivery"
          element={
            <AdminRoute>
              <Delivery />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/success-delivery"
          element={
            <AdminRoute>
              <SuccessDelivery />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/fail-delivery"
          element={
            <AdminRoute>
              <FailDelivery />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/verify"
          element={
            <AdminRoute>
              <Verify />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/success-verify"
          element={
            <AdminRoute>
              <SuccessVerify />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/fail-verify"
          element={
            <AdminRoute>
              <FailVerify />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/refund"
          element={
            <AdminRoute>
              <Refund />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
