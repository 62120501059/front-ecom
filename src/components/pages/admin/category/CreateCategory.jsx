import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import ModalForm from "../../../layouts/ModalForm";
//function
import {
  createCategory,
  listCategory,
  deleteCategory,
  EditCategory,
} from "../../../function/category";

const CreateCategory = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [values, setValues] = useState({});
  const [data, setData] = useState([]);
  const [dataLen, setDataLen] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);

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
  // **** ดึงข้อมูล ****

  useEffect(() => {
    loadData(user.user.token);
  }, [user]);

  const loadData = async (authtoken) => {
    await listCategory(authtoken)
      .then((res) => {
        setData(res.data);
        setDataLen(res.data.length);
      })
      .catch((err) => console.log(err));
  };
  // **** ดึงข้อมูล ****

  // **** ส่วน Add ****

  const handleAdd = async () => {
    setIsModalAddOpen(true);
  };
  const handleChangeAdd = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCategory(values)
      .then((res) => {
        Toast.fire({
          icon: "success",
          title: "เพิ่มข้อมูลสำเร็จ",
        });
        loadData();
        setIsModalAddOpen(false);
      })
      .then(() => {
        window.location.reload(); // รีเฟรชหน้า
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // **** ส่วน Add ****

  // **** ส่วน Edit ****
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
  };
  const handleSubmitEdit = async (e) => {
    e.preventDefault();

    let authtoken = user.user.token;
    let id = editData._id;

    EditCategory(authtoken, id, editData)
      .then((res) => {
        Toast.fire({
          icon: "success",
          title: "แก้ไข้สำเร็จ",
        });

        setIsModalOpen(false);
      })

      .catch((err) => {
        Swal.fire({
          title: "Error Edit Category!",
          text: err.response.data.message,
          icon: "error",
          confirmButtonText: "Ok",
        });
        console.log(err);
      });
  };
  // **** ส่วน Edit ****

  const handleDelete = (id) => {
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
        deleteCategory(user.user.token, id)
          .then((res) => {
            Toast.fire({
              icon: "success",
              title: "ลบข้อมูลสำเร็จ",
            });
            loadData(user.user.token);
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
    setIsModalOpen(false);
  };

  const handleCloseAddModal = () => {
    setIsModalAddOpen(false);
  };
  return (
    <>
      <section className=" flex flex-col w-full bg-gray-50 dark:bg-gray-900 py-3 sm:py-5">
        <h1 className="text-3xl font-bold mb-2 mt-5 text-white px-5">
          หมวดหมู่สินค้า
        </h1>
        <div className="w-full my-5 px-4 mx-auto max-w-screen-2x1 ">
          <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
            {/* ปุ่มเพิ่มข้อมูล */}
            <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
              <div className="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
                <button
                  onClick={() => handleAdd()}
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  + เพิ่มหมวดหมู่สินค้า
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      ลำดับ
                    </th>
                    <th scope="col" className="px-4 py-3">
                      ชื่อหมวดหมู่สินค้า
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
                      <td className="px-4 py-2 items-center">{item.name}</td>
                      <td className="flex  py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
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
                แก้ไขหมวดหมู่สินค้า
              </h3>
            </div>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  defaultValue={editData.name} // ใช้ defaultValue แทน value
                  onChange={(e) => handleChange(e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
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
        <ModalForm isOpen={isModalAddOpen} closeModal={handleCloseAddModal}>
          <div className="px-6 py-6 lg:px-8">
            <div className="flex flex-col items-center justify-center">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                เพิ่มหมวดหมู่สินค้า
              </h3>
            </div>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  ชื่อหมวดหมู่สินค้า
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  defaultValue=""
                  onChange={(e) => handleChangeAdd(e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <button
                type="submit"
                onClick={(e) => {
                  handleSubmit(e);
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

export default CreateCategory;
