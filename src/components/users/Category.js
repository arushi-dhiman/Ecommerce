import React from 'react'
import { useState } from 'react'
import CategoryService from '../../Services/CategoryService'
import { useEffect } from 'react'
import styled, {css} from 'styled-components'
import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
display : flex;
padding : 0 20px 0 20px;
justify-content : space-around;


`

const CategoryContainer = styled.div`
height : 45vh;
width : 115%;
position : relative;
cursor : pointer;
&:hover{
  transform : scale(1.05);
  transition: all 1.5s ease;
}
`

const Image = styled.img`
width : 100%;
height : 100%;
object-fit: cover;`

const Info = styled.div`
// background-color : #FA7070;
background-color : #f5fbfd;

position : absolute;
padding : 5px 50px 5px 50px;
width : 75%;

margin: 5px 13%;
bottom: 0;
left : 0;
display : flex;
align-items: center;
justify-content : center;
flex-direction : column;
border-radius : 3px;
opacity : 0.9;`

const Title = styled.h3`
color : black;
margin-bottom : 20px;
font-weight : 500;
 margin: 4px 0 2px 0;
`
const Buttons = styled.h3`
border : none;
padding :7px;
color: black;
cursor : pointer;
font-size: 16px;
margin: 4px 0 4px 0;

`
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
const Category = () => {
  const Image1 = '/assets/Images/Image1.avif'
  const Image2 = '/assets/Images/Image2.avif'

    const[category, setCategory] = useState([])
    const GetCategories =()=>{
        CategoryService.GetAllCategory().then((res)=> setCategory(res.data))
    }
    const navigate = useNavigate()
    const showProducts =(id)=>{
      debugger
      navigate(`displayproducts/categoryid=${id.toString()}`)
    }
    useEffect(()=>{
        GetCategories()
    },[])
  return (
    <>
    <Heading><ImageHeader src={Image1}/></Heading>
    <Container className='row row-cols-1 row-cols-md-2 row-cols-lg-5'>
      {category.map((item)=>(
        <Row className='mt-2'>
            <Col>
             <CategoryContainer onClick={()=>showProducts(item.id)}>
            <Image src ={item.categoryImage}/>
            <Info>
                <Title>{item.categoryName}</Title>
                <Buttons shouldHover>SHOP NOW</Buttons>
            </Info>
        </CategoryContainer>
        </Col>
        </Row>
       
        
      ))}
    </Container>
    </>
  )
}

export default Category
