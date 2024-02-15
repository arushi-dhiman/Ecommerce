import { useEffect, useState } from 'react'
import {
  Button,
  Modal,
  Form,
  Row,
  Col,
  FormLabel
} from 'react-bootstrap';
import { FcAddImage, FcAddRow, FcNook } from "react-icons/fc";
import '../styles/adminDashboard.css'

const defaultImage = '/assets/Images/img.jpg'

const CategoryModal = ({ openModal, closeModal, modalData, header, buttonState, SaveDetails, UpdateDetails }) => {

  const [category, setCategory] = useState({
    CategoryName: '', CategoryDescription: '', imgSrc: defaultImage, imgFile: null
  })


  const [updateCategory, setUpdateCategory] = useState({
    CategoryName: modalData['categoryName'],
    CategoryDescription: modalData['categoryDescription'],
    imgSrc: modalData['categoryImage'],
    imgFile: null,
  })

  const handleChange = (e) => {
    if (buttonState === "Save") {
      setCategory({ ...category, [e.target.name]: e.target.value })
    }
    else {
      setUpdateCategory({ ...updateCategory, [e.target.name]: e.target.value })
      console.log(updateCategory)
    }
  }
  const showPreview = e => {
    debugger
    console.log(e.target.files[0])
    if (e.target.files[0]) {
      let imageFile = e.target.files[0]
      const reader = new FileReader();
      if (buttonState === "Save") {
        reader.onload = x => {
          setCategory({
            ...category,
            imgFile: imageFile,
            imgSrc: x.target.result
          })
        }
        reader.readAsDataURL(imageFile)
      }
      else {
        reader.onload = x => {

          setUpdateCategory({
            ...updateCategory,
            imgFile: imageFile,
            imgSrc: x.target.result

          })

        }
        reader.readAsDataURL(imageFile)
      }
    }
    else {
      setCategory({
        ...category,
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
      formData.append('FileName', category.CategoryName)
      formData.append('FileDescription', category.CategoryDescription)
      formData.append('file', category.imgFile)

      SaveDetails(formData)

    }
    else {
      const formData = new FormData()
      formData.append('FileName', updateCategory.CategoryName)
      formData.append('FileDescription', updateCategory.CategoryDescription)
      formData.append('file', updateCategory.imgFile)
      const id = modalData['id']
      UpdateDetails(formData, id)
    }
    closeModal()
  }


  return (
    <>
      <Modal onHide={closeModal} show={openModal} aria-labelledby="contained-modal-title-vcenter" size="md" centered >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">{header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form className='form-style'>
            <Row className='mb-3'>
              <img src={modalData['categoryImage'] != null ? updateCategory["imgSrc"] : category.imgSrc} className='card-img-top mb-2'
                style={{ width: '50%', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} ></img>
            </Row>
            <Row className='mb-3'>
              <Col className='col-1'>
                <FcAddImage size={35} />
              </Col>
              <Col className='col-11' >
                <Form.Group controlId='Name'>
                  <Form.Control type='file' accept='image/*'  required 
                    name="CategoryImage"
                    onChange={showPreview}></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row className='mb-3'>
              <Col className='col-1'><FcAddRow size={35} /></Col>
              <Col className='col-11'>
                <Form.Group controlId='Name'>
                  <Form.Control type='text' placeholder='Category Name' required
                    name="CategoryName"
                    value={updateCategory["CategoryName"]}
                    onChange={handleChange}></Form.Control>

                </Form.Group>
              </Col>
            </Row>
            <Row className='mb-3'>
              <Col className='col-1'><FcNook size={35} /></Col>
              <Col className='col-11' l>
                <Form.Group controlId='Name'>
                  <Form.Control type='text' placeholder='Category description' required
                    name="CategoryDescription"
                    value={updateCategory["CategoryDescription"]}
                    onChange={handleChange}></Form.Control>

                </Form.Group>
              </Col>
            </Row>

          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary"
            onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary"
            onClick={handleSubmit}
          >
            {buttonState}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}



export default CategoryModal
