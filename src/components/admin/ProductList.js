import React, { useState } from 'react'
import '../styles/adminDashboard.css'
import ProductModal from './ProductModal';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';



const ProductList = ({ productList, deleteCard, UpdateDetails }) => {
	const data = useParams()
	console.log(data)
	const [editProduct, setEditProduct] = useState()
	const [showEditModal, setShowEditModal] = useState(false)
	const openModal = (data) => {
		setEditProduct(data)
		setShowEditModal(true)
	}
	const closeModal = () => {
		setShowEditModal(false)
	}
	const updateProduct = (formData, id) => {
		debugger
		UpdateDetails(formData, id)
	}
	const handleDelete = (e, id) => {
		debugger
		e.stopPropagation();
		deleteCard(id)
	}



	return (
		<>

			<table className="table table-lg table-striped table-hover  mx-2">
				<thead className='py-2'>
					<tr >
						<th style={{ color: '#9932CC', fontSize: '1.3rem' }}>Category</th>
						<th style={{ color: '#9932CC', fontSize: '1.3rem' }}>Product Name</th>
						<th style={{ color: '#9932CC', fontSize: '1.3rem' }}>Product Image </th>
						<th style={{ color: '#9932CC', fontSize: '1.3rem' }}>Product Description</th>
						<th style={{ color: '#9932CC', fontSize: '1.3rem' }}>View Items</th>
						<th style={{ color: '#9932CC', fontSize: '1.3rem' }}>Actions</th>
					</tr>
				</thead>
				<tbody>
					{productList.map((item, id) =>
						<tr key={id}>
							<td>{item.categoryName}</td>
							<td>{item.productName}</td>
							<td>	<img src={item.productImage} style={{ width: 90 }} /></td>
							<td>{item.productDescription}</td>
							<td><Link to={`items/productid=${item.id}`} className='item-link'>View Items</Link></td>
							<td>
								<OverlayTrigger
									overlay={
										<Tooltip id={`tooltip-top`}>
											Edit
										</Tooltip>
									}>
									<button onClick={() => openModal(item)} className="btn text-warning btn-act" data-toggle="modal"><i className="material-icons">&#xE254;</i></button>
								</OverlayTrigger>


								<OverlayTrigger
									overlay={
										<Tooltip id={`tooltip-top`}>
											Delete
										</Tooltip>
									}>
									<button onClick={(e) => handleDelete(e, item.id)} className="btn text-danger btn-act" data-toggle="modal"><i className="material-icons">&#xE872;</i></button>
								</OverlayTrigger>


							</td>
						</tr>

					)}
				</tbody>
			</table>
			{showEditModal && <ProductModal openModal={openModal} closeModal={closeModal} modalData={editProduct} buttonState="Update" header="Update Product" updateDetails={updateProduct} />}

		</>

	)
}

export default ProductList
