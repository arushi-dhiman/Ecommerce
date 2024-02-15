import React, {useState, useEffect} from 'react'
import ItemModal from './ItemModal'
import ItemList from './ItemList'
import '../styles/adminDashboard.css'
import AdminSearch from './AdminSearch'
import { ToastContainer } from 'react-toastify'
import { Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import ItemService from '../../Services/ItemService'
import ProductService from '../../Services/ProductService'
import Pagination from '../Pagination'

const Items = () => {
  const data = useParams()
  const productId = data?.productid?.split('=')[1];
  console.log(productId)


  const [showModal, setShowModal] = useState(false)
  const openModal = () => {
    setShowModal(true)
  }
  const closeModal = () => {
    setShowModal(false)
  }
  
  const [specificItems, setSpecificItems] = useState([])
  const [pageIndex, setPageIndex] = useState()
  const [numOfPages, setNumOfPages] = useState()
  const [total, setTotal] = useState(0)
  const [currentItems, setCurrentItems] = useState()
  const [searchItem, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])

  const GetSpecificItems = (currentPage) => {
    debugger
    // const id = state.state?.catId
    const id = productId
    if (id != null) {
      ItemService.GetAllItemsById(currentPage, id).then((res) =>{
        console.log(res)
        setTotal(res.data.paginationDetails.pageCount)
        setPageIndex(res.data.paginationDetails.pageIndex)
        setNumOfPages(res.data.paginationDetails.totalPages)
        setCurrentItems(res.data.items.length)
        setSpecificItems(res.data.items)
      })
      .catch((error) => {
        console.log(error)
      })
    }
    else {
      ItemService.GetAllItems(currentPage).then((res) =>{
        console.log(res)

          setTotal(res.data.paginationDetails.pageCount)
          setPageIndex(res.data.paginationDetails.pageIndex)
          setNumOfPages(res.data.paginationDetails.totalPages)
          setCurrentItems(res.data.items.length)
          setSpecificItems(res.data.items)
    }).catch((error) => {
          console.log(error)
        })
      }
  }

  const SaveItems = (formData) => 
  {
    debugger
    ItemService.CreateItem(formData).then((res) => GetSpecificItems(pageIndex))
  }

  const UpdateItems = (id, formData) => 
  {
    debugger
    ItemService.UpdateItem(formData, id).then((res) => GetSpecificItems(pageIndex))
  }

  const DeleteItems = (id) => 
  {
    ItemService.DeleteItem(id).then((res)=> GetSpecificItems(pageIndex))
  }


  const searchItems = (searchTerm) => {
    debugger  
    setSearchTerm(searchTerm)
      if(productId == null){
        ItemService.SearchItem(searchTerm).then((result) => {
        setSearchResults(result.data.items)
        setTotal(result.data.paginationDetails.pageCount)
        setPageIndex(result.data.paginationDetails.pageIndex)
        setNumOfPages(result.data.paginationDetails.totalPages)
        setCurrentItems(result.data.items.length)
      }) 
    }else{
      ItemService.SearchItemById(searchTerm, productId)
      .then((result) => {
        setSearchResults(result.data.items)
        setTotal(result.data.paginationDetails.pageCount)
        setPageIndex(result.data.paginationDetails.pageIndex)
        setNumOfPages(result.data.paginationDetails.totalPages)
        setCurrentItems(result.data.items.length)
      }) 
    }
  }

  useEffect(() => {
    GetSpecificItems()
  }, [])

  const searchData = searchItem.length < 1  ? specificItems : searchResults

  return (
    <div>
 <ToastContainer />
      <div className='me-4'>
        <Row >
          <Col className='col-3'>
            <button onClick={openModal} className="btn text-warning btn-act add-category" style={{ display: 'flex', justifyContent: 'center', fontSize: "20px" }} ><i className="material-icons" style={{ fontSize: "27px" }}>library_add &nbsp;</i><b>Add new Items</b></button>
          </Col >
          <Col className='col-9'>
          <AdminSearch term={searchItem} searchUser={searchItems} />

          </Col>
          {/* <Col className='col-2'>
            <Form.Select name='prodCategory' onChange={(e) => GetDropdownProducts(e.target.value)}>
              <option style={{paddingBottom:'10px'}} value="">All Products</option>

              {selectCategory.map((data) => (
                <option className='mb-1'key={data.id} value={data.id}>{data.categoryName}</option>
              ))}

            </Form.Select> 
             <Select
              onChange={(item) => handleOptionChange(item)}
              options={selectCategory.map((item) => {
                return {
                  label: item.categoryName,
                  value: item.categoryName,
                  key: item.id
                };
              })}
            />
          </Col> */}
        </Row>

        {showModal && <ItemModal openModal={openModal} closeModal={closeModal}  buttonState="Save" header="Add Item" modalData='' saveDetails={SaveItems}/>}
      </div>
      <ItemList itemList={searchData}  UpdateDetails={UpdateItems} deleteCard={DeleteItems}/>
      <Pagination paginatedData={GetSpecificItems} totalRecords={total} totalNumOfPages={numOfPages} currentProducts={currentItems} />

    </div>
  )
}

export default Items
