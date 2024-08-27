import React from "react";

const Modal = ({ isOpen, closeModal, children }) => {
  return (
    <div
      className={`overflow-scroll p-10 my-1 fixed inset-0 flex items-center  justify-center z-50 ${
        isOpen ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className=" bg-gray-700  w-11/12 p-6 rounded-lg shadow-lg z-10 relative text-white ">
        <div className="w-full  flex justify-between items-center  ">
          <button
            type="button"
            className="text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="authentication-modal"
            onClick={closeModal}
          >
            {/* ปุ่มปิด modal */}
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
