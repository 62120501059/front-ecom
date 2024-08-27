import React, { useState, useContext } from 'react'
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';
//import icons
import { IoMdAdd, IoMdClose, IoMdRemove } from 'react-icons/io'
// import cart context
import { CartContext } from './contexts/CartContext';
import { useDispatch, useSelector } from "react-redux";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const { removeFromCart, increaseAmount, decreaseAmount } = useContext(CartContext)
  // destructure item
  const { _id, title, image, price, count } = item;

  const handleChangeCount = (e) => {
    const count = e.target.value < 1 ? 1 : e.target.value;

    if (count > item.quantity) {
      Swal.fire({
        title: 'Max avialable Quantity:' + item.quantity,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })

      return;
    }

    let cart = []
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'))
    }

    cart.map((product, i) => {
      if (product._id == _id) {
        cart[i].count = count
      }
    })

    localStorage.setItem('cart', JSON.stringify(cart))
    dispatch({
      type: "ADD_TO_CART",
      payload: cart
    })
  }


  return (
    <div className='flex gap-x-4 py-2 lg:px-6 border-b border-gray-200 w-full font-light text-gray-500'>
      <div className='w-full min-h-[150px] flex items-center gap-x-4'>
        {/* {image} */}
        <Link to={`/product/${_id}`}>
          <img className='max-w-[80px]' src={image} alt="" />
        </Link>
        <div className='w-full flex flex-col '>
          {/* title & remove icon */}
          <div className='flex justify-between mb-2'>
            {/* title */}
            <Link to={`/product/${_id}`} className='text-sm uppercase font-medium 
          max-w-[240px] text-primary hover:underline'
            >
              {title}
            </Link>
            {/* remove icons */}
            <div
              onClick={() => removeFromCart(_id)}
              className='text-xl cursor-pointer'
            >
              <IoMdClose className='text-gray-500 
            hover:text-red-500 transition'/>
            </div>
          </div>
          <div className=' flex gap-x-2 h-[36px]'>
            {/* qty */}
            <div className='flex flex-1 max-w-[100px]  items-center h-full border text-primary font-medium'>
              {/* minus icon*/}
              {/* <div
                onClick={() => decreaseAmount(_id)}
                className='flex-1 flex justify-center items-center cursor-pointer h-full'>
                <IoMdRemove />
              </div> */}
              {/* amount*/}
              <input type="number" onChange={handleChangeCount} className='h-full flex justify-center items-center px-2' value={count} />
              {/* plus icon */}
              {/* <div
                onClick={() => increaseAmount(_id)}
                className='flex-1 h-full flex justify-center items-center cursor-pointer'>
                <IoMdAdd />
              </div> */}
            </div>
            {/* item price */}
            <div className='flex-1 flex items-center justify-around'>฿ {price}</div>
            {/* final price */}
            {/* make the price at 2 decimals */}
            <div className='flex-1 flex justify-end items-center text-primary font-medium'>{`฿ ${parseFloat(price * count).toFixed(2)}`}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem

