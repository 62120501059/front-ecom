import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsPlus, BsEyeFill } from "react-icons/bs";
import { CartContext } from "./contexts/CartContext";
import { useDispatch } from "react-redux";

const Shop = ({ product, cate, selectedCategory }) => {
  const { addToCart } = useContext(CartContext);
  const dispatch = useDispatch();
  // Destructure product
  const { _id, title, category, images, price, quantity, sold } = product;

  // useEffect(() => {
  //   console.log(selectedCategory);
  // }, [selectedCategory]);

  return (
    <div>
      <div className="border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition">
        <div className="w-full h-full flex justify-center items-center">
          {/* Image */}
          <div className="w-[200px] mx-auto flex justify-center items-center">
            {/* Display the first image if available */}
            {images && images.length > 0 && (
              <img
                className="max-h-[160px] group-hover:scale-110 transition duration-300"
                src={images[0].url}
                alt=""
              />
            )}
          </div>
        </div>
        {/* Buttons */}
        <div className="absolute top-6 -right-11 group-hover:right-5 p-2 flex flex-col items-center justify-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button onClick={() => addToCart(product, _id)}>
            <div className="flex justify-center items-center text-white w-12 h-12 bg-red-500">
              <BsPlus className="text-3xl" />
            </div>
          </button>
          {/* <Link
            to={"/user/productDetails"}
            className="w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl"
          >
            <BsEyeFill />
          </Link> */}
        </div>
      </div>
      {/* Category, Title, and Price */}
      <div>
        <div className="text-sm capitalize text-gray-500 mb-1">
          {category && category.name}
        </div>
        {/* <Link to={"/user/productDetails"}> */}
        <h2 className="font-semibold mb-1">{title}</h2>
        {/* </Link> */}
        <div className="font-semibold">คงเหลือ {quantity}</div>
        <div className="font-semibold">ขายแล้ว {sold}</div>
        <div className="font-semibold">฿ {price}</div>
      </div>
    </div>
  );
};

export default Shop;
