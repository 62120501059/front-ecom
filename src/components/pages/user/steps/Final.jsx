// import React from "react";
// import { Link } from "react-router-dom";
// import { MdLocationPin } from "react-icons/md";

// export default function Final() {
//   return (
//     <div className="px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
//       <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9  text-gray-800">
//         อยู่ในระหว่างการจัดส่ง{" "}
//       </h1>
//       <div className="mt-10 flex flex-col xl:flex-row justify-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
//         <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
//           <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
//             <div className="mt-4 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full ">
//               <div className="pb-4 md:pb-8 w-full md:w-40">
//                 <img
//                   className="w-full hidden md:block"
//                   src="https://i.pinimg.com/564x/55/1c/0c/551c0c97c0092bf042e108b0532cff49.jpg"
//                   alt="dress"
//                 />
//                 <img
//                   className="w-full md:hidden"
//                   src="https://i.pinimg.com/564x/55/1c/0c/551c0c97c0092bf042e108b0532cff49.jpg"
//                   alt="dress"
//                 />
//               </div>
//               <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
//                 <div className="w-full flex flex-col justify-start items-start space-y-8">
//                   <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">
//                     น้องปู
//                   </h3>
//                   <div className="flex justify-start items-start flex-col space-y-2">
//                     <p className="text-sm leading-none text-gray-800">
//                       <span className="text-gray-">ประเภท: </span> Italic
//                       Minimal Design
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex justify-between space-x-8 items-start w-full">
//                   <p className="text-base xl:text-lg leading-6">$36.00</p>
//                   <p className="text-base xl:text-lg leading-6 text-gray-800">
//                     01
//                   </p>
//                   <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">
//                     $36.00
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
//             <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
//               <h3 className="text-xl font-semibold leading-5 text-gray-800">
//                 Summary
//               </h3>
//               <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
//                 <div className="flex justify-between  w-full">
//                   <p className="text-base leading-4 text-gray-800">ยอดรวม</p>
//                   <p className="text-base leading-4 text-gray-600">$56.00</p>
//                 </div>
//                 <div className="flex justify-between items-center w-full">
//                   <p className="text-base leading-4 text-gray-800">
//                     ส่วนลด{" "}
//                     <span className="bg-gray-200 p-1 text-xs font-medium leading-3  text-gray-800">
//                       STUDENT
//                     </span>
//                   </p>
//                   <p className="text-base leading-4 text-gray-600">
//                     -$28.00 (50%)
//                   </p>
//                 </div>
//                 <div className="flex justify-between items-center w-full">
//                   <p className="text-base leading-4 text-gray-800">ค่าจัดส่ง</p>
//                   <p className="text-base leading-4 text-gray-600">$8.00</p>
//                 </div>
//               </div>
//               <div className="flex justify-between items-center w-full">
//                 <p className="text-base font-semibold leading-4 text-red-600">
//                   ทั้งหมด
//                 </p>
//                 <p className="text-base font-semibold leading-4 text-red-600">
//                   $36.00
//                 </p>
//               </div>
//             </div>

//             <div className="flex flex-col px-4 py-4 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
//               <h3 className="text-xl font-semibold leading-5 text-gray-800">
//                 รายละเอียดคำสังซื้อ
//               </h3>
//               <div className="flex justify-center items-center w-full space-y-4 flex-col  pb-4">
//                 <div className="flex justify-between  w-full">
//                   <p className=" text-base leading-4 text-gray-800">
//                     หมายเลขคำสั่งซื้อ
//                   </p>
//                   <p className="text-base leading-4 text-red-600">
//                     100000000011
//                   </p>
//                 </div>
//                 <div className="flex justify-between items-center w-full">
//                   <p className="text-base leading-4 text-gray-800">
//                     วิธีการชำระ
//                   </p>
//                   <p className="text-base leading-4 text-red-600">QR Code</p>
//                 </div>
//                 <div className="flex justify-between items-center w-full">
//                   <p className="text-base leading-4 text-gray-800">
//                     วันที่สั่ง
//                   </p>
//                   <p className="text-base leading-4 text-red-600">
//                     12/9/2566 11:05 PM
//                   </p>
//                 </div>

//                 <div className="flex justify-between items-center w-full">
//                   <p className="text-base leading-4 text-gray-800">
//                     เวลาที่ชำระ
//                   </p>
//                   <p className="text-base leading-4 text-red-600">
//                     12/9/2566 11:06 PM
//                   </p>
//                 </div>

//                 <div className="flex justify-between items-center w-full">
//                   <p className="text-base leading-4 text-gray-800">
//                     วันที่จัดส่ง
//                   </p>
//                   <p className="text-base leading-4 text-red-600">
//                     13/9/2566 11:05 PM
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
//               <h3 className="text-xl font-semibold leading-5 text-gray-800">
//                 รหัสเลขพัสดุ
//               </h3>
//               <div className="flex justify-between items-start w-full">
//                 <div className="flex justify-center items-center space-x-4">
//                   <div class="w-8 h-8">
//                     <img
//                       class="w-full h-full"
//                       alt="logo"
//                       src="https://i.ibb.co/L8KSdNQ/image-3.png"
//                     />
//                   </div>
//                   <div className="flex flex-col justify-start items-center">
//                     <p className="text-lg leading-6 font-semibold text-gray-800">
//                       หมายเลขการติดตาม
//                       <br />
//                       <span className="font-normal">TH145DXZ5Q8U</span>
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="bg-gray-50 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col ">
//           <div className="flex  flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0 ">
//             <div className="flex flex-col justify-start items-start flex-shrink-0">
//               <div className="flex justify-center  w-full  md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
//                 <img
//                   src="https://i.ibb.co/5TSg7f6/Rectangle-18.png"
//                   alt="avatar"
//                 />
//                 <div className=" flex justify-start items-start flex-col space-y-2">
//                   <p className="text-base font-semibold leading-4 text-left text-gray-800">
//                     David Kent
//                   </p>
//                   <p className="text-sm leading-5 text-gray-600">
//                     10 Previous Orders
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div className="flex justify-between xl:h-full  items-stretch w-full flex-col mt-6 md:mt-0">
//               <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row  items-center md:items-start ">
//                 <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 mt-10">
//                   <div className="flex items-center">
//                     <MdLocationPin size={30} />
//                     <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800 ml-2">
//                       ที่อยู่เรียกเก็บเงิน
//                     </p>{" "}
//                     {/* Address */}
//                   </div>
//                   <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
//                     180 North King Street, Northhampton MA 1060
//                   </p>
//                 </div>
//               </div>

//               <Link to="/">
//                 <div className="flex w-full justify-center items-center md:justify-start md:items-start mt-3">
//                   <button className="hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white">
//                     เสร็จสิน
//                   </button>
//                 </div>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
