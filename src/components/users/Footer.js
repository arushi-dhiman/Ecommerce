import { Facebook, Instagram, Mail, Phone, Pinterest, Room, Twitter } from '@mui/icons-material'
import React from 'react'
import { styled } from 'styled-components'

const Container = styled.div`
display: flex;`

const Left = styled.div`
flex :1;
display : flex;
flex-direction : column;
padding : 20px; `

const Logo = styled.h1``
const Desc = styled.p`
margin: 20px 0px;`
const SocialContainer = styled.div`
display : flex;`
const SocialIcon = styled.div`
width: 40px;
height:40px;
border-radius : 50%;
color : white;
background-color: #${props => props.color};
display: flex;
align-items: center;
justify-content : center;
margin-right: 20px;
`

const Center = styled.div`
flex :1;
padding : 20px;` 

const Title = styled.h3`
margin-bottom : 30px;
`
const List = styled.ul`
margin : 0;
padding : 0;
list-style : none;
display : flex;
flex-wrap : wrap;

`
const ListItem = styled.li`
width : 50%;
margin-bottom : 10px;
`
const Right = styled.div`
flex :1;
padding : 20px;`

const ContactItem = styled.div`
margin-bottom : 15px;
display : flex;
align-items : center;


`

const Payment = styled.img`
height : 30%;
width : 80%;
`

const paymentImage = '/assets/Images/paymentLink.png'
const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>ECOM</Logo>
        <Desc>React.js eCommerce app UI design full course. React shopping app UI project for beginners. React eCommerce website design from scratch.</Desc>
        <SocialContainer>
            <SocialIcon color="3B5999">
                <Facebook/>
            </SocialIcon>
            <SocialIcon color="E4405F">
                <Instagram/>
            </SocialIcon>
             <SocialIcon color="55ACEE">
                <Twitter/>
            </SocialIcon>
             <SocialIcon color="E60023">
                <Pinterest/>
            </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
            <ListItem>Home</ListItem>
            <ListItem>Cart</ListItem>
            <ListItem>Man Fashion</ListItem>
            <ListItem>Woman Fashion</ListItem>
            <ListItem>Accessories</ListItem>
            <ListItem>My Account</ListItem>
            <ListItem>Order Tracking</ListItem>
            <ListItem>Wishlist</ListItem>
            <ListItem>Terms</ListItem>

        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
            <Room style={{marginRight : "10px"}}/> WEST BROADWAY. 2827 W Broadway Vancouver, BC ; Burnaby. 6791</ContactItem>
        <ContactItem>
            <Phone  style={{marginRight : "10px"}}/>+1 234 512928
        </ContactItem>
        <ContactItem>
            <Mail  style={{marginRight : "10px"}}/> contact@ecom.com
        </ContactItem>
        <Payment src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/payment-method_69e7ec.svg"/>
      </Right>
    </Container>
  )
}

export default Footer
