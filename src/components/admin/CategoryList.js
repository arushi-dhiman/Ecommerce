import React, { useState } from 'react'
import CategoryModal from './CategoryModal'
import '../styles/adminDashboard.css'
import { RiDeleteBinFill } from "react-icons/ri";
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';



const CategoryList = ({ categoryList, UpdateDetails, deleteCard }) => {

  const [editCategory, setEditCategory] = useState()
  const [showEditModal, setShowEditModal] = useState(false)
  const openModal = (data) => {
    setEditCategory(data)
    setShowEditModal(true)
  }
  const closeModal = () => {
    setShowEditModal(false)
  }
  const updateCategory = (formData, id) => {
    UpdateDetails(formData, id)
  }
  const handleDelete = (e, id) => {
    debugger
    e.stopPropagation();
    deleteCard(id)
  }



  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-5 ">
      {
        categoryList.map((item, id) =>
          <div className="col" key={id}>
            <div className="card mb-5" style={{ width: '16rem', height: '18rem' }} onClick={() => openModal(item)}>
              <img src={item.categoryImage} className='card-img-top' />
              <div className='card-body'>
                <h5 className="card-text mb-1" style={{ fontWeight: 600 }}>{item.categoryName}</h5>
                <p className="card-text mb-0">{item.categoryDescription}</p>
                <Row>
                  <Col className='col-9'>
                    <Link to={`products/categoryid=${item.id.toString()}`} state={{catId : item.id}} className='product-link'>View Products</Link>
                  </Col>
                  <Col className='col-3'>
                    <button className='btn delete-button' onClick={(e) => handleDelete(e, item.id)}><RiDeleteBinFill size={20} /></button>
                  </Col>
                </Row>
              </div>
            </div>
            {showEditModal && <CategoryModal openModal={openModal} closeModal={closeModal} modalData={editCategory} buttonState="Update" header="Update Category" UpdateDetails={updateCategory} />}
          </div>

        )
      }

    </div>

  )
}

export default CategoryList
