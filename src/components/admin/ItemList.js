import React from 'react'
import { useState } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import ItemModal from './ItemModal'

const ItemList = ({itemList, UpdateDetails, deleteCard}) => {
	const [editItem, setEditItem] = useState()
	const [showEditModal, setShowEditModal] = useState(false)
	const openModal = (data) => {
		setEditItem(data)
		setShowEditModal(true)
	}
	const closeModal = () => {
		setShowEditModal(false)
	}
	const updateItem = (formData, id) => {
		debugger
		UpdateDetails(formData, id)
	}
	const handleDelete = (e, id) => {
		debugger
		e.stopPropagation();
		deleteCard(id)
	}

	return (
		<div>
			<table className="table table-lg table-striped table-hover  mx-2">
				<thead className='py-2'>
					<tr >
						<th style={{ color: '#9932CC', fontSize: '1.3rem' }}>Product Name</th>
						<th style={{ color: '#9932CC', fontSize: '1.3rem' }}>Item Name</th>
						<th style={{ color: '#9932CC', fontSize: '1.3rem' }}>Item Image </th>
						<th style={{ color: '#9932CC', fontSize: '1.3rem' }}>Price</th>
						<th style={{ color: '#9932CC', fontSize: '1.3rem' }}>Discount %</th>
						<th style={{ color: '#9932CC', fontSize: '1.3rem' }}>Actions</th>
					</tr>
				</thead>
				<tbody>
					{itemList.map((item, id) =>
						<tr key={id}>
							<td>{item.productName}</td>
							<td>{item.itemDescription}</td>
							<td>	<img src={item.itemImage} style={{ width: 90 }} /></td>
							<td>₹ {item.price}</td>
							<td>{item.discount}</td>

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
			{showEditModal && <ItemModal openModal={openModal} closeModal={closeModal} modalData={editItem} buttonState="Update" header="Update Item" updateDetails={updateItem} />}

		</div>
	)
}

export default ItemList
