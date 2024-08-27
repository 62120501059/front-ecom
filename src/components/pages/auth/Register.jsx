import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { register } from "../../function/auth";

const Register = () => {
  const navi = useNavigate();
  const [passwordError, setPasswordError] = useState(""); // State to track password error

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = document.getElementById("form-register");
    const data = new FormData(form);
    const account = {
      firstname: data.get("firstname"),
      lastname: data.get("lastname"),
      email: data.get("email"),
      password: data.get("password"),
      tel: data.get("tel"),
    };

    // Password length validation
    if (account.password.length < 8) {
      setPasswordError("รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร.");
      return;
    }

    register(account)
      .then((res) => {
        Swal.fire({
          title: "Success Register!",
          text: res.data.message,
          icon: "success",
          confirmButtonText: "ตกลง",
        });
        navi("/login");
      })
      .catch((err) => {
        Swal.fire({
          title: "Error Register!",
          text: err.response.data.message,
          icon: "error",
          confirmButtonText: "ตกลง",
        });
        console.log(err);
      });
  };

  return (
    <div className="p-10">
      <div className=" relative flex flex-col justify-center min-h-screen overflow-hidden px-10">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-lg lg:max-w-xl  border px-10">
          <h1 className="text-4xl font-semibold text-center text-Gray-900  ">
            สมัครสมาชิก
          </h1>

          <form className="mt-6" id="form-register">
            <div className="mb-2 px-10">
              <h1>ชื่อ</h1>
              <input
                type="text"
                placeholder="กรุณากรอกชื่อ"
                name="firstname"
                onKeyDown={(e) => {
                  const isNumberKey = /[0-9]/.test(e.key);
                  const isSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(e.key);
                  const isSpaceBar = e.key === " ";

                  if (isNumberKey || isSpecialCharacter || isSpaceBar) {
                    e.preventDefault();
                  }
                }}
                className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-red-600 focus:ring-red-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mb-2 px-10">
              <h1>นามสกุล</h1>
              <input
                type="text"
                placeholder="กรุณากรอกนามสกุล"
                name="lastname"
                onKeyDown={(e) => {
                  const isNumberKey = /[0-9]/.test(e.key);
                  const isSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(e.key);
                  const isSpaceBar = e.key === " ";

                  if (isNumberKey || isSpecialCharacter || isSpaceBar) {
                    e.preventDefault();
                  }
                }}
                className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-red-600 focus:ring-red-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mb-2 px-10">
              <h1>เบอร์โทรศัพท์</h1>
              <input
                type="text"
                placeholder="กรุณากรอกเบอร์โทรศัพท์"
                name="tel"
                onKeyDown={(e) => {
                  const isNumberKey = /^\d$/.test(e.key);
                  const isBackspace = e.key === "Backspace";

                  if (!isNumberKey && !isBackspace) {
                    e.preventDefault();
                  }
                }}
                className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-red-600 focus:ring-red-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

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
                className={`block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-red-600 focus:ring-red-400 focus:outline-none focus:ring focus:ring-opacity-40 ${passwordError && "border-red-600"
                  }`}
              />
              {passwordError && (
                <p className="text-red-600 text-sm mt-2">{passwordError}</p>
              )}
            </div>

            <div className="mt-6 py-5 px-10">
              <button
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-900 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-900"
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                สมัครสมาชิก
              </button>
            </div>
          </form>

          <div className="w-full flex items-center justify-between">
            <p className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2">
              <a href="/login">เข้าสู่ระบบ</a>
            </p>
            <p className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2">
              <a href="/forgot-password">ลืมรหัสผ่าน</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
