import React from 'react'
import { useState } from 'react'
import ProductService from '../../Services/ProductService'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Pagination from '../Pagination'
import { styled } from 'styled-components'
import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material'
import {  OverlayTrigger, Tooltip } from 'react-bootstrap'
import CartService from '../../Services/CartService'
import { useContext } from 'react'
import { CartContext } from './Home'
import { ToastContainer, toast } from 'react-toastify'
import Navbar from './Navbar'


const Container = styled.div`
padding : 20px;
display : flex;
flex-wrap : wrap;
justify-content : center
`

const Info = styled.div`
opacity : 0;
width : 100%;
height : 100%;
position : absolute;
top : 0;
bottom : 0;
display: flex;
align-items : center;
justify-content: center;
transition : all 0.5s ease;


`

const ProductContainer = styled.div`
margin : 15px;
margin-bottom : 70px;
width : 330px;
height : 350px;
position: relative;
cursor : pointer;
background-color : #f5fbfd;

&:hover {
  transform : scale(1.06);
  transition :all 0.6s ease;
};
&:hover ${Info}{
transform : scale(1.08);
opacity : 1;}
`
const Circle = styled.div`
margin : 5px;
width: 280px;
margin: 0 auto;

height : 245px;
border-radius : 50%;
background-color : white;
display: flex;
justify-content: center;


`

const Image = styled.img`
height : 66%;
margin: 22px;
width : 87.5%;

`

const Title = styled.h3`
margin-bottom : 20px;
font-weight : 500;
font-size: 30px;
 margin: 0px 0 2px 0;
 text-align : center;
`
const Desc = styled.h6`
text-align : center;
font-size : 15px`

const Text = styled.div`
background-color: white;
padding: 9px;
transition : all 0.5s ease;
font-size : 15px;
font-weight: 600;
opacity : 0.8;
&:hover{
  font-weight: 700;
}
`

const ProductDisplay = () => {

  const cartContext = useContext(CartContext)

  const data = useParams()
  console.log(data)

  const userId = data.id?.split('=')[1];
  const catId = data.categoryId?.split('=')[1];
  const productId = data.productId?.split('=')[1];


  const [products, setProducts] = useState([])
  const [pageIndex, setPageIndex] = useState()
  const [numOfPages, setNumOfPages] = useState()
  const [total, setTotal] = useState(0)
  const [currentProducts, setCurrentProducts] = useState()

  const GetSpecificProducts = (currentPage) => {
    debugger

    const id = catId
    ProductService.GetAllProductById(currentPage, id).then((res) => {
      setTotal(res.data.paginationDetails.pageCount)
      setPageIndex(res.data.paginationDetails.pageIndex)
      setNumOfPages(res.data.paginationDetails.totalPages)
      setCurrentProducts(res.data.products.length)
      setProducts(res.data.products)
    })
      .catch((error) => {
        console.log(error)
      })
  }

//   const AddToCart =(product)=>{
//     debugger
//     const productExist = cartContext.cartItems.find((item)=> item.productId === product.id);
//     if(productExist){
//       const updateCartItem = {
//         'id' : productExist.id,
//         'userId' : productExist.userId,
//         'categoryId' : productExist.categoryId,
//         'productId' : product.id,
//         'quantity' : productExist.quantity +1
//       }
//        data?.id !== undefined ?
//       CartService.UpdateQuantity(productExist.id, updateCartItem).then((res)=>{cartContext.GetCartItemsByUserId()})
//       : toast.warn('Please login first!')
//     }
//     else{
//     const cartItem = {
//       'userId' : userId,
//       'categoryId' : catId,
//       'productId' : product.id
//     }
//     data?.id !== undefined ?
//     CartService.AddItemsToCart(cartItem).then((res)=>{cartContext.GetCartItemsByUserId()})
//     : toast.warn('Please login first!')

//   }
// }

  return (
    <>
    <ToastContainer/>
    <Navbar/>

      <Container >
        {products.map((pItem) => (

          <ProductContainer>
              <Image src={pItem.productImage} />
            <Info><Text> <Link style={{textDecoration : 'none', color: '#FA7070'}} to={`displayitems/productId=${pItem.id}`}>View Items</Link></Text>
               

            </Info>

            <Title>
              {pItem.productName}
            </Title>
            <Desc>
              {pItem.productDescription}
            </Desc>
          </ProductContainer>


        ))}

      </Container>
      <Pagination paginatedData={GetSpecificProducts} totalRecords={total} totalNumOfPages={numOfPages} currentProducts={currentProducts} />

    </>
  )
}

export default ProductDisplay
