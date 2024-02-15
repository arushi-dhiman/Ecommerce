import React from 'react'
import Slider from './Slider'
import Category from './Category'
import Newsletter from './Newsletter'
import Footer from './Footer'
import Product from './Product'
import Navbar from './Navbar'
import Announcement from './Announcement'

const Dashboard = () => {
  return (
    <div>
      <Announcement />
      <Navbar />
      <Slider />
      <Category />
      <Product />
      <Newsletter />
      <Footer />
    </div>
  )
}

export default Dashboard
