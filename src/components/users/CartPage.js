import React from 'react'
import '../styles/user.css'
import styled from 'styled-components'
import { Outlet } from 'react-router-dom'
import { FcApproval } from 'react-icons/fc'



const Header = styled.div`
overflow : hidden;
position : sticky;
top : 0;
z-index: 1;
background-color : white;
height : 70px;
display : flex;
justify-content : space-between;
padding : 11px 20px;
`


const HeaderLeft = styled.div`
flex : 1.3;
height : 60px;
width : 100%;
display : flex;
align-items : center;

`
const HeaderCenter = styled.div`
flex : 1;
height : 60px;
width : 100%;
display : flex;
align-items : center;`
const Items = styled.div`
vertical-align : middle;
cursor : pointer;
font-size : 16px; 
color : gray;
margin-left : 6px;
margin-right :6px;
`
const HeaderRight = styled.div`
flex : 1;
display : flex;
align-items : center;
justify-content : flex-end;
`
const Secure = styled.div`
font-size : 16px;
margin-right : 40px;
line-height: 16px;
color : gray;
`

 const Logo = styled.h2`
 font-family: Snell Roundhand,Comic Sans MS, Comic Sans, bold , sans-serif;
font-weight : 700;
margin-left: 40px;
color: #FA7070;`

const CartPage = () => {
  return (
    <>
    <div className='h-line'>

    <Header>
      <HeaderLeft>
      <Logo>ECOM</Logo>
      </HeaderLeft>
      <HeaderCenter>
        <Items>Bag </Items>
        <div className='divider'/>
        <Items>Address </Items>
        <div  className='divider'/>
        <Items>Payment</Items>
      </HeaderCenter>
      <HeaderRight>
        <Secure><FcApproval size={22}/>&nbsp; 100% SECURE </Secure>
      </HeaderRight>
      </Header>
    </div>
    <Outlet/>
    </>
  )
}

export default CartPage
