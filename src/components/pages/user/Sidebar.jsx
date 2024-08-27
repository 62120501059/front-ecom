import React, { useContext } from "react";
//import Link
import { Link, useNavigate } from 'react-router-dom';
//import icon
import { IoMdArrowRoundForward } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";
//import components
import CartItem from "./CartItem";
//import sidebar context
import { SidebarContext } from "./contexts/SidebarContext";
//import cart context
import { CartContext } from "./contexts/CartContext";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
//function
import { userCart } from '../../function/users';
const Sidebar = () => {
  const { cart, user } = useSelector((state) => ({ ...state }));
  const { isOpen, handleClose } = useContext(SidebarContext);
  const { carts, clearCart, total, itemAmount } = useContext(CartContext)
  const navigate = useNavigate()
  const checktotal = 3000;
  const handleSaveOrder = () => {

    if (total >= checktotal) {
      Swal.fire(
        'CheckOut order'
      )

      userCart(user.user.token, cart)
        .then(res => {
          console.log(res);
          navigate('/user/checkout')
        }).catch(err => {
          console.log(err);
        })
    } else {
      Swal.fire(
        'ยอดสั่งขั้นต่ำ 3000 บาทขึ้นไป'
      )
    }
  }


  return (
    <div
      className={`${isOpen ? "right-0" : "-right-full"
        } w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px]`}
    >
      <div className="flex items-center justify-between py-6 border-b">
        <div className=" uppercase text-sm font-semibold">
          Shopping bag ({itemAmount})
        </div>
        {/* icon */}
        <div
          onClick={handleClose}
          className=" cursor-pointer w-8 h-8 flex justify-center items-center"
        >
          <IoMdArrowRoundForward className=" text-2xl" />
        </div>
      </div>
      <div className="flex flex-col gap-y-2 h-[430px] lg:h-[640] overflow-y-auto overflow-x-hidden border-b">
        {cart.map((item) => {
          return <CartItem item={item} key={item._id} />;
        })}
      </div>
      <div className="flex flex-col gap-y-3 py-4 mt-4">
        <div className=" flex w-full justify-between items-center">
          {/* total */}
          <div className=" uppercase font-semibold">
            <span className="mr-2">Total:</span>฿ {parseFloat(total).toFixed(2)}
          </div>
          {/* clear cart icon */}
          {/* <div
            onClick={clearCart}
            className=' cursor-pointer py-4 bg-red-500 text-white w-12 h-12 flex justify-center items-center text-xl'>
            <FiTrash2 />
          </div> */}
        </div>
        {/* <button className=" border border-transparent hover:border-gray-300 bg-gray-300 hover:bg-white  hover:text-gray-900 flex justify-center items-center py-4 rounded w-full">
          <Link to="/">View cart</Link>
        </button> */}

        <button onClick={handleSaveOrder} className=' border border-transparent hover:border-gray-300 bg-gray-900 hover:bg-white text-white hover:text-gray-900 flex justify-center items-center py-4 rounded w-full'>
          <Link
          >
            Checkout
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
