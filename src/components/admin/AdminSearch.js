import React, { useRef } from 'react'
import {FaSearch } from 'react-icons/fa'
import '../styles/adminDashboard.css'


const AdminSearch = ({searchUser, term}) => {
  debugger
    const inputEl = useRef("")
    const getSearch = ()=>{
        searchUser(inputEl.current.value)
    }
  return (
    <div className='input-wrapper'>
      <FaSearch id ='search-icon'/>
      <input className='search' ref={inputEl} style={{marginLeft: "5px"}} placeholder='Type to search...' value={term} onChange={getSearch} />
    </div>
  )
}

export default AdminSearch
