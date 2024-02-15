import React from 'react'

import { Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CartService from '../../Services/CartService';
import { createContext } from 'react';

export const CartContext = createContext();

const Home = () => {
  const data = useParams()
  const userId = data.id?.split('=')[1];
  const [cartItems, setCartItems] = useState([])

  const GetCartItemsByUserId = () => {
    CartService.GetCartItemsByUserId(userId)
      .then((res) => {
        console.log(res.data)
        setCartItems(res.data)
      }).catch((error) => {
        console.log(error)
      })
  }
  useEffect(() => {
    GetCartItemsByUserId()
  }, [])


  var totalPrice =0
  var totalDiscountPrice = 0
  var cartData = cartItems.map((sum)=>{
    debugger
    totalPrice += sum.price
    totalDiscountPrice +=  sum.discountPrice
  }
  )
  const providerValue = {
    cartItems,
    GetCartItemsByUserId,
    totalPrice,
    totalDiscountPrice
  }
  return (
    <div style={{ overflowY: 'hidden' }}>
      <CartContext.Provider value={providerValue}>
        <Outlet />
      </CartContext.Provider>

    </div>
  )
}

export default Home
