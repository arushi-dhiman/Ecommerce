import React from 'react'
import AdminSidebar from './AdminSidebar'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'

const AdminHome = () => {
  return (
  <>
     <Box sx={{ display: "flex" }}>
        <AdminSidebar />
        <Box component="main" sx={{ flexGrow: 1, pt: 11, pl: 3}}>
          <Typography  >
          <Outlet/>

          </Typography>
        </Box>
        </Box>

    </>
  )
}

export default AdminHome
