import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAmountOrderbyAdmin, incomeByAdmin } from "../../function/users";

const HomeAdmin = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [data, setData] = useState([]);
  const [income, setIncome] = useState([]);
  useEffect(() => {
    loadData(user.user.token);
  }, [user]);

  const loadData = async (authtoken) => {
    await getAmountOrderbyAdmin(authtoken)
      .then((res) => {
        console.log("getAmountOrderbyAdmin", res.data);
        setData(res.data);
      })
      .catch((err) => console.log(err));

    await incomeByAdmin(authtoken)
      .then((res) => {
        console.log(res.data);
        setIncome(res.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <section className=" flex flex-col w-full bg-gray-50 dark:bg-gray-900 py-3 sm:py-5">
        <h1 className="text-3xl font-bold mb-2 mt-5 text-white px-5">
          การจัดการ
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
              {`ชำระเงินสำเร็จ ${data[2] || 0} ออเดอร์`}
            </p>
            <p className="font-normal text-white ">
              {" "}
              {`กำลังจัดส่ง ${data[4] || 0} ออเดอร์`}
            </p>
            <p className="font-normal text-white ">
              {" "}
              {`ส่งสินค้าไม่สำเร็จ ${data[6] || 0} ออเดอร์`}
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
              {`ส่งสินค้าสำเร็จ ${data[5] || 0}  ออเดอร์`}
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
              ยังไม่ตรวจสอบ {data[1] || 0}
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
              ชำระเงินสำเร็จ {data[2] || 0}
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
              ชำระเงินไม่สำเร็จ {data[3] || 0}
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
              กำลังจัดส่ง {data[4] || 0}
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
              ส่งสินค้าสำเร็จ {data[5] || 0}
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
              ส่งสินค้าไม่สำเร็จ {data[6] || 0}
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
              คืนเงิน {data[7] || 0}
            </h5>
            <p className="font-normal text-white ">
              เมื่อทำการส่ง แล้วลูกค้าตรวจสอบสินค้าแล้วไม่ได้คุณภาพ
              ให้พูดคยกับพนักงานส่งของและทำการคืนเงิน
            </p>
          </Link>
        </div>
      </section>
    </>
  );
};

export default HomeAdmin;
