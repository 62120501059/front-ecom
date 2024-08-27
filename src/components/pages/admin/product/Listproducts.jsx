import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ModalForm from "../../../layouts/ModalForm";
import {
  listProduct,
  removeProduct,
  updateProduct,
} from "../../../function/product";

import AddSlide from "./Addslide";
import Swal from "sweetalert2";

const Listproducts = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [data, setData] = useState([]);
  const [dataStock, setDataStock] = useState([]);
  const [dataLen, setDataLen] = useState(0);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalStockOpen, setIsModalStockOpen] = useState(false);

  const initalstate = {
    title: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    quantity: "",
    images: [],
  };

  const [values, setValues] = useState(initalstate);
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
    setLoading(true);

    await listProduct(authtoken)
      .then((res) => {
        setLoading(false);
        setData(res.data);
        setDataLen(res.data.length);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
    setLoading(true);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    // ถ้าชื่อฟิลด์เป็น 'image' ให้ทำการอัปโหลดรูปภาพและบันทึก URL
    if (name === "image") {
      const file = e.target.files[0]; // รับรูปภาพจาก input file
      if (file) {
        // สร้างอ็อบเจ็กต์ URL สำหรับรูปภาพ
        const imageUrl = URL.createObjectURL(file);

        setValues({
          ...values,
          [name]: imageUrl,
        });
      }
    } else {
      // ถ้าไม่ใช่ฟิลด์รูปภาพให้อัปเดตค่าเหมือนเดิม
      setValues({
        ...values,
        [name]: value,
      });
    }
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();

    if (values.price <= 0) {
      Toast.fire({
        icon: "error",
        title: "ราคาต้องมีค่ามากกว่าศูนย์",
      });
      return; // หยุดการทำงานของฟังก์ชันถ้ามีค่าราคาหรือจำนวนติดลบหรือเท่ากับศูนย์
    }

    let authtoken = user.user.token;
    let id = values._id;

    updateProduct(authtoken, id, values)
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
          title: "Error Edit Product!",
          text: err.response.data.message,
          icon: "error",
          confirmButtonText: "Ok",
        });
        console.log(err);
      });
  };
  const handleEdit = async (item) => {
    setIsModalOpen(true);
    await setValues(item);
  };

  const handleSubmitEditStock = async (e) => {
    e.preventDefault();
    if (dataStock.addQuantity < 0) {
      Toast.fire({
        icon: "error",
        title: "จำนวนต้องมีค่ามากกว่าศูนย์",
      });
      return; // หยุดการทำงานของฟังก์ชันถ้ามีค่าราคาหรือจำนวนติดลบหรือเท่ากับศูนย์
    }
    dataStock.quantity = parseInt(dataStock.quantity);
    dataStock.addQuantity = parseInt(dataStock.addQuantity);
    dataStock.quantity += dataStock.addQuantity;
    dataStock.quantity = dataStock.quantity.toString();
    delete dataStock.addQuantity;
    let authtoken = user.user.token;
    let id = dataStock._id;

    updateProduct(authtoken, id, dataStock)
      .then(async (res) => {
        Toast.fire({
          icon: "success",
          title: "เพิ่มสต๊อกสำเร็จ",
        });

        await setIsModalOpen(false);
      })
      .then(() => {
        window.location.reload(); // รีเฟรชหน้า
      })
      .catch((err) => {
        Swal.fire({
          title: "Error Edit Product!",
          text: "เพิ่มสต๊อกไม่สำเร็จ",
          icon: "error",
          confirmButtonText: "Ok",
        });
        console.log(err);
      });
  };
  const handleChangeStock = (e) => {
    const { name, value } = e.target;
    setDataStock({
      ...dataStock,
      [name]: value,
    });
  };
  const handleEditStock = async (item) => {
    await setDataStock(item);
    setIsModalStockOpen(true);
  };

  const handleRemove = (id) => {
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
        removeProduct(user.user.token, id)
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
              title: "Error Update!",
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

  const handleCloseStockModal = () => {
    setIsModalStockOpen(false);
  };

  return (
    <>
      <section className=" flex flex-col w-full bg-gray-50 dark:bg-gray-900 py-3 sm:py-5">
        <h1 className="text-3xl font-bold mb-2 mt-5 text-white px-5">
          จัดการข้อมูลสินค้า
        </h1>
        <div className="w-full my-5 px-4 mx-auto max-w-screen-2x1 ">
          <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      ลำดับ
                    </th>
                    <th scope="col" className="px-6 py-3">
                      รูปภาพ
                    </th>
                    <th scope="col" className="px-6 py-3">
                      ชื่อสินค้า
                    </th>
                    <th scope="col" className="px-6 py-3">
                      หมวดหมู่
                    </th>
                    <th scope="col" className="px-6 py-3">
                      รายละเอียด
                    </th>

                    <th scope="col" className="px-6 py-3">
                      จำนวน (กิโล/แพ็ค)
                    </th>
                    <th scope="col" className="px-6 py-3">
                      ราคา (บาท)
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((item, index) => (
                    <tr
                      key={item._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {index + 1 + currentPage * itemsPerPage}
                      </td>
                      <td className="w-32 p-4">
                        <img
                          src={
                            item.images && item.images.length
                              ? item.images[0].url
                              : ""
                          }
                          alt=""
                        />
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {item.title}
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {item.category.name}
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {item.description}
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {item.price}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleEditStock(item)}
                          type="button"
                          className="font-medium text-red-600 dark:text-red-500 hover:underline px-3"
                        >
                          <svg
                            className="w-[18px] h-[18px] text-gray-800 dark:text-white  dark:hover:text-yellow-500"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.546.5a9.5 9.5 0 1 0 9.5 9.5 9.51 9.51 0 0 0-9.5-9.5ZM13.788 11h-3.242v3.242a1 1 0 1 1-2 0V11H5.304a1 1 0 0 1 0-2h3.242V5.758a1 1 0 0 1 2 0V9h3.242a1 1 0 1 1 0 2Z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleEdit(item)}
                          type="button"
                          className="font-medium text-red-600 dark:text-red-500 hover:underline"
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
                          onClick={() => handleRemove(item._id)}
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
          <div className="px-6 py-6 lg:px-8 modal">
            <div className="flex flex-col items-center justify-center">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                แก้ไขข้อมูลสินค้า
              </h3>
            </div>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  defaultValue={values.title} // ใช้ defaultValue แทน value
                  onChange={(e) => handleChange(e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  ราคา
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  defaultValue={values.price}
                  onChange={(e) => handleChange(e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
                {values.price < 0 && (
                  <label className="text-red-600 block mt-2 px-4">
                    กรุณาระบุราคาที่มากกว่า 0
                  </label>
                )}
              </div>
              <div>
                <label
                  htmlFor="quantity"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  จำนวน
                </label>
                <input
                  type="text"
                  name="quantity"
                  id="quantity"
                  defaultValue={values.quantity}
                  readOnly
                  onChange={(e) => handleChange(e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  รายละเอียด
                </label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  defaultValue={values.description}
                  onChange={(e) => handleChange(e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="image"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  รูปภาพ
                </label>
                <AddSlide
                  loading={loading}
                  setLoading={setLoading}
                  values={values}
                  setValues={setValues}
                />
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

        <ModalForm isOpen={isModalStockOpen} closeModal={handleCloseStockModal}>
          <div className="px-6 py-6 lg:px-8 modal">
            <div className="flex flex-col items-center justify-center">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                เพิ่มสต๊อกสินค้า
              </h3>
            </div>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  รายการสินค้า
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  defaultValue={dataStock.title} // ใช้ defaultValue แทน value
                  onChange={(e) => handleChangeStock(e)}
                  readOnly
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="quantity"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  จำนวนสินค้าในสต๊อก
                </label>
                <input
                  type="text"
                  name="quantity"
                  id="quantity"
                  defaultValue={dataStock.quantity}
                  readOnly
                  onChange={(e) => handleChangeStock(e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="addQuantity"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  เพิ่มสต๊อก
                </label>
                <input
                  type="number"
                  name="addQuantity"
                  id="addQuantity"
                  defaultValue={dataStock.addQuantity}
                  onChange={(e) => handleChangeStock(e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
                {dataStock.addQuantity < 0 && (
                  <label className="text-red-600 block mt-2 px-4">
                    กรุณาระบุจำนวนที่มากกว่า 0
                  </label>
                )}
              </div>
              <button
                type="submit"
                onClick={(e) => {
                  handleSubmitEditStock(e);
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

export default Listproducts;
