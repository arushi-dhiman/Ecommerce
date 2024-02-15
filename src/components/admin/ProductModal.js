import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import { TbSelect } from "react-icons/tb";
import { MdDescription, MdOutlineDriveFileRenameOutline, MdPhotoLibrary } from "react-icons/md"
import CategoryService from '../../Services/CategoryService';


const ProductModal = ({ openModal, closeModal, saveDetails, updateDetails, buttonState, header, modalData, categoryList }) => {
  console.log(categoryList)
  const defaultImage = '/assets/Images/img.jpg'
  const [product, setProduct] = useState({
    prodName: '', prodDescription: '', imgSrc: defaultImage, imgFile: null
  })
  const [selectCategory, setSelectCategory] = useState([])


  const GetAllCategories = () => {
    debugger
    CategoryService.GetAllCategory().then((res)=>  setSelectCategory(res.data));   
   }

  const [updateProduct, setUpdateProduct] = useState({
    prodName: modalData['productName'], prodDescription: modalData['productDescription'], prodCategory: modalData['categoryName'], imgSrc: modalData['productImage'], imgFile: null
  })

  console.log()
  const [prodCategoryId, setProdCategoryId] = useState({
    id: '', updateId: '', prodCat: '', updateProdCat: ''
  })

  const handleOptionChange = (e) => {
    debugger

  	if (buttonState === "Save") {
  		setProdCategoryId({...prodCategoryId, id : e.target.value})
  	}
  	else {
  		setProdCategoryId({...prodCategoryId, updateId : e.target.value})
  	}
  }
  // const handleOptionChange = (item) => {
  //   debugger

  //   if (header === "Add Product") {
  //     setProdCategoryId({ ...prodCategoryId, id: item.key, prodCat: item.value })
  //   }
  //   else {
  //     setProdCategoryId({ ...prodCategoryId, updateId: item.key, updateProdCat: item.value })
  //   }
  // }
  const handleChange = (e) => {
    if (buttonState === "Save") {
      setProduct({ ...product, [e.target.name]: e.target.value })
    }
    else {
      setUpdateProduct({ ...updateProduct, [e.target.name]: e.target.value })
    }
  }

  const showPreview = e => {
    debugger
    if (e.target.files[0]) {
      let imageFile = e.target.files[0]
      const reader = new FileReader();
      if (buttonState === "Save") {
        reader.onload = x => {
          setProduct({
            ...product,
            imgFile: imageFile,
            imgSrc: x.target.result
          })
        }
        reader.readAsDataURL(imageFile)
      }
      else {
        reader.onload = x => {

          setUpdateProduct({
            ...updateProduct,
            imgFile: imageFile,
            imgSrc: x.target.result

          })

        }
        reader.readAsDataURL(imageFile)
      }
    }
    else {
      setProduct({
        ...product,
        imgFile: null,
        imgSrc: defaultImage
      })
    }
  }


  const handleSubmit = (e) => {

    debugger
    e.preventDefault()
    if (buttonState === "Save") {
      const formData = new FormData()
      formData.append('FileName', product.prodName)
      formData.append('FileDescription', product.prodDescription)
      formData.append('file', product.imgFile)
      formData.append('categoryId', prodCategoryId.id)
      saveDetails(formData)
    }
    else {
      const formData = new FormData()
      formData.append('FileName', updateProduct.prodName)
      formData.append('FileDescription', updateProduct.prodDescription)
      formData.append('file', updateProduct.imgFile)
      formData.append('categoryId', prodCategoryId.updateId)
      const id = modalData['id']
      updateDetails(id, formData)
    }

    closeModal()
  }
  useEffect(() => {
    GetAllCategories()
  }, [])

  return (
    <>
      <Modal onHide={closeModal} show={openModal} aria-labelledby="contained-modal-title-vcenter"
        centered dialogClassName='custom-modal-style' backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">{header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form className='form-style'>
            <Row className='mb-3' style={{ width: '40%', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>
              <img src={modalData['productImage'] != null ? updateProduct["imgSrc"] : product.imgSrc} className='card-img-top mb-2'
              ></img>
            </Row>
            <Row className='mb-3'>
              <Col className='col-1'>
                <MdPhotoLibrary size={31} style={{ color: "#8CBCd6" }} />
              </Col>
              <Col className='col-11' >
                <Form.Group controlId='Name'>
                  <Form.Control type='file' accept='image/*' required
                    name="CategoryImage"
                    onChange={showPreview}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row className='mb-3'>
              <Col className='col-1'><MdOutlineDriveFileRenameOutline size={32} style={{ color: "#8CBCd6" }} /></Col>
              <Col className='col-11'>
                <Form.Group controlId='Name'>
                  <Form.Control type='text' placeholder='Product Name' required
                    name="prodName"
                    value={updateProduct['prodName']}
                    onChange={handleChange}
                  >
                  </Form.Control>

                </Form.Group>
              </Col>
            </Row>
            <Row className='mb-3'>
              <Col className='col-1'><MdDescription size={32} style={{ color: "#8CBCd6" }} /></Col>
              <Col className='col-11'>
                <Form.Group controlId='Name'>
                  <Form.Control type='text' placeholder='Product description' required
                    name="prodDescription"
                    value={updateProduct['prodDescription']}
                    onChange={handleChange}
                  ></Form.Control>

                </Form.Group>
              </Col>
            </Row>
            {/* <Row className='mb-3'>
							<Col className='col-1'><FaDollarSign size={30} style={{ color:"#8CBCd6"}}/></Col>
							<Col className='col-11'>
								<Form.Group controlId='Name'>
									<Form.Control type='text' placeholder='Product Price' required
										name="prodPrice"
									// value={updateCategory["CategoryDescription"]}
									onChange={handleChange}
									></Form.Control>

								</Form.Group>
							</Col>
						</Row> */}
            <Row className='mb-2'>
              <Col className='col-1'><TbSelect size={32} style={{ color: "#8CBCd6" }} /></Col>

              <Col className='col-11'>
                {/* <Select
                // defaultValue={{ label :modalData['categoryName']}}
                  // defaulqtInputValue={modalData['categoryName']}
                  value={header == 'Add Product' ?  prodCategoryId.prodCat.value : prodCategoryId.updateId.value}
                  onChange={(item) => handleOptionChange(item)}
                  options={selectCategory.map((item) => {
                    return {
                      label: item.categoryName,
                      value: item.categoryName,
                      key: item.id
                    };
                  })}
                /> */}
                <Form.Select name='prodCategory' onChange={handleOptionChange}>
									<option value=""></option>

									{selectCategory.map((data) => (
										<option key={data.id} value={data.id} >{data.categoryName}</option>
									))}

								</Form.Select>

              </Col>
            </Row>
          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary"
            onClick={closeModal}>
            Close
          </Button>
          <Button variant="success"
            onClick={handleSubmit}
          >
            {buttonState}
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default ProductModal
