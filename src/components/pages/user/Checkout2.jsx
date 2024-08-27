import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
//
import { getUserCart } from "../../function/users";
export default function Checkout2() {
  const [products, setProducts] = useState([]); // Initialize with a default quantity of 1
  const { user } = useSelector((state) => ({ ...state }));
  const [total, setTotal] = useState(0);
  useEffect(() => {
    getUserCart(user.user.token).then((res) => {
      // console.log(res.data);
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);
  // console.log('total', total);
  return (
    <div className="flex flex-col sm:flex-row px-20 py-20 ">
      <div className="w-full sm:w-1/2 p-4 ">
        <div>
          <h2 className="text-4xl ">ตะกร้า</h2>
        </div>
        {products.map((item, i) => (
          <div className="py-5 sm:py-10 flex flex-col sm:flex-row border-b-2 gray-300">
            <div className="w-full sm:w-3/12">
              <img
                src={
                  item.product.images && item.product.images.length
                    ? item.product.images[0].url
                    : ""
                }
                alt=""
                className="w-full"
              />
            </div>
            <div className="w-full sm:w-8/12 px-5">
              <div className="flex flex-col sm:flex-row justify-between">
                <p className="text-xl mb-2 sm:mb-5 font-bold">
                  {item.product.title}
                </p>
                <p className="text-xl mb-2 sm:mb-4">
                  {item.price * item.count}
                </p>
              </div>
              {/* <p className="mb-2 sm:mb-5 text-sm">{item.product.title}</p> */}

              <div className="flex flex-row items-center">
                <h1 className="mb-2 sm:mb-4 text-xl font-bold">จำนวน :</h1>
                <p className="text-xl ml-5 mb-2 sm:mb-5">{item.count}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full sm:w-1/2 p-4 ">
        <section className="container px-5 sm:px-20">
          <p className="mb-5 sm:mb-10 font-bold text-3xl">สรุปยอดรวม</p>
          <div class="flex flex-col sm:flex-row justify-between">
            <p className="text-lg">ยอดรวม</p>
            <p className="text-lg mb-5 sm:mb-8">{total} ฿</p>
          </div>
          <Link to="/">
            <button className=" border border-transparent hover:border-gray-300 bg-gray-300 hover:bg-white  hover:text-gray-900 flex justify-center items-center py-4 rounded w-full mt-20">
              ยกเลิก
            </button>
          </Link>
          <Link to="/user/payment">
            <button className=" border border-transparent hover:border-gray-300 bg-gray-900 hover:bg-white text-white hover:text-gray-900 flex justify-center items-center py-4 rounded w-full mt-2">
              ชำระเงิน
            </button>
          </Link>
        </section>
      </div>
    </div>
  );
}
