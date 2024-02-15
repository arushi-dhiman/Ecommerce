import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import '../../styles/paymentForm.css'
import { CartContext } from '../Home'
import styled from 'styled-components'


const CARD_OPTIONS = {

    iconStyle : "solid",
    style : {
        base:{
            iconColor : '#c4f0ff',
            color: '#fff',
            fontWeight :500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }

        },
        invalid :{
            iconColor :'#ffc7ee',
            color : '#ffc7ee'

        }
    }
}

const MainContainer = styled.div
`
padding : 4px 250px;
display : flex;
justify-content : space-between;
`

const MainLeft = styled.div`
flex : 0.3;

`
const MainRight = styled.div`
flex : 1;
`

const Container = styled.div`
width : 280px;
height : 130px;
position: relative;
border-radius : 1px;
border: 1px solid #eaeaec;
padding: 14px 5px;
background: #fff;
font-size: 12px;
display : flex;
margin : 0px 20px 0px 20px 
`
const Left = styled.div`
flex : 1;

`
const Image = styled.img`
height : 100%;
width : 70%;
object-fit: cover;`

const Right = styled.div`
flex: 1;
`
const Info = styled.div`
padding : 4px 10px`

const Title = styled.div`
font-size : 13px;
font-weight : 600;
`
const StripeTitle = styled.div`
font-size : 25px;
font-weight : 700;
text-transform : uppercase;
margin : 15px 0 20px 15px
`
const TotalPrice = styled.div`
font-size : 15px;
margin : 15px 0 20px 15px;
font-weight : 700;
`
const Desc = styled.div``

const PaymentForm = () => {
    const cartItem = useContext(CartContext)
    console.log(cartItem)
    const[success, setSuccess] = useState(false)
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit= async (e)=>{
        debugger
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type : "card",
            card : elements.getElement(CardElement)
        })

    
    if(!error){
        try{
            const {id} = paymentMethod
            const response = await axios.post(`https://localhost:7136/api/checkout?totalDiscountPrice=${cartItem.totalDiscountPrice}` ,cartItem.cartItems)
            console.log(response.data)

            if(response.data){
                console.log("Successful Payment")
                setSuccess(true)
            }
        }
        catch(error)
        {
            console.log("Error", error)
        }
    }
    else{
        console.log(error.message)
    }
}
  return (
    <>
    <MainContainer>
        <MainLeft>
{cartItem.cartItems.map((item, id) =>
    <Container key={id}>
  <Left>
    <Image src={item.itemImage}>

    </Image>
  </Left>
  <Right>
    <Info>
      <Title>{item.itemName}</Title>
    </Info>
  </Right>

</Container>
)
}
<TotalPrice> Bag Total : {cartItem.totalDiscountPrice}</TotalPrice>
</MainLeft>
    

    <MainRight>

    {!success ?
    <form  style={{margin: '10%'}}>
        <StripeTitle>Pay with Stripe</StripeTitle>

        <fieldset className='FormGroup'>
            <div className='FormRow'>
                <CardElement options = {CARD_OPTIONS}/>
            </div>
        </fieldset>
        <button className='checkout-btn' onClick={handleSubmit}>Pay</button>
    </form>
    : 
    <div>
        <h2>You just bought your products</h2>
    </div>
}
    </MainRight>
    </MainContainer>
  </>
  )
}
    


export default PaymentForm
