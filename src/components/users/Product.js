import React from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import ProductService from '../../Services/ProductService'
import { useState } from 'react'
import Slider from 'react-slick'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'

const Container = styled.div`
margin : 0px 20px 50px 20px;
padding : 10px;
`
const ProductContainer = styled.div`

width : 370px;
height : 320px;
position: relative;
cursor : pointer;
padding : 0 10px ;
&:hover {
  transform : scale(1.07);
  transition :all 1.5s ease;
};
`

const Info = styled.div`
// background-color : #FA7070;
background-color : rgb(248, 231, 250);

position : absolute;
padding : 10px 20px 5px 20px;
width : 74%;

margin: 5px 13%;
bottom: 0;
left : 0;
display : flex;
align-items: center;
justify-content : center;
flex-direction : column;
border-radius : 3px;
opacity : 0.9;`

const Image = styled.img`
height : 100%;
width : 100%;`

const Heading = styled.div`
margin-top : 60px;
height : 90px;
`

const ImageHeader = styled.img`
height : 100%;
width : 100%;

&:hover{
  transform : scale(1.03);
  transition: all 1.5s ease;
}
`
const Product = () => {
  const Image2 = '/assets/Images/Image2.avif'
  const Image4 = '/assets/Images/Image4.avif'



    const[products, setProducts] = useState([])
    useEffect(()=>{
        ProductService.GetProducts().then((res)=>{setProducts(res.data.products) 
        console.log(res.data.products)})

    },[])
    const sliderSettings = {
        dots : true,
        speed : 800,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: false,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
        
      }

      const navigate = useNavigate()
      const showItems =(id)=>{
        debugger
        navigate(`displayitems/productid=${id}`)
      }
  return (
    <>
    <Heading><ImageHeader src={Image4}/></Heading>
    <Container >
      <Slider  {...sliderSettings}>
        {products.map((prod, index) => (
          <ProductContainer key={index} onClick={()=> showItems(prod.id)}>
            <Image alt={prod.productName}  src={prod.productImage} />
            <Info>
            <h3 style={{color : 'black', fontWeight : 600}}>{prod.productName}</h3>
            <p style={{color : 'black', fontSize : '16px'}}>{prod.productDescription}</p>
            </Info>
          </ProductContainer>
        ))}
      </Slider>
    </Container>
    </>
  )
}

export default Product
