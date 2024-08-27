import React from "react";

import { Link } from "react-router-dom";
const Tidy = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="p-6 md:w-1/2 mx-auto">
        <svg
          viewBox="0 0 24 24"
          className="text-green-600 w-16 h-16 mx-auto my-6"
        >
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
          ></path>
        </svg>
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl text-gray-900 font-semibold my-4">
            Payment Done!
          </h3>
          <p className="text-gray-600 text-lg my-4">
            Thank you for completing your secure online payment.
          </p>
          <p className="text-lg my-4">Have a great day!</p>
          <div className="py-8 md:py-12 text-center">
            <Link
              to="/"
              className="px-8 md:px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 md:py-4"
            >
              GO BACK
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tidy;
