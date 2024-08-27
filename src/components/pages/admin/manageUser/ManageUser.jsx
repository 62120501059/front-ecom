import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ModalForm from "../../../layouts/ModalForm";

import { listUser, updateUser, removeUser } from "../../../function/users";
import Swal from "sweetalert2";

const ManageAdmin = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [data, setData] = useState([]);
  const [dataLen, setDataLen] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const roleData = ["user", "admin", "shipment"];
  const enabledData = [true, false];
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
    await listUser(authtoken)
      .then((res) => {
        setData(res.data);
        setDataLen(res.data.length);
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = async (item) => {
    setIsModalOpen(true);
    await setEditData(item);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditData({
      ...editData,
      [name]: value,
    });
    console.log("Firstname:", value);
  };

  const handleInput = (e) => {
    const { value } = e.target;

    // ตรวจสอบว่าข้อมูลที่ป้อนเข้ามาไม่ใช่ตัวเลข
    if (/[0-9]/.test(value)) {
      // ถ้ามีตัวเลขในข้อมูล กำหนดค่ากลับเป็นค่าเดิม
      e.target.value = e.target.defaultValue;
    }
  };

  const handleInputTel = (e) => {
    const { value } = e.target;

    // ตรวจสอบว่าข้อมูลที่ป้อนเข้ามาไม่ใช่ตัวเลข
    if (/[^\d]/.test(value)) {
      // ถ้ามีตัวเลขในข้อมูล กำหนดค่ากลับเป็นค่าเดิม
      e.target.value = e.target.defaultValue;
    }
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();

    let authtoken = user.user.token;
    let id = editData._id;

    updateUser(authtoken, id, editData)
      .then((res) => {
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

  const handleDelete = (id) => {
    let authtoken = user.user.token;
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeUser(authtoken, id)
          .then((res) => {
            Toast.fire({
              icon: "success",
              title: res.data.message,
            });
          })
          .then(() => {
            window.location.reload(); // รีเฟรชหน้า
          })
          .catch((err) => {
            Swal.fire({
              title: "Error Delete!",
              text: err.response.data.message,
              icon: "error",
              confirmButtonText: "Ok",
            });
            console.log(err);
          });
      }
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
          จัดการข้อมูล User
        </h1>
        <div className="w-full my-5 px-4 mx-auto max-w-screen-2x1 ">
          <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
            {/* ปุ่มเพิ่มข้อมูล */}
            {/* <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
              <div className="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  + Add User
                </button>
              </div>
            </div> */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      ลำดับ
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Profile
                    </th>

                    <th scope="col" className="px-4 py-3">
                      เบอร์โทรศัพท์
                    </th>
                    <th scope="col" className="px-4 py-3">
                      บทบาท
                    </th>
                    <th scope="col" className="px-4 py-3">
                      ยืนยันตัวตน
                    </th>
                    <th scope="col" className="px-4 py-3">
                      การอนุญาต (Ban)
                    </th>
                    <th scope="col" className="px-4 py-3">
                      อัพเดทล่าสุด
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Actiions
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
                      <td className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                        <img
                          className="w-10 h-10 rounded-full"
                          src="data:image/png;base64,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"
                          alt="User profile"
                        />
                        <div className="pl-3">
                          <div className="text-base font-semibold">
                            {item.firstname} {item.lastname}
                          </div>
                          <div className="font-normal text-gray-500">
                            {item.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="flex items-center">
                          {item.tel.replace(
                            /(\d{3})(\d{3})(\d{4})/,
                            "$1-$2-$3"
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {item.role.toUpperCase()}
                      </td>
                      <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="flex items-center">
                          {item.verified === true ? (
                            <>
                              <div className="inline-block w-4 h-4 mr-2 bg-green-700 rounded-full"></div>
                              <h1>ตรวจสอบ</h1>
                            </>
                          ) : (
                            <>
                              <div className="inline-block w-4 h-4 mr-2 bg-red-700 rounded-full"></div>
                              <h1>ยังไม่ตรวจสอบ</h1>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="flex items-center">
                          {item.enabled === true ? (
                            <>
                              <div className="inline-block w-4 h-4 mr-2 bg-green-700 rounded-full"></div>
                              <h1>เปิดใช้งาน</h1>
                            </>
                          ) : (
                            <>
                              <div className="inline-block w-4 h-4 mr-2 bg-red-700 rounded-full"></div>
                              <h1>ปิดการใช้งาน</h1>
                            </>
                          )}
                        </div>
                      </td>

                      <td className="px-4 py-2">{item.updatedAt}</td>
                      <td className="flex items-center justify-center py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <button
                          onClick={() => handleEdit(item)}
                          type="button"
                          className="px-3"
                        >
                          <svg
                            className="w-[18px] h-[18px] text-gray-800 dark:text-white  dark:hover:text-yellow-500 "
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 21 21"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.7"
                              d="M7.418 17.861 1 20l2.139-6.418m4.279 4.279 10.7-10.7a3.027 3.027 0 0 0-2.14-5.165c-.802 0-1.571.319-2.139.886l-10.7 10.7m4.279 4.279-4.279-4.279m2.139 2.14 7.844-7.844m-1.426-2.853 4.279 4.279"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          type="button"
                          className="px-3"
                        >
                          <svg
                            className="w-[18px] h-[18px] text-gray-800 dark:text-white  dark:hover:text-red-500 "
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 20"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.7"
                              d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"
                            />
                          </svg>
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
          <div className="px-6 py-6 lg:px-8">
            <div className="flex flex-col items-center justify-center">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                Edit user information
              </h3>
            </div>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  defaultValue={editData.email} // ใช้ defaultValue แทน value
                  readOnly
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="firstname"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Firstname
                </label>
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  defaultValue={editData.firstname}
                  pattern="[^0-9]*"
                  onChange={(e) => handleChange(e)}
                  onInput={handleInput}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="lastname"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  lastName
                </label>
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  defaultValue={editData.lastname}
                  onChange={(e) => handleChange(e)}
                  onInput={handleInput}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="tel"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tel
                </label>
                <input
                  type="text"
                  name="tel"
                  id="tel"
                  defaultValue={editData.tel}
                  onChange={(e) => handleChange(e)}
                  onInput={handleInputTel}
                  pattern="[^0-9]*"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="role"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Role
                </label>
                <select
                  name="role"
                  id="role"
                  value={editData.role}
                  onChange={(e) => handleChange(e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                >
                  {roleData.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="enabled"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Enabled
                </label>
                <select
                  name="enabled"
                  id="enabled"
                  value={editData.enabled}
                  onChange={(e) => handleChange(e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                >
                  {enabledData.map((item) => (
                    <option key={item} value={item}>
                      {String(item)}{" "}
                      {/* เราแปลงค่า boolean เป็น string ด้วย String(item) */}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                onClick={(e) => {
                  handleSubmitEdit(e);
                }}
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </form>
          </div>
        </ModalForm>
      </section>
    </>
  );
};

export default ManageAdmin;
