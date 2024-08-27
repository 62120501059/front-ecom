import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ModalForm from "../../../layouts/ModalForm";
import { Link } from "react-router-dom";

import {
  getOrderbyAdmin,
  updateOrderbyAdmin,
  getAmountOrderbyAdmin,
  incomeByAdmin,
} from "../../../function/users";
import { getProductByAdmin } from "../../../function/product";
import Swal from "sweetalert2";

const Verify = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [data, setData] = useState([]);
  const [dashboard, setDashboard] = useState([]);
  const [income, setIncome] = useState([]);

  const [dataLen, setDataLen] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const orderStatusValue = [
    { orderStatus: "6", name: "ส่งสินค้าไม่สำเร็จ" },
    { orderStatus: "4", name: "กำลังจัดส่ง" },
    { orderStatus: "5", name: "ส่งสินค้าสำเร็จ" },
    { orderStatus: "7", name: "คืนเงิน" },
  ];

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
  //เลื่อนหน้า
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const [currentData, setCurrentData] = useState([]);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const maxPageButtons = 5;

  useEffect(() => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setStart(startIndex);
    setEnd(endIndex);
    setCurrentData(data.slice(startIndex, endIndex));
  }, [data, currentPage]);

  const nextPage = () => {
    if (currentPage < Math.ceil(data.length / itemsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (page) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPageButtons = () => {
    const buttons = [];
    const startPage = Math.max(0, currentPage - Math.floor(maxPageButtons / 2));
    const endPage = Math.min(totalPages - 1, startPage + maxPageButtons - 1);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`${
            currentPage === i
              ? "flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              : "flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          } hover:bg-blue-700 hover:text-white font-bold py-2 px-4 rounded`}
        >
          หน้า {i + 1}
        </button>
      );
    }
    return buttons;
  };

  //เลื่อนหน้า
  useEffect(() => {
    loadData(user.user.token);
  }, [user]);

  const loadData = async (authtoken) => {
    await getAmountOrderbyAdmin(authtoken)
      .then((res) => {
        setDashboard(res.data);
      })
      .catch((err) => console.log(err));
    await incomeByAdmin(authtoken)
      .then((res) => {
        console.log(res.data);
        setIncome(res.data);
      })
      .catch((err) => console.log(err));
    await getOrderbyAdmin(authtoken)
      .then((res) => {
        // setData(res.data);
        setData(res.data.filter((order) => order.orderstatus === "6"));
        setDataLen(
          res.data.filter((order) => order.orderstatus === "6").length
        );
      })
      .catch((err) => console.log(err));
  };
  const handleChange = (e) => {
    // console.log(e.target);
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  const handleEdit = async (item) => {
    let authtoken = user.user.token;
    getProductByAdmin(authtoken, item._id, item.products)
      .then(async (res) => {
        // console.log("editData res.data", res.data);

        await setEditData({
          _id: item._id,
          name: `${item.address[0].fname} ${item.address[0].lname}`,
          phone: item.address[0].phone,
          addres: item.address[0].addres,
          district: item.address[0].district,
          province: item.address[0].province,
          code: item.address[0].code,
          image: item.images[0].images[0],
          products: res.data,
          orderstatus: item.orderstatus,
          TotalFee: item.TotalFee,
          cartTotal: item.cartTotal,
        });
        setIsModalOpen(true);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    // console.log("handleSubmitEdit", editData);
    let authtoken = user.user.token;
    let id = editData._id;

    updateOrderbyAdmin(authtoken, id, editData)
      .then((res) => {
        console.log("updateOrderbyAdmin", res);
        Toast.fire({
          icon: "success",
          title: res.data.message,
        });

        setIsModalOpen(false);
      })
      .then(() => {
        window.location.reload(); // รีเฟรชหน้า
      })
      .catch((err) => {
        Swal.fire({
          title: "Error Update!",
          text: err.response.data.message,
          icon: "error",
          confirmButtonText: "Ok",
        });
        console.log(err);
      });
  };

  const handleCloseModal = () => {
    // เมื่อปิด modal, ปิด modal ด้วยการตั้งค่า isModalOpen เป็น false
    setIsModalOpen(false);
  };
  return (
    <>
      <section className=" flex flex-col w-full bg-gray-50 dark:bg-gray-900 py-3 sm:py-5">
        <h1 className="text-3xl font-bold mb-2 mt-5 text-white px-5">
          จัดส่งสินค้าไม่สำเร็จ
        </h1>
        <div className="mt-5 mx-12 grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="block max-w-m p-6 bg-gray border border-gray-500 rounded-lg shadow bg-gray-500  ">
            <span className="mb-2 text-2xl font-bold tracking-tight text-white ">
              ค่ามัดจำ
              <span className="mb-2 mx-5 text-xl font-bold tracking-tight text-white ">
                {income.halfPrice} บาท
              </span>
            </span>
            <p className="font-normal text-white ">
              {" "}
              {`ชำระเงินสำเร็จ ${dashboard[2] || 0} ออเดอร์`}
            </p>
            <p className="font-normal text-white ">
              {" "}
              {`กำลังจัดส่ง ${dashboard[4] || 0} ออเดอร์`}
            </p>
            <p className="font-normal text-white ">
              {" "}
              {`ส่งสินค้าไม่สำเร็จ ${dashboard[6] || 0} ออเดอร์`}
            </p>
          </div>
          <div className="block max-w-m p-6 bg-gray border border-gray-500 rounded-lg shadow bg-gray-500  ">
            <span className="mb-2 text-2xl font-bold tracking-tight text-white ">
              ชำระเต็ม
              <span className="mb-2 mx-5 text-xl font-bold tracking-tight text-white ">
                {income.fullPrice} บาท
              </span>
            </span>
            <p className="font-normal text-white ">
              {" "}
              {`ส่งสินค้าสำเร็จ ${dashboard[5] || 0}  ออเดอร์`}
            </p>
          </div>
          <div className="block max-w-m p-6 bg-gray border border-gray-500 rounded-lg shadow bg-gray-500  ">
            <span className="mb-2 text-2xl font-bold tracking-tight text-white ">
              รายได้รวมทั้งหมด
              <span className="mb-2 mx-5 text-xl font-bold tracking-tight text-white ">
                {income.totalPrice} บาท
              </span>
            </span>
            <p className="font-normal text-white ">
              รายได้รวมทั้งหมดจาก ค่ามัดจำและชำระเต็ม
            </p>
          </div>
          <Link
            to="/admin/verify"
            className="block max-w-m p-6 bg-yellow border border-yellow-500 rounded-lg shadow bg-yellow-500 hover:bg-yellow-400 "
          >
            <div className="mb-2 text-2xl font-bold tracking-tight text-white ">
              ยังไม่ตรวจสอบ {dashboard[1] || 0}
            </div>
            <p className="font-normal text-white ">
              ลูกค้าทำการสั่งซื้อแต่ไม่ได้ตรวจสอบการชำระเงิน
            </p>
          </Link>

          <Link
            to="/admin/success-verify"
            className="block max-w-m p-6 bg-green border border-green-500 rounded-lg shadow bg-green-500 hover:bg-green-400 "
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white ">
              ชำระเงินสำเร็จ {dashboard[2] || 0}
            </h5>
            <p className="font-normal text-white ">
              ตรวจสอบการชำระเงินและทำการจัดเตรียมของ
            </p>
          </Link>
          <Link
            to="/admin/fail-verify"
            className="block max-w-m p-6 bg-red border border-red-500 rounded-lg shadow bg-red-500 hover:bg-red-400 "
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white ">
              ชำระเงินไม่สำเร็จ {dashboard[3] || 0}
            </h5>
            <p className="font-normal text-white ">
              การชำระเงินไม่สำเร็จ คำสั่งซื้อจะถูกยกเลิก
            </p>
          </Link>
          <Link
            to="/admin/delivery"
            className="block max-w-m p-6 bg-gray border border-gray-500 rounded-lg shadow bg-gray-500 hover:bg-gray-400 "
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white ">
              กำลังจัดส่ง {dashboard[4] || 0}
            </h5>
            <p className="font-normal text-white ">
              กำลังทำการจัดส่งสินค้าให้ลูกค้า
            </p>
          </Link>
          <Link
            to="/admin/success-delivery"
            className="block max-w-m p-6 bg-blue border border-blue-500 rounded-lg shadow bg-blue-500 hover:bg-blue-400 "
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white ">
              ส่งสินค้าสำเร็จ {dashboard[5] || 0}
            </h5>
            <p className="font-normal text-white ">
              ทำการส่งสินค้าสำเร็จ และลูกค้าทำการจ่ายอีกครึ่งนึง
            </p>
          </Link>
          <Link
            to="/admin/fail-delivery"
            className="block max-w-m p-6 bg-orange border border-orange-500 rounded-lg shadow bg-orange-500 hover:bg-orange-400 "
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white ">
              ส่งสินค้าไม่สำเร็จ {dashboard[6] || 0}
            </h5>
            <p className="font-normal text-white ">
              ทำการส่งสินค้าไม่สำเร็จ จะเก็บเงินมัดจำที่จ่ายไว้
            </p>
          </Link>
          <Link
            to="/admin/refund"
            className="block max-w-m p-6 bg-orange border border-orange-500 rounded-lg shadow bg-orange-500 hover:bg-orange-400 "
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white ">
              คืนเงิน {dashboard[7] || 0}
            </h5>
            <p className="font-normal text-white ">
              เมื่อทำการส่ง แล้วลูกค้าตรวจสอบสินค้าแล้วไม่ได้คุณภาพ
              ให้พูดคยกับพนักงานส่งของและทำการคืนเงิน
            </p>
          </Link>
        </div>
        <div className="w-full my-5 px-4 mx-auto max-w-screen-2x1 ">
          <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      ลำดับ
                    </th>
                    <th scope="col" className="px-4 py-3">
                      ชื่อผู้รับ
                    </th>
                    <th scope="col" className="px-4 py-3">
                      เบอร์โทรศัพท์
                    </th>
                    <th scope="col" className="px-4 py-3">
                      ที่อยู่
                    </th>
                    <th scope="col" className="px-4 py-3">
                      มัดจำครึ่งแรก (บาท)
                    </th>
                    <th scope="col" className="px-4 py-3">
                      ราคาทั้งหมด (บาท)
                    </th>
                    <th scope="col" className="px-4 py-3">
                      สถานะ
                    </th>
                    <th scope="col" className="px-4 py-3">
                      รายละเอียด
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((item, index) => (
                    <tr
                      key={item._id}
                      className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <td className="px-4 py-2">
                        <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                          {index + 1 + currentPage * itemsPerPage}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                          {`${item.address[0].fname} ${item.address[0].lname}`}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                          {`${item.address[0].phone}`}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                          {` ${item.address[0].province} ${item.address[0].district} ${item.address[0].addres}  ${item.address[0].code}`}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                          {item.TotalFee}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                          {item.cartTotal}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                          {item.orderstatus === "1"
                            ? "รอตรวจสอบ"
                            : item.orderstatus === "2"
                            ? "ตรวจสอบสำเร็จ"
                            : item.orderstatus === "3"
                            ? "ตรวจสอบล้มเหลว"
                            : item.orderstatus === "4"
                            ? "กำลังจัดส่ง"
                            : item.orderstatus === "5"
                            ? "จัดส่งสำเร็จ"
                            : item.orderstatus === "6"
                            ? "จัดส่งล้มเหลว"
                            : "ไม่มีข้อมูล"}
                        </span>
                      </td>
                      <td className="flex items-center justify-center py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <button
                          onClick={() => handleEdit(item)}
                          type="button"
                          className="px-3"
                        >
                          <p className=" text-gray-800 dark:text-white  dark:hover:text-yellow-500 ">
                            ดูรายละเอียด
                          </p>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <nav
              className="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0"
              aria-label="Table navigation"
            >
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                Showing
                <span className="font-semibold text-gray-900 dark:text-white px-2">
                  {`${start + 1} - ${end > dataLen ? dataLen : end}`}
                </span>
                of {dataLen}
                <span className="font-semibold text-gray-900 dark:text-white px-2"></span>
              </span>

              <ul className="inline-flex items-stretch -space-x-px">
                <li>
                  <button
                    onClick={previousPage}
                    className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <span className="sr-only">Previous</span>
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </li>
                {renderPageButtons()}

                <li>
                  <button
                    onClick={nextPage}
                    className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <span className="sr-only">Next</span>
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <ModalForm isOpen={isModalOpen} closeModal={handleCloseModal}>
          <div className=" px-6 py-6 lg:px-8">
            <div className="flex flex-col items-center justify-center">
              <h3 className=" text-xl font-medium text-gray-900 dark:text-white">
                View Data
              </h3>
            </div>
            <form className="mt-2">
              <div className="grid grid-rows-3 grid-flow-col gap-4">
                <div className="row-span-3 ">
                  <img
                    className="h-auto max-w-xs rounded-lg shadow-xl dark:shadow-gray-800"
                    src={editData.image}
                    alt="หลักฐานการชำระเงิน"
                  />
                </div>
                <div className="col-span-1 ">
                  <label
                    htmlFor="fname"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    ชื่อ
                  </label>
                  <input
                    type="text"
                    name="fname"
                    id="fname"
                    defaultValue={editData.name}
                    readOnly
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  />
                </div>
                <div className="col-span-2 ">
                  <label
                    htmlFor="addres"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    ที่อยู่
                  </label>
                  <input
                    type="text"
                    name="addres"
                    id="addres"
                    defaultValue={editData.addres}
                    readOnly
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  />
                </div>

                <div className=" col-span-1 ...">
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    เบอร์โทรศัพท์
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    defaultValue={editData.phone}
                    readOnly
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  />
                </div>
                <div className=" col-span-1 ...">
                  <label
                    htmlFor="province"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    จังหวัด
                  </label>
                  <input
                    type="text"
                    name="province"
                    id="province"
                    defaultValue={editData.province}
                    readOnly
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  />
                </div>
                <div className=" col-span-1 ...">
                  <label
                    htmlFor="TotalFee"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    ค่ามัดจำ
                  </label>
                  <input
                    type="text"
                    name="TotalFee"
                    id="TotalFee"
                    defaultValue={editData.TotalFee}
                    readOnly
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  />
                </div>
                <div className=" col-span-1 ...">
                  <label
                    htmlFor="district"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    เขต
                  </label>
                  <input
                    type="text"
                    name="district"
                    id="district"
                    defaultValue={editData.district}
                    readOnly
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  />
                </div>
                <div className=" col-span-1 ...">
                  <label
                    htmlFor="code"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    รหัสไปรษณีย์
                  </label>
                  <input
                    type="text"
                    name="code"
                    id="code"
                    defaultValue={editData.code}
                    readOnly
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  />
                </div>

                <div className=" col-span-1 ...">
                  <label
                    htmlFor="cartTotal"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    ยอดรวมทั้งหมด
                  </label>
                  <input
                    type="text"
                    name="cartTotal"
                    id="cartTotal"
                    defaultValue={editData.cartTotal}
                    readOnly
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  />
                </div>
                <div className="col-span1">
                  <label
                    htmlFor="orderstatus"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    สถานะ
                  </label>
                  <select
                    name="orderstatus"
                    id="orderstatus"
                    defaultValue={editData.orderstatus}
                    onChange={(e) => handleChange(e)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  >
                    {orderStatusValue.map((option) => (
                      <option
                        key={option.orderStatus}
                        value={option.orderStatus}
                      >
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="inline-flex rounded-md shadow-sm w-full mt-5 items-center text-center">
                <button
                  type="submit"
                  onClick={(e) => {
                    handleSubmitEdit(e);
                  }}
                  className="w-full px-4 py-2 text-sm text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg   dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    className="w-3 h-3 mr-2 inline-flex"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z" />
                    <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
                  </svg>
                  Submit
                </button>
              </div>
            </form>
            <div className="overflow-y-scroll max-h-96 mt-2">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="border-b sticky top-0  text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      ลำดับ
                    </th>
                    <th scope="col" className="px-6 py-3">
                      รูป
                    </th>
                    <th scope="col" className="px-6 py-3">
                      ชื่อ
                    </th>
                    <th scope="col" className="px-6 py-3">
                      จำนวน
                    </th>
                    <th scope="col" className="px-6 py-3">
                      ราคา/ชิ้น (บาท)
                    </th>
                    <th scope="col" className="px-6 py-3">
                      ราคารวม
                    </th>
                  </tr>
                </thead>
                <tbody className="  ">
                  {isModalOpen === true
                    ? editData.products.map((item, index) => (
                        <tr
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                          key={index}
                        >
                          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            {index + 1}
                          </td>
                          <td className="w-32 p-4">
                            {item.images && item.images.length > 0 && (
                              <img
                                src={item.images[0].secure_url}
                                alt={`Image ${index}`}
                              />
                            )}
                          </td>
                          {/* item.productData.count */}
                          {/* item.productData.price */}
                          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            {item.title}
                          </td>
                          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            {item.productData.count}
                          </td>
                          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            {item.productData.price}
                          </td>
                          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            {item.productData.price * item.productData.count}
                          </td>
                        </tr>
                      ))
                    : console.log(false)}
                </tbody>
              </table>
            </div>
          </div>
        </ModalForm>
      </section>
    </>
  );
};

export default Verify;
