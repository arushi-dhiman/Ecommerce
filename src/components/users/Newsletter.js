import { Send } from '@mui/icons-material'
import { styled } from 'styled-components'

const Container = styled.div`
height : 60vh;
background-color : #fcf5f5;
display : flex;
align-items : center;
justify-content :center;
flex-direction : column;
`
const Title = styled.h1`
font-size : 50px;
margin-bottom : 15px;
`
const Desc = styled.div`
font-size : 20px;
font-weight : 300;
margin-bottom : 15px`
const InputContainer = styled.div`
width : 50%;
height : 40px;
background-color : white;
display : flex;
justify-content : space-between;
border : 1px solid lightgray;`

const Input = styled.input`
border : none;
flex : 8;
padding-left : 20px;`

const Buttons = styled.button`
flex : 1;
border : none;
background-color: teal;
color : white;
`



const Newsletter = () => {
  return (
    <Container>
        <Title>Newsletter</Title>
        <Desc>Get timely updates from your favorite products!   </Desc>
        <InputContainer>
        <Input placeholder='Your Email'/>
        <Buttons><Send/></Buttons>
        </InputContainer>
      
    </Container>
  )
}

export default Newsletter
