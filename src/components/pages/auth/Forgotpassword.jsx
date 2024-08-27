import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../function/auth";
import Swal from "sweetalert2";

export default function Forgotpassword() {
  const [email, setEmail] = useState({ email: "" });
  const navi = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmail({
      [name]: value,
    });
    console.log(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    forgotPassword(email)
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
          icon: "success",
          title: res.data.message,
        });
        navi("/login");
      })
      .catch((err) => {
        Swal.fire({
          title: "Error Reset Password",
          text: err.response.data.message,
          icon: "error",
          confirmButtonText: "Ok",
        });
        console.log(err);
      });
  };

  return (
    <div className="relative w-full h-screen bg-zinc-900/90">
      <img
        className="absolute w-full h-full object-cover mix-blend-overlay"
        src="https://i.pinimg.com/564x/e5/f7/04/e5f704f12c8314989cfc8cd8624846de.jpg"
        alt="/"
      />

      <div className="flex justify-center items-center h-full">
        <form className="max-w-[500px] w-full mx-auto bg-white p-8">
          <h2 className="text-4xl font-bold text-center py-4">
            Forgot your Password
          </h2>

          <div className="flex flex-col ">
            <label>กรอกอีเมล</label>
            <input
              className="border relative bg-gray-100 p-2"
              type="email"
              name="email"
              placeholder="กรุณากรอกอีเมล"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full py-3 mt-8 bg-indigo-600 hover:bg-indigo-500 relative text-white"
          >
            Send Email
          </button>

          <Link to="/login">
            <p className="text-center mt-8 text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2 relative text-blue-700">
              กลับไปหน้าล็อคอิน
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
}
