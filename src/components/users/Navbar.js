import { PersonSharp, Search, ShoppingCartOutlined } from '@mui/icons-material'
import React from 'react'
import { styled } from 'styled-components'
import { Badge  } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../styles/user.css'
import { useContext } from 'react';
import { CartContext } from './Home';
import { useAuth } from '../../utils/Auth';



const Navbar = () => {
  const cartContext = useContext(CartContext)
  console.log(cartContext.cartItems.length)
  var quantity = 0
  var cartData = cartContext.cartItems.map((c)=>{
    quantity += c.quantity  
  })
  

  const data = useParams()
  console.log(data.name)
  const name = data?.name
  const userId = data.id?.split('=')[1];

  const MainContainer = styled.div`
  height : 90px;
  box-shadow: 0 4px 12px 0 rgba(0,0,0,.07);
  margin-bottom : 40px;
  overflow : hidden;
  position : sticky;
top : 0;
z-index: 1;
background-color : white
  `
  const Container = styled.div
    `
  height : 60px;
   padding : 4px 20px;
  display : flex;
  justify-content : space-between;
  `

  const Left = styled.div`
  flex : 1.8;
  height : 60px;
  width : 100%;
  display : flex;
  align-items : center;

`
  const Center = styled.div`flex : 1.2;
  display : flex;
  align-items : center;
  height : 100%
  `
  const Right = styled.div`
  flex : 0.5;
  display : flex;
  align-items : center;
  justify-content : flex-end;
  `

  const SearchContainer = styled.div`
  padding : 5px;
  border-radius : 4px;
  display : flex;
  justify-content : center;
  width : 100%;
  height : 80%;
  background: #f5f5f6;
  padding : 12px
`
  const Input = styled.input`
border: none; 
 width : 100%;
background: #f5f5f6;
font-size: 14px
`

  const Logo = styled.h2`
font-family: Snell Roundhand,Comic Sans MS, Comic Sans, bold , sans-serif;
font-weight : 700;
margin-left: 25px;
color: #FA7070;
`
  const Items = styled.div`
font-weight : 700;
margin-left : 40px;
vertical-align : middle;
cursor : pointer;
font-size : 15px; 
color : black;
&:hover{
  transform : scale(1.08);
  border-bottom : 3px solid #FA7070;
  line-height:3em;


} 

    `
  const MenuItem = styled.div`
  font-size : 14px; 
  cursor : pointer;
  margin-left: 25px`

  const Info = styled.p`
  font-size : 12px;
  margin-left : 15px;
  cursor : pointer;

    `

const NameContainer = styled.div`
  height : ${!data?.name ? '10px' : '30px'};
  padding:  22px 20px 0px 20px;
  display : flex;
  align-items: center;
justify-content : flex-end;
visibility : ${!data?.name ? 'hidden' : 'visible'}

 
`

  // const catId =data.categoryId?.split('=')[1];
  // const [pageIndex, setPageIndex] = useState()
  // const [numOfPages, setNumOfPages] = useState()
  // const [total, setTotal] = useState(0)
  // const [currentProducts, setCurrentProducts] = useState()

  // const[searchTerm, setSearchTerm] = useState('')
  // const[searchResult, setSearchResults] = useState([])
  //   const searchProducts = (event,searchTerm) =>{
  //     if(event.key === 'Enter'){
  //       if(!catId){
  //       ProductService.SearchProductById(searchTerm, catId).then((result)=>{
  //         console.log(result.data.products)

  //         setSearchResults(result.data.products)
  //         setTotal(result.data.paginationDetails.pageCount)
  //         setPageIndex(result.data.paginationDetails.pageIndex)
  //         setNumOfPages(result.data.paginationDetails.totalPages)
  //         setCurrentProducts(result.data.products.length)

  //       })
  //       }
  //       else{
  //         ProductService.SearchProduct(searchTerm).then((result) => {
  //           console.log(result.data.products)
  //           setSearchResults(result.data.products)
  //           setTotal(result.data.paginationDetails.pageCount)
  //           setPageIndex(result.data.paginationDetails.pageIndex)
  //           setNumOfPages(result.data.paginationDetails.totalPages)
  //           setCurrentProducts(result.data.products.length)
  //       })
  //       }
  //     }
  //   }
  const auth = useAuth()
const navigate = useNavigate()
  const logout=()=>{
    localStorage.removeItem("token-info")
    auth.logout()
    navigate('/login')
  }


  
  return (
    <MainContainer>
      <NameContainer> 
      <Info><Link className="link" to='/profile'><PersonSharp/> {data?.name}</Link></Info>
      <Info className="link" onClick={logout}>Sign Out</Info>
      </NameContainer>
      <Container>
        <Left>
          <Logo>ECOM</Logo>
          <Link style={{textDecoration: 'none'}} to={Object.keys(data).length !== 0 ? `/${data?.name}/id=${userId}` : '/'}><Items>HOME</Items></Link>
          <Items>MEN</Items>
          <Items>WOMEN</Items>
          <Items>KIDS</Items>
          <Items>BEAUTY</Items>
        </Left>
        <Center>
          <SearchContainer><Search style={{ color: "gray", fontSize: "18px", marginRight: "20px" }} /><Input placeholder='Search for products' /></SearchContainer>
        </Center>

        <Right>
          <MenuItem><Link className="link" to="/register">REGISTER</Link></MenuItem>
          <MenuItem><Link className="link" to="/login">SIGN IN</Link></MenuItem>
          <MenuItem>{
          <Badge  badgeContent={cartContext.cartItems.length === 0 ? '' : quantity} color= {cartContext.cartItems.length === 0 ? 'default':'primary'}><Link className="link" to={`/${name}/id=${userId}/cart/cartitems`}><ShoppingCartOutlined/></Link></Badge>}</MenuItem>

        </Right>
      </Container>
    </MainContainer>

  )
}

export default Navbar
