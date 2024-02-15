import { ArrowLeftOutlined, ArrowRightOutlined } from '@mui/icons-material'
import React from 'react'
import { styled } from 'styled-components'
import { SliderItems } from './data'
import { useState } from 'react'



const Arrow = styled.div`
    width: 50px;
    height: 50px;
    background-color: #fff7f7;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto; 
    left  : ${props => props.direction === "left" && "10px"};
    right  : ${props => props.direction === "right" && "10px"};
    cursor : pointer;
    opacity : 0.5;
		z-index : 2;
    `
const Wrapper = styled.div`
	height : 100%;
	display: flex;
	transform : translateX(${props => props.slideIndex * -100}vw);
	transition : all 1.5s ease`

const Slide = styled.div`
    display: flex;
    justify-content: center;
    width : 100vw;
    height: 100vh;
		background-color : ${props => props.bg}`

const ImgContainer = styled.div`
    flex : 2;

		padding : 10px 10px 10px 65px
    `
const Image = styled.img`
	height : 80%;
	width : 100%
    `
const InfoContainer = styled.div`
    flex : 1;
    padding : 100px 10px 100px 30px;
		`

const Title = styled.h1`
    font-size : 60px`

const Desc = styled.p`
    margin : 40px 0px;
    font-size : 20px;
    font-weight : 500;
    letter-spacing : 3px
    `
const Buttons = styled.button`
    padding : 10px;
    font-size : 20px;
    background-color : transparent;
    cursor : pointer`


const Slider = () => {
	const [slideIndex, setSlideIndex] = useState(0)
	const handleClick = (direction) => {
		if (direction === "left") {
			setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2)
		}
		else {
			setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0)
		}
	}

	return (
		<div className='sidebar-container'>
			<Arrow direction="left" onClick={() => handleClick("left")}><ArrowLeftOutlined /></Arrow>
			<Wrapper slideIndex={slideIndex}>
				{SliderItems.map((item) => (
					<Slide>
						<ImgContainer><Image src={item.img}></Image></ImgContainer>
						<InfoContainer>
							<Title>{item.title}</Title>
							<Desc>{item.desc}</Desc>
							<Buttons>SHOW NOW</Buttons>
						</InfoContainer>
					</Slide>

				))}

			</Wrapper>
			<Arrow direction="right" onClick={() => handleClick("right")}><ArrowRightOutlined /></Arrow>
		</div>
	)
}

export default Slider
