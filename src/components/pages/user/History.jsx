import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ModalFormWhite from "../../layouts/ModalFormWhite";
import { getOrderbyUser } from "../../function/users";
import { getProductByAdmin } from "../../function/product";
const History = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [data, setData] = useState([]);

  const [dataLen, setDataLen] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);

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
          className={`${currentPage === i
            ? "flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
            : "flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
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
    // console.log("user.user.token", user.user.id);
    loadData(user.user.token, user.user.id);
  }, [user]);

  const loadData = async (authtoken, id) => {
    await getOrderbyUser(authtoken, id)
      .then((res) => {
        console.log("getOrderbyUser", res.data);
        setData(res.data);
        setDataLen(res.data.length);
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = async (item) => {
    let authtoken = user.user.token;
    getProductByAdmin(authtoken, item._id, item.products)
      .then(async (res) => {
        await setEditData({
          _id: item._id,
          name: `${item.address[0].fname} ${item.address[0].lname}`,
          phone: item.address[0].phone,
          addres: item.address[0].addres,
          district: item.address[0].district,
 
          province: item.address[0].province,
          code: item.address[0].code,
          image: item.images[0]?.images[0] || "",
          products: res.data,
          orderstatus: item.orderstatus,
          TotalFee: item.TotalFee,
          cartTotal: item.cartTotal,
        });
        setIsModalOpen(true);
      })
      .catch((err) => console.log(err));
  };
  console.log('editData.orderstatus', editData.orderstatus);
  const handleCloseModal = () => {
    // เมื่อปิด modal, ปิด modal ด้วยการตั้งค่า isModalOpen เป็น false
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="py-20">
        <div className="px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto ">
          <h1 className="text-3xl font-bold mb-2 mt-5 text-dark px-5">
            ประวัติคำสั่งซื้อ
          </h1>

          <div className="w-full my-5 px-4 mx-auto max-w-screen-2x1 ">
            <div className="relative overflow-hidden bg-white shadow-md  sm:rounded-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 ">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
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
                        className="border-b  hover:bg-gray-100 "
                      >
                        <td className="px-4 py-2">
                          <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded ">
                            {index + 1 + currentPage * itemsPerPage}
                          </span>
                        </td>
                        <td className="px-4 py-2">
                          <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded ">
                            {`${item.address[0].fname} ${item.address[0].lname}`}
                          </span>
                        </td>
                        <td className="px-4 py-2">
                          <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded ">
                            {`${item.address[0].phone}`}
                          </span>
                        </td>
                        <td className="px-4 py-2">
                          <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded ">
                            {` ${item.address[0].province} ${item.address[0].district} ${item.address[0].addres}  ${item.address[0].code}`}
                          </span>
                        </td>
                        <td className="px-4 py-2">
                          <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded ">
                            {item.TotalFee}
                          </span>
                        </td>
                        <td className="px-4 py-2">
                          <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded ">
                            {item.cartTotal}
                          </span>
                        </td>
                        <td className="px-4 py-2">
                          <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded ">
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
                        <td className="flex items-center justify-center py-2 font-medium text-gray-900 whitespace-nowrap ">
                          <button
                            onClick={() => handleEdit(item)}
                            type="button"
                            className="px-3"
                          >
                            <p className=" text-gray-800   ">ดูรายละเอียด</p>
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
                <span className="text-sm font-normal text-gray-500 ">
                  Showing
                  <span className="font-semibold text-gray-900 ">
                    {`${start + 1} - ${end > dataLen ? dataLen : end}`}
                  </span>
                  of {dataLen}
                  <span className="font-semibold text-gray-900 "></span>
                </span>

                <ul className="inline-flex items-stretch -space-x-px">
                  <li>
                    <button
                      onClick={previousPage}
                      className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
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
                      className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
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
          <ModalFormWhite isOpen={isModalOpen} closeModal={handleCloseModal}>
            <div className=" px-6 py-6 lg:px-8">
              <div className="flex flex-col items-center justify-center">
                <h3 className=" text-xl font-medium text-gray-900 ">
                  ดูประวัติคำสั่งซื้อ
                </h3>
              </div>
              <form className="mt-2">
                <div className="grid grid-rows-3 grid-flow-col gap-4">
                  <div className="row-span-3 ">
                    <img
                      className="h-auto max-w-xs rounded-lg shadow-xl "
                      src={editData.image}
                      alt="หลักฐานการชำระเงิน"
                    />
                  </div>
                  <div className="col-span-1 ">
                    <label
                      htmlFor="fname"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      ชื่อ
                    </label>
                    <input
                      type="text"
                      name="fname"
                      id="fname"
                      defaultValue={editData.name}
                      readOnly
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    />
                  </div>
                  <div className="col-span-2 ">
                    <label
                      htmlFor="addres"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      ที่อยู่
                    </label>
                    <input
                      type="text"
                      name="addres"
                      id="addres"
                      defaultValue={editData.addres}
                      readOnly
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    />
                  </div>
                  
                  <div className=" col-span-1 ...">
                    <label
                      htmlFor="phone"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      เบอร์โทรศัพท์
                    </label>
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      defaultValue={editData.phone}
                      readOnly
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    />
                  </div>
                  <div className=" col-span-1 ...">
                    <label
                      htmlFor="province"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      จังหวัด
                    </label>
                    <input
                      type="text"
                      name="province"
                      id="province"
                      defaultValue={editData.province}
                      readOnly
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    />
                  </div>
                  <div className=" col-span-1 ...">
                    <label
                      htmlFor="TotalFee"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      ค่ามัดจำ
                    </label>
                    <input
                      type="text"
                      name="TotalFee"
                      id="TotalFee"
                      defaultValue={editData.TotalFee}
                      readOnly
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    />
                  </div>
                  <div className=" col-span-1 ...">
                    <label
                      htmlFor="district"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      เขต
                    </label>
                    <input
                      type="text"
                      name="district"
                      id="district"
                      defaultValue={editData.district}
                      readOnly
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    />
                  </div>
                  <div className=" col-span-1 ...">
                    <label
                      htmlFor="code"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      รหัสไปรษณีย์
                    </label>
                    <input
                      type="text"
                      name="code"
                      id="code"
                      defaultValue={editData.code}
                      readOnly
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    />
                  </div>

                  <div className=" col-span-1 ...">
                    <label
                      htmlFor="cartTotal"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      ยอดรวมทั้งหมด
                    </label>
                    <input
                      type="text"
                      name="cartTotal"
                      id="cartTotal"
                      defaultValue={editData.cartTotal}
                      readOnly
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    />
                  </div>
                  <div className="col-span1">
                    <label
                      htmlFor="orderstatus"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      สถานะ
                    </label>
                    {/* <input
                      type="text"
                      name="orderstatus"
                      id="orderstatus"
                      defaultValue=
                      {editData.orderstatus === "1"
                        ? "รอตรวจสอบ"
                        : editData.orderstatus === "2"
                          ? "ตรวจสอบสำเร็จ"
                          : editData.orderstatus === "3"
                            ? "ตรวจสอบล้มเหลว"
                            : editData.orderstatus === "4"
                              ? "กำลังจัดส่ง"
                              : editData.orderstatus === "5"
                                ? "จัดส่งสำเร็จ"
                                : editData.orderstatus === "6"
                                  ? "จัดส่งล้มเหลว"
                                  : "ไม่มีข้อมูล"}
                      readOnly
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    /> */}
                    <span className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  ">
                      {editData.orderstatus === "1"
                        ? "รอตรวจสอบ"
                        : editData.orderstatus === "2"
                          ? "ตรวจสอบสำเร็จ"
                          : editData.orderstatus === "3"
                            ? "ตรวจสอบล้มเหลว"
                            : editData.orderstatus === "4"
                              ? "กำลังจัดส่ง"
                              : editData.orderstatus === "5"
                                ? "จัดส่งสำเร็จ"
                                : editData.orderstatus === "6"
                                  ? "จัดส่งล้มเหลว"
                                  : "ไม่มีข้อมูล"}
                    </span>
                  </div>
                </div>
                <div className="inline-flex rounded-md shadow-sm w-full mt-5 items-center text-center"></div>
              </form>
              <div className="overflow-y-scroll max-h-96 mt-2">
                <table className="w-full text-sm text-left text-gray-500 ">
                  <thead className="border-b sticky top-0  text-gray-700 uppercase bg-gray-50  ">
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
                        <tr className="bg-white border-b" key={index}>
                          <td className="px-6 py-4 font-semibold text-gray-900 ">
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

                          <td className="px-6 py-4 font-semibold text-gray-900 ">
                            {item.title}
                          </td>
                          <td className="px-6 py-4 font-semibold text-gray-900 ">
                            {item.productData.count}
                          </td>
                          <td className="px-6 py-4 font-semibold text-gray-900 ">
                            {item.productData.price}
                          </td>
                          <td className="px-6 py-4 font-semibold text-gray-900 ">
                            {item.productData.price * item.productData.count}
                          </td>
                        </tr>
                      ))
                      : console.log(false)}
                  </tbody>
                </table>
              </div>
            </div>
          </ModalFormWhite>
        </div>
      </div>
    </>
  );
};

export default History;
