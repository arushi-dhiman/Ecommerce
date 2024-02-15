import React from 'react'
import { styled } from 'styled-components'

const CategoryContainer = styled.div`
flex :1;
margin : 3px;
height : 38vh;
`

const Image = styled.img`
width : 100%;
height : 100%;
object-fit: cover;`

const Info = styled.div`
position : absolute;
width: 100%;
height : 100%;
top: 0
`

const Title = styled.h3`
text-align : center;
`
const Buttons = styled.button`
border : none;
padding :10px;
background-color : white;
color: gray;
cursor : pointer;
`

const CategoryItem = ({item}) => {
  return (
    <CategoryContainer>
            <Image src ={item.categoryImage}/>
            <Info>
                <Title>{item.categoryName}</Title>
                <Buttons>SHOP NOW</Buttons>
            </Info>
        </CategoryContainer>
        
  )
}

export default CategoryItem
