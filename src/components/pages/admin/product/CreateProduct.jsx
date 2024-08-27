import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

import { createProduct } from "../../../function/product";
import { listCategory } from "../../../function/category";
import AddSlide from "./Addslide";
const MainForm = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);
  const initalstate = {
    title: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    quantity: "1",
    images: [],
  };

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
  const [values, setValues] = useState(initalstate);

  useEffect(() => {
    loadData();
  }, [user]);

  const loadData = async () => {
    await listCategory()
      .then((res) => {
        setValues({ ...values, categories: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log("handleChange", values);
  };

  const handleSubmit = async (e) => {
    // console.log("handleSubmit", values);
    e.preventDefault();

    if (values.price <= 0) {
      Toast.fire({
        icon: "error",
        title: "ราคาต้องมีค่ามากกว่าศูนย์",
      });
      return; // หยุดการทำงานของฟังก์ชันถ้ามีค่าราคาหรือจำนวนติดลบหรือเท่ากับศูนย์
    }

    if (values.quantity < 0) {
      Toast.fire({
        icon: "error",
        title: "จำนวนต้องมีค่ามากกว่าศูนย์",
      });
      return; // หยุดการทำงานของฟังก์ชันถ้ามีค่าราคาหรือจำนวนติดลบหรือเท่ากับศูนย์
    }

    await createProduct(values)
      .then((res) => {
        Toast.fire({
          icon: "success",
          title: "เพิ่มข้อมูลสำเร็จ",
        });
      })
      .then(() => {
        window.location.reload(); // รีเฟรชหน้า
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <section className=" flex flex-col w-full bg-gray-50 dark:bg-gray-900 py-3 sm:py-5">
      <h1 className="text-3xl font-bold mb-2 mt-5 text-white px-5">
        เพิ่มข้อมูลสินค้า
      </h1>
      <form
        className="m-10 p-10 rounded  w-fullbg-white border-b dark:bg-gray-800 dark:border-gray-700  "
        onSubmit={handleSubmit}
      >
        <div className="mb-2 px-10">
          <h1 className="text-white">Product</h1>
          <input
            type="text"
            placeholder="ชื่อสินค้า"
            id="name"
            name="title"
            className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-red-600 focus:ring-red-400 focus:outline-none focus:ring focus:ring-opacity-40"
            required
            value={values.title}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="mb-2 px-10">
          <h1 className="text-white">รายละเอียด</h1>
          <input
            type="text"
            placeholder="รายละเอียดสินค้า"
            name="description"
            value={values.description}
            onChange={(e) => handleChange(e)}
            className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-red-600 focus:ring-red-400 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>

        <div className="mb-2 px-10">
          <h1 className="text-white">ประเภท</h1>
          <select
            name="category"
            id="category"
            value={values.category}
            onChange={(e) => handleChange(e)}
            className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-red-600 focus:ring-red-400 focus:outline-none focus:ring focus:ring-opacity-40"
          >
            <option>โปรดเลือกหมวกหมู่สินค้า</option>
            {values.categories.length > 0 &&
              values.categories.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
          </select>
        </div>

        <div className="mb-2 px-10">
          <h1 className="text-white">ราคา</h1>
          <input
            type="number"
            placeholder="ระบุราคา"
            required
            name="price"
            value={values.price}
            onChange={(e) => handleChange(e)}
            className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-red-600 focus:ring-red-400 focus:outline-none focus:ring focus:ring-opacity-40"
          />
          {values.price < 0 && (
            <label className="text-red-600 block mt-2 px-4">
              กรุณาระบุราคาที่มากกว่าหรือเท่ากับ 0
            </label>
          )}
        </div>

        <div className="mb-2 px-10">
          <h1 className="text-white">จำนวน</h1>
          <input
            type="number"
            placeholder="ระบุจำนวน"
            required
            name="quantity"
            value={values.quantity}
            onChange={(e) => handleChange(e)}
            className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-red-600 focus:ring-red-400 focus:outline-none focus:ring focus:ring-opacity-40"
          />
          {values.quantity < 0 && (
            <label className="text-red-600 block mt-2 px-4">
              กรุณาระบุจำนวนที่มากกว่า 0
            </label>
          )}
        </div>
        <AddSlide
          loading={loading}
          setLoading={setLoading}
          values={values}
          setValues={setValues}
        />
        <div className="mt-6 py-5 px-10">
          <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-900 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-900">
            เสร็จสิ้น
          </button>
        </div>
      </form>
    </section>
  );
};

export default MainForm;
