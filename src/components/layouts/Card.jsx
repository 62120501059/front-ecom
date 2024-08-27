import React from "react";
import { Link } from "react-router-dom";
function Card({ title, imageUrl, category, price, discountedPrice }) {
  return (
    <div className="card bg-white w-[250px] h-[350px] m-2 rounded-lg shadow-lg">
      <div className="top flex justify-center items-center">
        <img
          className="w-[200px] h-[200px] object-cover p-2"
          src={imageUrl}
          alt="img"
        />
      </div>
      <div className="bottom flex flex-col justify-center items-start p-3 bg-">
        <div className="title font-semibold text-xs my-1">{title}</div>
        <div className="category text-xs font-light my-1">{category}</div>

        <div className="pricing flex items-center">
          {" "}
          <div className="price ">{price}</div>
          <div className="ml-2 text-xs ">{discountedPrice}</div>
        </div>
        <div className="flex items-center my-2">
          <Link to="/user/product">
            <button className="border px-3 py-1 text-xs rounded-lg mr-1 ">
              Buy Now
            </button>
          </Link>
          {/* <button className="border px-3 py-1 text-xs rounded-lg ">
            Add to Cart
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default Card