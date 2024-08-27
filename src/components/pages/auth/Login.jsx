import React from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../function/auth";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { login as loginRedux } from "../../../store/userSlice";

const Login = () => {
  const navi = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = document.getElementById("form-login");
    const data = new FormData(form);
    const account = {
      email: data.get("email"),
      password: data.get("password"),
    };
    login(account)
      .then((res) => {
        console.log("account", res.data);
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "Signed in successfully",
        });
        // alert("Login");
        console.log(res.data);
        dispatch(
          loginRedux({
            id: res.data.payload.user.id,
            name: res.data.payload.user.name,
            email: res.data.payload.user.email,
            role: res.data.payload.user.role,
            tel: res.data.payload.user.tel,
            address: res.data.payload.user.address,
            fname: res.data.payload.user.firstname,
            lname: res.data.payload.user.lastname,
            // images: res.data.payload.user.images,
            token: res.data.token,
          })
        );
        localStorage.setItem("token", res.data.token);
        roleRidirects(res.data.payload.user.role);
      })
      .catch((err) => {
        Swal.fire({
          title: "Error Login!",
          text: err.response.data.message,
          icon: "error",
          confirmButtonText: "Ok",
        });
        console.log(err);
      });
  };

  const roleRidirects = (role) => {
    console.log(`${role === "admin" || role === "shipment"}`);
    if (role === "admin" || role === "shipment") {
      navi("/admin/index");
    } else if (role === "user") {
      navi("/user/product");
    }
  };

  return (
    <div className="w-full h-screen flex flex-col lg:flex-row">
      {/* Left Section */}
      <div className="lg:w-1/2 h-60 lg:h-screen relative">
        <img
          src="https://i.pinimg.com/564x/09/ef/15/09ef159ffe003e07ea8dbf7d46599308.jpg"
          alt=""
          className="h-full object-cover w-full"
        />
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 bg-[#f5f5f5] flex flex-col p-6 lg:p-20 justify-between items-center">
        <div className="w-full flex flex-col max-w-[500px]">
          <div className="w-full flex items-center justify-between">
            <p className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2"></p>
            <p className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2">
              <a href="/">หน้าหลัก</a>
            </p>
          </div>

          <div className="w-full flex items-center flex-col mb-4 mt-10">
            <h3 className="text-3xl lg:text-5xl font-semibold mb-2 mt-5">
              เข้าสู่ระบบ
            </h3>
            <p className="text-base mb-2">
              ยินดีต้อนรับท่านสู่ร้านค้าอาหารแช่แข็งของเรา!
            </p>
          </div>

          <form className="mt-6 " id="form-login">
            <div className="mb-2 px-10">
              <h1>อีเมล</h1>
              <input
                type="email"
                name="email"
                placeholder="กรุณากรอกอีเมล"
                className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-red-600 focus:ring-red-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mb-2 px-10">
              <h1>รหัสผ่าน</h1>
              <input
                type="password"
                name="password"
                placeholder="กรุณากรอกรหัสผ่าน"
                className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-red-600 focus:ring-red-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mt-1  py-5 px-10">
              <div className="mb-10  w-full flex items-center justify-between">
                <p className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2">
                  <a href="/register">สมัครสมาชิก</a>
                </p>
                <Link to="/forgot-password">
                  <p className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2">
                    ลืมรหัสผ่าน?
                  </p>
                </Link>
              </div>
              <button
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-900 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-900"
                onClick={handleSubmit}
              >
                เข้าสู่ระบบ
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
