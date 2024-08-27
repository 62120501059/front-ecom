// import React from "react";

// const SidebarLayout = () => {
//   return (
//     <div className="text-black w-64 min-h-screen p-4 py-20 border-r-4 border-dotted ">
//       <h2 className="text-2xl  mb-4 font-bold ">หมวดหมู่</h2>
//       <ul>
//         <li className="mb-2">
//           <a href="/" className="block hover:bg-gray-300 px-4 py-2 rounded">
//             สินค้าทั้งหมด
//           </a>
//         </li>
//         <li className="mb-2">
//           <a href="/" className="block hover:bg-gray-300 px-4 py-2 rounded">
//             เนื้อสัตว์
//           </a>
//         </li>
//         <li className="mb-2">
//           <a href="/" className="block hover:bg-gray-300 px-4 py-2 rounded">
//             อาหารทะเล
//           </a>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default SidebarLayout;

import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faHamburger,
  faFish,
  faCloudMeatball,
} from "@fortawesome/free-solid-svg-icons";


const SidebarLayout = ({ cate, onCategoryChange }) => {



  return (
    <div className="text-black w-64 min-h-screen p-4 py-20 border-r-4 border-dotted">
      <h2 className="text-2xl mb-4 font-bold ">หมวดหมู่</h2>

      <hr className="border-b-2" />
      <ul>
        <li className="mb-2" onClick={() => onCategoryChange(null)} >
          <Link
            to="/user/product"
            className="block hover:bg-gray-300 px-4 py-2 rounded"
          >
            <FontAwesomeIcon icon={faList} />
            <span className="ml-2">สินค้าทั้งหมด</span>
          </Link>
        </li>
        {cate && cate.map(item => (
          <li className="mb-2" onClick={() => onCategoryChange(item)}>
            <Link
              to="/user/product"
              className="block hover:bg-gray-300 px-4 py-2 rounded"
            >
              <FontAwesomeIcon icon={faHamburger} />
              <span className="ml-2">{item.name}</span>
            </Link>
          </li>
        ))}
        {/* <li className="mb-2">
          <Link
            to="/seafood"
            className="block hover:bg-gray-300 px-4 py-2 rounded"
          >
            <FontAwesomeIcon icon={faFish} />
            <span className="ml-2">อาหารทะเล</span>
          </Link>
        </li>
        <li className="mb-2">
          <Link
            to="/meatball"
            className="block hover:bg-gray-300 px-4 py-2 rounded"
          >
            <FontAwesomeIcon icon={faCloudMeatball} />
            <span className="ml-2">ลูกชิ้น</span>
          </Link>
        </li> */}
      </ul>
    </div>
  );
};

export default SidebarLayout;
