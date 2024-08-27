import React from "react";
import { useState, useEffect, Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import { verifyRegister } from "../../function/auth";
import Notfound404 from "../Notfound404";

const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(false);
  const param = useParams();

  useEffect(() => {
    verifyRegister(param)
      .then((res) => {
        setValidUrl(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Fragment>
      {validUrl ? (
        <div className="flex items-center justify-center h-screen">
          <div>
            <div className="flex flex-col items-center space-y-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-green-600 w-28 h-28"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h1 className="text-4xl font-bold">Thank You !</h1>
              <p>
                Thank you for your interest! Check your email for a link to the
                guide.
              </p>
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 text-white bg-indigo-600 border border-indigo-600  rounded-full hover:bg-indigo-700 focus:outline-none focus:ring"
              >
                <button className="">เข้าสู่ระบบ</button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <Notfound404 text={"คุณไม่มีสิทการเข้าถึงลิงค์นี้"} />
      )}
    </Fragment>
  );
};

export default EmailVerify;
