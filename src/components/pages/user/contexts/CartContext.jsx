import React, { createContext, useState, useEffect } from 'react'
import _ from 'lodash'

import { useDispatch, useSelector } from "react-redux";

//create context
export const CartContext = createContext()


const CartProvider = ({ children }) => {
  const { cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  //cart start
  const [carts, setCarts] = useState([]);
  // item amount state
  const [itemAmount, setItemAmount] = useState(0)
  // total price state
  const [total, setTotal] = useState(0);


  useEffect(() => {
    const total = cart.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price * currentItem.count;
    }, 0);
    setTotal(total);
  }, [cart, setTotal]);

  // update item amount
  useEffect(() => {
    if (cart) {
      const count = cart.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.count;
      }, 0);
      setItemAmount(count);
    }
  }, []);

  //add to cart
  const addToCart = (product, _id) => {
    let cart = []
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'))
    }
    cart.push({
      ...product,
      count: 1
    })

    let unique = _.uniqWith(cart, _.isEqual)
    localStorage.setItem("cart", JSON.stringify(unique))
    dispatch({
      type: "ADD_TO_CART",
      payload: unique
    })

  }

  //remove from cart
  const removeFromCart = (_id) => {
    let newCart = []; // make a copy of the cart array
    if (localStorage.getItem('cart')) {
      newCart = JSON.parse(localStorage.getItem('cart'))
    }
    newCart.map((product, i) => {
      if (product._id == _id) {
        newCart.splice(i, 1)
      }
    })
    localStorage.setItem("cart", JSON.stringify(newCart)); // update the local storage
    dispatch({ // update the store's state
      type: "ADD_TO_CART",
      payload: newCart,
    });
  };
  // clear cart
  // const clearCart = () => {

  //   dispatch({ type: "CLEAR_CART" });
  // };

  // increase amount
  // const increaseAmount = (_id) => {
  //   const cartItem = carts.find((item) => item._id === _id);
  //   addToCart(cartItem, _id)
  // };

  // // decrease amount
  // const decreaseAmount = (_id) => {
  //   const cartItem = carts.find((item) => {
  //     return item._id === _id;
  //   });
  //   if (cartItem) {
  //     const newCart = carts.map((item) => {
  //       if (item._id === _id) {
  //         return { ...item, amount: cartItem.amount - 1 };
  //       } else {
  //         return item;
  //       }
  //     });
  //     setCarts(newCart);
  //   }

  //   if (cartItem.amount < 2) {
  //     removeFromCart(_id);
  //   }
  // };

  return (
    <CartContext.Provider
      value={{
        carts,
        addToCart,
        removeFromCart,
        // clearCart,
        // increaseAmount,
        // decreaseAmount,
        itemAmount,
        total

      }}
    >
      {children}
    </CartContext.Provider>
  );
};


export default CartProvider;
