import React, {useState} from 'react'
import { useParams } from 'react-router-dom'
import { styled } from 'styled-components'
import ItemService from '../../Services/ItemService'
import { OverlayTrigger } from 'react-bootstrap'
import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material'
import Pagination from '../Pagination'
import { useContext } from 'react'
import { CartContext } from './Home'
import { ToastContainer, toast } from 'react-toastify'
import { Tooltip } from 'react-bootstrap'
import CartService from '../../Services/CartService'
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
 background-color: rgb(0,0,0,0.2);
display: flex;
align-items : center;
justify-content: center;
transition : all 0.5s ease;

`

const ProductContainer = styled.div`
margin : 15px;
margin-bottom : 70px;
width : 330px;
height : 370px;
position: relative;
cursor : pointer;
background-color : #f5fbfd;
&:hover ${Info}{
  opacity : 1;
}
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
height : 80%;
margin: 22px;
width : 90%;
object-fit : cover;

`

const Title = styled.h3`
margin-bottom : 20px;
font-weight : 700;
font-size: 22px;
 margin: 30px 0 2px 0;
 text-align : center;
`
const Desc = styled.h6`
text-align : center;
font-size : 15px`
const Icon = styled.div`
width : 40px;
height : 40px;
border-radius : 50%;
background-color: white;
display : flex;
align-items : center;
justify-content: center;
margin : 10px;
transition : all 0.5s ease;

&:hover{
  background-color: #e9f5f5;
  transform : scale(1.1);
}`

const UserPanelItems = () => {
  const cartData = useContext(CartContext)
  console.log(cartData.cartItems)

  const data = useParams()
  console.log(data)

  const userId = data.id?.split('=')[1];
  const productId = data.productId?.split('=')[1];

  const [items, setItems] = useState([])
  const [pageIndex, setPageIndex] = useState()
  const [numOfPages, setNumOfPages] = useState()
  const [total, setTotal] = useState(0)
  const [currentItems, setCurrentItems] = useState()

  const GetSpecificItems = (currentPage) => {
    debugger

    const id = productId
    ItemService.GetAllItemsById(currentPage, id).then((res) => {
      setTotal(res.data.paginationDetails.pageCount)
      setPageIndex(res.data.paginationDetails.pageIndex)
      setNumOfPages(res.data.paginationDetails.totalPages)
      setCurrentItems(res.data.items.length)
      setItems(res.data.items)
    })
      .catch((error) => {
        console.log(error)
      })
  }
  const AddToCart =(item)=>{
    debugger
    const itemExist = cartData.cartItems.find((itemData)=> itemData.itemId === item.id);
    const discountPrice = item.price -item.price*item.discount/100

    if(itemExist){
      const updateCartItem = {
        'id' : itemExist.id,
        'userId' : itemExist.userId,
        'productId' : itemExist.productId,
        'itemId' : item.id,
        'price' : item.price,
        'discountPrice' : discountPrice, 
        'quantity' : itemExist.quantity +1
      }
       data?.id !== undefined ?
      CartService.UpdateQuantity(itemExist.id, updateCartItem).then((res)=>{cartData.GetCartItemsByUserId()})
      : toast.warn('Please login first!')
    }
    else{
      console.log(discountPrice)
    const cartItem = {
      'userId' : userId,
      'productId' : productId,
      'itemId' : item.id,
        'price' : item.price,
        'discountPrice' : discountPrice,
    }
    data?.id !== undefined ?
    CartService.AddItemsToCart(cartItem).then((res)=>{cartData.GetCartItemsByUserId()})
    : toast.warn('Please login first!')

  }
}
  return (
    <>
    <ToastContainer/>
    <Navbar/>

      <Container >
        {items.map((pItem) => (

          <ProductContainer>
            <Circle>
              <Image src={pItem.itemImage} />
            <Info>
            <OverlayTrigger
									overlay={
										<Tooltip id={`tooltip-top`}>
											Add to cart
										</Tooltip>
									}>
              <Icon ><ShoppingCartOutlined onClick={()=>AddToCart(pItem)}/></Icon>
								</OverlayTrigger>
                <OverlayTrigger
									overlay={
										<Tooltip id={`tooltip-top`}>
											Search
										</Tooltip>
									}>
              <Icon><SearchOutlined /></Icon>
								</OverlayTrigger>
                <OverlayTrigger
									overlay={
										<Tooltip id={`tooltip-top`}>
											Wishlist
										</Tooltip>
									}>
              <Icon><FavoriteBorderOutlined /></Icon>
								</OverlayTrigger>
            </Info>
            </Circle>
            <Title>
              {pItem.itemDescription}
            </Title>
            <Desc>
              ₹ {pItem.price}
            </Desc>
            <Desc>
              Discount {pItem.discount}%
            </Desc>
          </ProductContainer>


        ))}

      </Container>
      <Pagination paginatedData={GetSpecificItems} totalRecords={total} totalNumOfPages={numOfPages} currentProducts={currentItems} />
      </>
  )
}


export default UserPanelItems
