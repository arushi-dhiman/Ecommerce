import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import ProductService from '../../Services/ProductService'
import { MdDescription, MdOutlineDriveFileRenameOutline, MdPhotoLibrary } from "react-icons/md"
import { TbSelect } from 'react-icons/tb'
import { FaDollarSign } from 'react-icons/fa'
import { BiSolidDiscount } from 'react-icons/bi'


const ItemModal = ({ openModal, closeModal, buttonState, header, modalData, saveDetails, updateDetails }) => {
	const defaultImage = '/assets/Images/img.jpg'
	const [selectProduct, setSelectProduct] = useState([])

	const getAllProducts = () => {
		
		ProductService.GetProducts().then((res) => setSelectProduct(res.data.products));
	}
	console.log(selectProduct)

	const [item, setItem] = useState({
		itemName: '', imgSrc: defaultImage, imgFile: null, price: '', discount: ''
	})

	const [ItemProductId, setItemProductId] = useState({
    id: '', updateId: '', itemProd: '', updateItemProd: ''
  })
	const [updateItem, setUpdateItem] = useState({
    itemName: modalData['itemName'], itemDescription : modalData['itemDescription'], itemProduct: modalData['productName'], imgSrc: modalData['itemImage'], imgFile: null,
	price :modalData['price'],discount : modalData['discount']
  })


	const handleOptionChange = (e) => {
    debugger

  	if (buttonState === "Save") {
  		setItemProductId({...ItemProductId, id : e.target.value})
  	}
  	else {
  		setItemProductId({...ItemProductId, updateId : e.target.value})
  	}
  }

	const handleChange = (e) => {
    if (buttonState === "Save") {
      setItem({ ...item, [e.target.name]: e.target.value })
    }
    else {
      setUpdateItem({ ...updateItem, [e.target.name]: e.target.value })
    }
  }
	const showPreview = e => {
		debugger
		if (e.target.files[0]) {
			let imageFile = e.target.files[0]
			const reader = new FileReader();
			if (buttonState === "Save") {
				reader.onload = x => {
					setItem({
						...item,
						imgFile: imageFile,
						imgSrc: x.target.result
					})
				}
				reader.readAsDataURL(imageFile)
			}
			else {
				reader.onload = x => {

					setUpdateItem({
						...updateItem,
						imgFile: imageFile,
						imgSrc: x.target.result

					})

				}
				reader.readAsDataURL(imageFile)
			}
		}
		else {
			setItem({
				...item,
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
      formData.append('FileName', item.itemName)
      formData.append('FileDescription', item.itemDescription)
      formData.append('file', item.imgFile)
      formData.append('price', item.price)
	  formData.append('discount', item.discount)
      formData.append('categoryId', 0)
	  formData.append('productId', ItemProductId.id)


      saveDetails(formData)
    }
    else {
      const formData = new FormData()
      formData.append('FileName', updateItem.itemName)
      formData.append('FileDescription', updateItem.itemDescription)
      formData.append('file', updateItem.imgFile)
      formData.append('price', updateItem.price)
	  formData.append('discount', updateItem.discount)
      formData.append('categoryId', 0)
	  formData.append('productId', ItemProductId.updateId)
      const id = modalData['id']
       updateDetails(id, formData)
    }

    closeModal()
  }

	useEffect(() => {
		getAllProducts()
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
						<Row className='mb-2' style={{ width: '40%', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>
							<img src={modalData['itemImage'] != null ? updateItem["imgSrc"] : item.imgSrc} className='card-img-top mb-1'
							></img>
						</Row>
						<Row className='mb-2'>
							<Col className='col-1'>
								<MdPhotoLibrary size={28} style={{ color: "#50C878", marginTop : '5px' }} />
							</Col>
							<Col className='col-11' >
								<Form.Group controlId='Name'>
									<Form.Control type='file' accept='image/*' required
										name="ItemImage"
										onChange={showPreview}
									></Form.Control>
								</Form.Group>
							</Col>
						</Row>
						<Row className='mb-2'>
							<Col className='col-1'><MdOutlineDriveFileRenameOutline size={28} style={{ color: "#50C878" , marginTop : '5px'}} /></Col>
							<Col className='col-11'>
								<Form.Group controlId='Name'>
									<Form.Control type='text' placeholder='Item Name' required
										name="itemName"
										value={updateItem['itemName']}
										onChange={handleChange}
									>
									</Form.Control>

								</Form.Group>
							</Col>
						</Row>

						<Row className='mb-2'>
							<Col className='col-1'><MdDescription size={28} style={{ color: "#50C878" , marginTop : '5px'}} /></Col>
							<Col className='col-11'>
								<Form.Group controlId='Name'>
									<Form.Control type='text' placeholder='Item Description' required
										name="itemDescription"
										value={updateItem['itemDescription']}
										onChange={handleChange}
									>
									</Form.Control>

								</Form.Group>
							</Col>
						</Row>
						<Row className='mb-2'>
							<Col className='col-1'><FaDollarSign size={25} style={{ color: "#50C878" , marginTop : '5px'}} /></Col>
							<Col className='col-11'>
								<Form.Group controlId='Name'>
									<Form.Control type='text' placeholder='Price' required
										name="price"
										value={updateItem['price']}
										onChange={handleChange}
									></Form.Control>

								</Form.Group>
							</Col>
						</Row>
						<Row className='mb-2'>
							<Col className='col-1'><BiSolidDiscount size={28} style={{ color: "#50C878", marginTop : '5px' }} /></Col>
							<Col className='col-11'>
								<Form.Group controlId='Name'>
									<Form.Control type='text' placeholder='Discount' required
										name="discount"
										value={updateItem['discount']}
										onChange={handleChange}
									></Form.Control>

								</Form.Group>
							</Col>
						</Row>
						<Row className='mb-2'>
							<Col className='col-1'><TbSelect size={28} style={{ color: "#50C878", alignItems :'center', marginTop : '5px' }} /></Col>

							<Col className='col-11'>
								<Form.Select name='itemProduct' onChange={handleOptionChange}>
									<option value=""></option>

									{selectProduct.map((data) => (
										<option key={data.id} value={data.id} >{data.productName}</option>
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

export default ItemModal
