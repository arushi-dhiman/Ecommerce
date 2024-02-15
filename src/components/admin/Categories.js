import React, { useState, useEffect } from 'react'
import CategoryModal from './CategoryModal';
import '../styles/adminDashboard.css'
import axios from 'axios';
import CategoryList from './CategoryList';
import { ToastContainer, toast } from 'react-toastify';
import CategoryService from '../../Services/CategoryService';



const Categories = () => {

  const [showModal, setShowModal] = useState(false)
  const [categoryList, setCategoryList] = useState([])
  const [editCategory, setEditCategory] = useState(null)

  const openModal = (data) => {
    setShowModal(true)
    setEditCategory(data)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const GetAllCategories =()=>
  {
    CategoryService.GetAllCategory().then((res)=>  setCategoryList(res.data));   
  }

  const SaveCategory = (formData)=>
  {
    CategoryService.CreateCategory(formData).then((res) => GetAllCategories())
  }

  const updateCategory = (formData, id)=>
  {
    CategoryService.UpdateCategory(formData, id).then((res) =>  GetAllCategories())
  }

  const deleteCategory =(id)=>
  {
    CategoryService.DeleteCategory(id).then((res)=> GetAllCategories())
  }

  useEffect(() => {
    debugger
    GetAllCategories()
  }, [])
  return (
    <>
      <div>
        
        <button onClick={openModal} className="btn text-warning btn-act add-category" style={{display:'flex', justifyContent:'center' ,fontSize:"20px"}} ><i className="material-icons" style={{fontSize:"27px"}}>library_add &nbsp;</i><b>Add new Category</b></button>
        {showModal && <CategoryModal closeModal={closeModal} openModal={openModal} modalData=''  header='Add new Category'  buttonState = 'Save' SaveDetails={SaveCategory} 
        />}
      </div>
      <ToastContainer/>
      <CategoryList categoryList={categoryList} UpdateDetails = {updateCategory} deleteCard={deleteCategory}/>
    </>
  )
}

export default Categories
