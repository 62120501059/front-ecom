/* eslint-disable jsx-a11y/alt-text */
import React from "react";

export default function Notfound404({ text }) {
  return (
    <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
      <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
        <div className="relative">
          <div className="absolute">
            <div className="">
              <h1 className="my-2 text-gray-800 font-bold text-2xl">
                ERROR 404 PAGE NOT FOUND
              </h1>
              <p className="my-2 text-gray-800">
                {text
                  ? text
                  : " ขอโทษด้วยกับเรื่องนั้น!กรุณาเยี่ยมชมหน้าแรกของเราเพื่อไปยังที่ที่คุณต้องการ"}
              </p>
              <button className="sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">
                <a href="/">กลับสู่หน้าหลัก</a>
              </button>
            </div>
          </div>
          <div>
            <img src="https://i.ibb.co/G9DC8S0/404-2.png" />
          </div>
        </div>
      </div>
      <div>
        <img src="https://i.ibb.co/ck1SGFJ/Group.png" />
      </div>
    </div>
  );
}
