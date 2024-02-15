import React, { useEffect, useState } from 'react'
import '../styles/adminDashboard.css'
import ProductModal from './ProductModal'
import ProductList from './ProductList'
import { ToastContainer, toast } from 'react-toastify'
import { useLoaderData, useLocation, useParams } from 'react-router-dom'
import { Col, Form, Row } from 'react-bootstrap'
import AdminSearch from './AdminSearch'
import ProductService from '../../Services/ProductService'
import CategoryService from '../../Services/CategoryService'
import Pagination from '../Pagination'


const Products = () => {
  const state = useLocation();
  const  data  = useParams()
  const catId =data.categoryId?.split('=')[1];

  const [showModal, setShowModal] = useState(false)
  const [selectCategory, setSelectCategory] = useState([])
  const [specificProducts, setSpecificProducts] = useState([])
  const [pageIndex, setPageIndex] = useState()
  const [numOfPages, setNumOfPages] = useState()
  const [total, setTotal] = useState(0)
  const [currentProducts, setCurrentProducts] = useState()
  const [searchItem, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])

  const openModal = () => {
    setShowModal(true)
  }
  const closeModal = () => {
    setShowModal(false)
  }
  const GetSpecificProducts = (currentPage) => {
    debugger
    // const id = state.state?.catId
    const id = catId
    if (id != null) {
      ProductService.GetAllProductById(currentPage, id).then((res) =>{
        setTotal(res.data.paginationDetails.pageCount)
        setPageIndex(res.data.paginationDetails.pageIndex)
        setNumOfPages(res.data.paginationDetails.totalPages)
        setCurrentProducts(res.data.products.length)
        setSpecificProducts(res.data.products)
      })
      .catch((error) => {
        console.log(error)
      })
    }
    else {
      ProductService.GetAllProduct(currentPage).then((res) =>{
          setTotal(res.data.paginationDetails.pageCount)
          setPageIndex(res.data.paginationDetails.pageIndex)
          setNumOfPages(res.data.paginationDetails.totalPages)
          setCurrentProducts(res.data.products.length)
          setSpecificProducts(res.data.products)
    }).catch((error) => {
          console.log(error)
        })
      }
  }

  // const GetDropdownProducts = (catId) => {
  //   debugger
  //   const currentPage = pageIndex
  //   if (catId != "") {
  //     axios.get(`https://localhost:7136/api/Admin/GetProducts?CategoryId=${catId}`).then((res) => {
  //       setTotal(res.data.paginationDetails.pageCount)
  //       setPageIndex(res.data.paginationDetails.pageIndex)
  //       setNumOfPages(res.data.paginationDetails.totalPages)
  //       setCurrentProducts(res.data.products.length)
  //       setSpecificProducts(res.data.products)
  //     }).catch((error) => {
  //       console.log(error)
  //     })
  //   }
  //   else {
  //     axios.get(`https://localhost:7136/api/Admin/GetProducts`)
  //       .then((res) => {
  //         console.log(res)
  //         setTotal(res.data.paginationDetails.pageCount)
  //         setPageIndex(res.data.paginationDetails.pageIndex)
  //         setNumOfPages(res.data.paginationDetails.totalPages)
  //         setCurrentProducts(res.data.products.length)
  //         setSpecificProducts(res.data.products)
  //       }).catch((error) => {
  //         console.log(error)
  //       })
  //   }
  // }

  // const handleOptionChange = (e) => {
  //   debugger
  //   console.log(e.target.value)
  //   setCatId(e.t)
  //    GetDropdownProducts(e.target.value)
  // }
  const SaveProducts = (formData) => 
  {
    debugger
    ProductService.CreateProduct(formData).then((res) => GetSpecificProducts(pageIndex))
  }

  const updateProduct = (id, formData) => 
  {
    debugger
    ProductService.UpdateProduct(formData, id).then((res) => GetSpecificProducts(pageIndex))
  }

  const deleteProduct = (id) => 
  {
    ProductService.DeleteProduct(id).then((res)=> GetSpecificProducts(pageIndex))
  }

  const GetAllCategories = () => {
    CategoryService.GetAllCategory().then((res)=> setSelectCategory(res.data))
  }

  const searchUser = (searchTerm) => {
    debugger  
    setSearchTerm(searchTerm)
      if(catId == null){
        ProductService.SearchProduct(searchTerm).then((result) => {
        setSearchResults(result.data.products)
        setTotal(result.data.paginationDetails.pageCount)
        setPageIndex(result.data.paginationDetails.pageIndex)
        setNumOfPages(result.data.paginationDetails.totalPages)
        setCurrentProducts(result.data.products.length)
      }) 
    }else{
      ProductService.SearchProductById(searchTerm, catId)
      .then((result) => {
        setSearchResults(result.data.products)
        setTotal(result.data.paginationDetails.pageCount)
        setPageIndex(result.data.paginationDetails.pageIndex)
        setNumOfPages(result.data.paginationDetails.totalPages)
        setCurrentProducts(result.data.products.length)
      }) 
    }
  }

  useEffect(() => {
    GetAllCategories()
    GetSpecificProducts(pageIndex)
  }, [])

  const searchData = searchItem.length < 1  ? specificProducts : searchResults

  return (
    <div>
      <ToastContainer />
      <div className='me-4'>
        <Row >
          <Col className='col-3'>
            <button onClick={openModal} className="btn text-warning btn-act add-category" style={{ display: 'flex', justifyContent: 'center', fontSize: "20px" }} ><i className="material-icons" style={{ fontSize: "27px" }}>library_add &nbsp;</i><b>Add new Products</b></button>
          </Col >
          <Col className='col-9'>
          <AdminSearch term={searchItem} searchUser={searchUser} />

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

        {showModal && <ProductModal openModal={openModal} closeModal={closeModal} saveDetails={SaveProducts} buttonState="Save" header="Add Product" modalData='' categoryList={selectCategory} />}
      </div>
      <ProductList productList={searchData} UpdateDetails={updateProduct} deleteCard={deleteProduct} />
      <Pagination paginatedData={GetSpecificProducts} totalRecords={total} totalNumOfPages={numOfPages} currentProducts={currentProducts} />

    </div>
  )
}
export default Products
