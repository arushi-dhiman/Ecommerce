import React from 'react'
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'
import CartService from '../../Services/CartService';
import '../styles/user.css'
import { styled } from 'styled-components';
import { PiKeyReturn } from "react-icons/pi";
import { HiMiniPlus, HiMiniMinus } from "react-icons/hi2";
import { useContext } from 'react';
import { CartContext } from './Home';
import { Button } from 'react-bootstrap';



const Container = styled.div`
width : 590px;
height : 180px;
position: relative;
border-radius : 4px;
border: 1px solid #eaeaec;
padding: 12px;
background: #fff;
font-size: 14px;
display : flex;
margin : 0px 20px 20px 30px 
`
const Left = styled.div`
flex : 0.7;

`
const Image = styled.img`
height : 100%;
width : 100%;
object-fit: cover;`

const Right = styled.div`
flex: 2;
`
const Info = styled.div`
padding : 4px 10px`
const Title = styled.div`
font-size : 15px;
font-weight : 700;
text-transform : uppercase;`
const Desc = styled.div``
const Buttons = styled.button`
border : none;
position : absolute;
bottom : 0;
margin-bottom : 11px;
&:hover{
  background-color: #e9f5f9;
  transform : scale(1.02);
}  `

const Quantity = styled.div`
margin : 1px 6px; 
background: #f5f5f6;
padding: 4px 7px;


`
const Himini = styled.div`
cursor: pointer;

`
const QtyContainer = styled.div`
    margin-top : 10px;
    display : inline-flex;
    white-space: nowrap;
    color: #282c3f;
    font-weight: 700;
    border-radius: 2px;
    line-height: 16px;
    border : none;
`
const Cart = () => {
  const cartItem = useContext(CartContext)
  console.log(cartItem)

  const navigate = useNavigate()
  const data = useParams()
  console.log(data)
  const userId = data.id?.split('=')[1];
  const catId = data.categoryId?.split('=')[1];
  const productId = data.productid?.split('=')[1];
  const name = data?.name

  const subtractItem = (id) => {
    debugger
    let updateCart = cartItem.cartItems.map((curEl) => {
      if (curEl.id === id) {
        if (curEl.quantity > 1) {
          const data = {
            'id': curEl.id,
            'userId': curEl.userId,
            'productId': curEl.productId,
            'itemId': curEl.itemId,
            'quantity': curEl.quantity - 1,
            'price': curEl.price,
            'discountPrice': curEl.discountPrice,
          }
          CartService.UpdateQuantity(id, data).then((res) => cartItem.GetCartItemsByUserId())

        }
        else {
          removeItemFromCart(id)
        }
      }
    })

  }
  const addItem = (id) => {
    debugger
    let updateCart = cartItem.cartItems.map((curEl) => {
      if (curEl.id === id) {
        const data = {
          'id': curEl.id,
          'userId': curEl.userId,
          'productId': curEl.productId,
          'itemId': curEl.itemId,
          'quantity': curEl.quantity + 1,
          'price': curEl.price,
          'discountPrice': curEl.discountPrice,
        }
        CartService.UpdateQuantity(id, data).then((res) => cartItem.GetCartItemsByUserId())

      }
    })
  }


  const removeItemFromCart = (id) => {
    debugger
    CartService.RemoveFromCart(id).then((res) => { cartItem.GetCartItemsByUserId() })

  }
  useEffect(() => {
    cartItem.GetCartItemsByUserId()
  }, [])

  const handleCheckOut=(checkOutCart)=>{
    debugger
    console.log(checkOutCart)
      navigate(`checkout`)
   }

  const EmptyBag = '/Assets/Images/EmptyBag.jpg'
  const ShopBags = '/Assets/Images/ShopBags.jpg'
  return (
      <>

      {Object.keys(data).length !== 0 ? cartItem.cartItems && cartItem.cartItems.length > 0 ? cartItem.cartItems.map((item, id) =>

        <Container key={id}>
          <Left>
            <Image src={item.itemImage}>

            </Image>
          </Left>
          <Right>
            <Info>
              <Title>{item.itemName}</Title>
              <Desc>₹ {item.price}</Desc>
              <Desc>Discount Price : ₹ {item.discountPrice}</Desc>

              <QtyContainer>
                <Himini onClick={() => subtractItem(item.id, item.quantity)}><HiMiniMinus size={18} /></Himini>
                <Quantity>Qty:{item.quantity}</Quantity>
                <Himini onClick={() => addItem(item.id, item.quantity)}><HiMiniPlus size={18} /></Himini>
              </QtyContainer>
              <div style={{ fontSize: '12px', marginTop: '5px' }}><PiKeyReturn size={18} /> &nbsp; <b>14 days</b> return available</div>
              <Buttons onClick={() => removeItemFromCart(item.id)}>Remove from cart</Buttons>

            </Info>
          </Right>
      
        </Container>


      )
  
        : <div className='empty-cart'>
          <img style={{ width: '20%' }} src={EmptyBag} />
          <h5>Hey,it feels so light!</h5>
          <p>There is nothing in your bag. </p>
          <p style={{ color: '#FA7070', fontSize: '14px' }}>PICK UP WHERE YOU LEFT OFF</p>
        </div>

        : <div className='login-cart'>
          <img style={{ width: '20%' }} src={ShopBags} />
          <h5><Link style={{ textDecoration: 'none', color: '#FA7070' }} to='/login'>SIGN IN &nbsp;</Link>to add items in your bag!</h5>
        </div>}
        {/* <div className='v-line'/> */}
        {cartItem.cartItems && cartItem.cartItems.length > 0 ? <>
        <div  style={{ margin : '15px 15px 6px 29px'}}>SubTotal Price : ₹ {cartItem.totalPrice}</div>
        <div  style={{ margin : '15px 15px 6px 29px'}}>Discount Price : ₹ {cartItem.totalDiscountPrice}</div>
        <Button variant='primary' style={{width : '39%', margin : '15px 15px 6px 25px'}} onClick={()=>handleCheckOut(cartItem.cartItems)}>Checkout</Button>
        </>
:""        }
    </>

  )

}

export default Cart
