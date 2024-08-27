import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { verifyResetPass, resetPass } from "../../function/auth";
import Notfound404 from "../Notfound404";
import Swal from "sweetalert2";
export default function Forgot() {
  const [password, setPassword] = useState({ password: "" });
  const [checkPassword, setCheckPassword] = useState({ checkpassword: "" });
  const [validUrl, setvalidUrl] = useState(false);
  const navi = useNavigate();

  const param = useParams();
  const checkValid = () => {
    verifyResetPass(param)
      .then((res) => {
        console.log(res);
        setvalidUrl(true);
      })
      .catch((err) => {
        setvalidUrl(false);
        console.log(err);
      });
  };
  useEffect(() => {
    checkValid();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassword({
      ...password,
      [name]: value,
    });
    console.log(password);
  };

  const handleChangeCheckPass = (e) => {
    const { name, value } = e.target;
    setCheckPassword({
      ...checkPassword,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.password === checkPassword.checkpassword) {
      resetPass(param, password)
        .then((res) => {
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
            icon: "Suc",
            title: res.data.message,
          });
          navi("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Swal.fire({
        title: "Error Reset Password",
        text: "Password not match !!!",
        icon: "error",
        confirmButtonText: "ok",
      });
    }
  };

  return validUrl ? (
    <div className="relative w-full h-screen bg-zinc-900/90">
      <img
        className="absolute w-full h-full object-cover mix-blend-overlay"
        src="https://www.shoremariner.co.nz/wp-content/uploads/2022/02/frozen-food.png"
        alt="/"
      />

      <div className="flex justify-center items-center h-full">
        <form
          className="max-w-[400px] w-full mx-auto bg-white p-8"
          onSubmit={handleSubmit}
        >
          <h2 className="text-4xl font-bold text-center py-4">
            เปลี่ยนรหัสผ่าน
          </h2>

          <div className="flex flex-col mb-4 mt-2">
            <label className="text-black font-semibold">รหัสผ่านใหม่</label>
            <input
              className="border relative bg-gray-100 p-2"
              type="text"
              name="password"
              placeholder="กรุณากรอกรหัสผ่าน"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div className="flex flex-col ">
            <label className="text-black font-semibold">
              ยืนยันรหัสผ่านใหม่
            </label>
            <input
              className="border relative bg-gray-100 p-2"
              type="text"
              name="checkpassword"
              placeholder="กรุณากรอกรหัสผ่านอีกครั้ง"
              onChange={(e) => {
                handleChangeCheckPass(e);
              }}
            />
          </div>

          <div className="flex justify-between py-8">
            <Link to="/">
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded relative">
                ยกเลิก
              </button>
            </Link>

            <button
              onClick={(e) => {
                handleSubmit(e);
              }}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded relative"
            >
              ยืนยันการเปลี่ยนรหัสผ่าน
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <Notfound404 text={"คุณไม่มีสิทการเข้าถึงลิงค์นี้"} />
  );
}
