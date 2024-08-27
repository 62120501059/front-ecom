import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { saveAddress, getUserCart, saveOrder, emptyCart } from "../../function/users";
import Resize from "react-image-file-resizer";
import axios from "axios";
import Swal from "sweetalert2";
import { Avatar, Badge } from "antd";
import { Link, useNavigate } from "react-router-dom";
import provincesData from '../../../province.json';
export default function Payment() {
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navi = useNavigate();
  const [payment, setPayment] = useState();
  const [total, setTotal] = useState(0);
  const [values, setValues] = useState();
  const [provinces, setProvinces] = useState([]); // เก็บข้อมูลจังหวัด
  useEffect(() => {
    getUserCart(user.user.token).then((res) => {
      console.log(res.data);
      setPayment(res.data.payment);
      setTotal(res.data.cartTotal);
    });
  }, []);
  console.log(user);
  const [formData, setFormData] = useState({
    fname: user.user.fname,
    lname: user.user.lname,
    addres: user.user.address[0]?.addres || null,
    district: user.user.address[0]?.district || null,
    province: user.user.address[0]?.province || null,
    code: user.user.address[0]?.code || null,
    
    phone: user.user.tel,
  });
  const [addressSaced, setAddressSaved] = useState(false);
  const [isEmpty, setIsEmpty] = useState({
    fname: false,
    lname: false,
    addres: false,
    district: false,
    province: false,
    code: false,
    
    phone: false,
  });

  const handleChangeFile = (e) => {
    const files = e.target.files;
    if (files) {
      const imagesArray = []; // สร้าง array เพื่อเก็บข้อมูลรูปภาพทั้งหมด

      for (let i = 0; i < files.length; i++) {
        Resize.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            imagesArray.push(uri); // เพิ่ม URI ของรูปภาพลงใน array

            // ถ้าเรียบร้อยทั้งหมดแล้วค่อยทำการ setValues
            if (imagesArray.length === files.length) {
              setValues({ ...values, images: imagesArray });
            }
          },
          "base64"
        );
      }
    }
  };

  useEffect(() => {
    // Set provinces data from imported JSON file
    setProvinces(provincesData);
  }, []);

  const handleChange = (e = {}) => {
    const { name, value } = e.target || {};
    if (name && value) {
      setFormData({
        ...formData,
        [name]: value,
      });
      setIsEmpty({
        ...isEmpty,
        [name]: value === "",
      });
    } else if (name === "province" && value) { // เพิ่มเงื่อนไขสำหรับ dropdown province
      setFormData({
        ...formData,
        province: value,
      });
      setIsEmpty({
        ...isEmpty,
        province: value === "",
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      address: formData,
      images: values,
      QRimg: payment,
    };
    console.log(data);
    saveOrder(user.user.token, data).then((res) => {
      console.log(res.data);
      emptyCart(user.user.token);

      dispatch({
        type: "ADD_TO_CART",
        payload: [],
      });
      if (typeof window !== "undefined") {
        localStorage.removeItem("cart");
      }

      if (res.data.ok) {
        Swal.fire({
          title: "บันทึกสำเร็จ",
          icon: "success",
        });
      }
      navi("/tidy");
    });
  };
  const [dateTime, setDateTime] = useState("");

  return (
    <div className="flex py-20 px-20">
      <div className="w-1/2 p-4 px-10 ">
        <form className="w-full max-w-lg  " onSubmit={handleSubmit}>
          <h2 className="font-bold text-3xl mb-10 font-abc">
            ป้อนชื่อเเละที่อยู่
          </h2>
          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full md:w-1/2 px-3">
              <label htmlFor="name" className="text-base font-medium">
                ชื่อ
              </label>
              <input
                className={`font-abc appearance-none block w-full bg-gray-200 text-gray-700 border ${isEmpty.fname ? "border-red-500" : "border-gray-200"
                  } rounded py-3 px-4 leading-tight focus:outline-none  focus-border-gray-500`}
                id="fname"
                type="text"
                name="fname"
                placeholder="ชื่อ"
                required
                value={formData.fname}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label htmlFor="name" className="text-base font-medium">
                นามสกุล
              </label>
              <input
                className={`font-abc appearance-none block w-full bg-gray-200 text-gray-700 border ${isEmpty.lname ? "border-red-500" : "border-gray-200"
                  } rounded py-3 px-4 leading-tight focus:outline-none focus-border-gray-500`}
                id="lname"
                type="text"
                name="lname"
                required
                placeholder="นามสกุล"
                value={formData.lname}
                onChange={handleChange}
              />
            </div>
          </div>
          <label htmlFor="phone" className=" text-base font-medium">
            ที่อยู่
          </label>
          <textarea
            id="addres"
            name="addres"
            rows="4"
            required
            className={`font-abc block p-2.5 w-full text-sm bg-gray-200 text-gray-700 border ${isEmpty.addres ? "border-red-500" : "border-gray-200"
              }
           border-gray-200 rounded leading-tight focus:outline-none  focus:border-gray-500 mb-5`}
            placeholder="ที่อยู๋"
            value={formData.addres}
            onChange={handleChange}
          ></textarea>
          <div className="flex flex-wrap -mx-3">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label htmlFor="phone" className=" text-base font-medium">
                เขต
              </label>
              <input
                className={`font-abc appearance-none block w-full bg-gray-200 text-gray-700 border ${isEmpty.district ? "border-red-500" : "border-gray-200"
                  }
              rounded py-3 px-4 mb-3 pb-8 leading-tight focus:outline-none  focus:border-gray-500`}
                id="district"
                type="text"
                name="district"
                required
                placeholder="อำเภอ/เขต"
                value={formData.district}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label htmlFor="phone" className=" text-base font-medium">
                จังหวัด
              </label>
              <input
                className={`font-abc appearance-none block w-full bg-gray-200 text-gray-700 border ${isEmpty.province ? "border-red-500" : "border-gray-200"
                  }
              rounded py-3 px-4 mb-3 pb-8 leading-tight focus:outline-none  focus:border-gray-500`}
                id="province"
                type="text"
                name="province"
                required
                placeholder="จังหวัด"
                value={formData.province}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label htmlFor="phone" className=" text-base font-medium">
                รหัสไปรษณี
              </label>
              <input
                className={`font-abc appearance-none block w-full bg-gray-200 text-gray-700 border ${isEmpty.code ? "border-red-500" : "border-gray-200"
                  }
              rounded py-3 px-4 mb-3 pb-8 leading-tight focus:outline-none  focus:border-gray-500`}
                id="code"
                name="code"
                type="text"
                required
                placeholder="รหัสไปรษณี"
                value={formData.code}
                onChange={handleChange}
              />
            </div>
        
          </div>
          <label htmlFor="phone" className=" text-base font-medium">
            เบอร์โทรศัพท์
          </label>
          <input
            className={`font-abc appearance-none block w-full bg-gray-200 text-gray-700 border ${isEmpty.phone ? "border-red-500" : "border-gray-200"
              }
            rounded py-3 px-4 mb-3 pb-4 leading-tight focus:outline-none  focus:border-gray-500`}
            type="text"
            id="phone"
            name="phone"
            required
            placeholder="กรอกเบอร์โทรศัทพ์"
            onKeyDown={(e) => {
              const isNumberKey = /^\d$/.test(e.key);
              const isBackspace = e.key === 'Backspace';

              if (!isNumberKey && !isBackspace) {
                e.preventDefault();
              }
            }}
            value={formData.phone}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="border border-transparent hover:border-gray-300 bg-gray-900 hover:bg-white text-white hover:text-gray-900 flex justify-center items-center py-4 rounded w-full mt-10"
          >
            ส่งข้อมูล
          </button>

          <Link to="/">
            <button
              className="  border border-transparent hover:border-gray-300 bg-gray-300
          hover:bg-white hover:text-gray-900 flex justify-center items-center
          py-4 rounded w-full  mt-2"
            >
              ยกเลิก
            </button>
          </Link>
        </form>
      </div>

      {/* ฝั่งซ้าย */}
      <div className="w-1/2 p-4 ">
        <section className="container  px-20  border-dashed border-2 py-2 ">
          <p className="mb-10 font-bold text-3xl justify-center text-center">
            ชำระเงิน
          </p>

          <div className=" h-50 w-50 flex justify-center ">
            <img src={payment} alt="" className="w-50 h-50" />
          </div>
          <hr className="border-gray-400 mt-2" />
          <br />
          <div class="flex justify-between ">
            <p className=" text-base font-medium">ยอดรวม</p>
            <p className="text-lg mb-4">{total}฿</p>
          </div>

          {/* ใส่รูป */}
          <div className="col-span-full">
            <label
              htmlFor="cover-photo"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              อัพโหลดภาพสลิป
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                {values && values.images && values.images.length > 0 ? (
                  values.images.map((c, index) => (
                    <img key={index} src={c} alt="" className="w-50 h-50" />
                  ))
                ) : (
                  <PhotoIcon
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                )}
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onClick={handleChangeFile}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
