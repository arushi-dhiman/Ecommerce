import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Login'
import Registration from './Registration'
import Dashboard from './users/Dashboard'
import Orders from './users/Orders'
import Profile from './users/Profile'
import Cart from './users/Cart'
import AdminDashboard from './admin/AdminDashboard'
import CustomerList from './admin/CustomerList'
import RequireAuth from '../utils/RequireAuth'
import { AuthProvider } from '../utils/Auth'
import AdminAnalytics from './admin/AdminAnalytics'
import AdminHome from './admin/AdminHome'
import Categories from './admin/Categories'
import Products from './admin/Products'
import Home from './users/Home'
import ProductDisplay from './users/ProductDisplay'
import Items from './admin/Items'
import UserPanelItems from './users/UserPanelItems'
import StripeContainer from './users/payment/StripeContainer'
import CartPage from './users/CartPage'


const RouterPage = () => {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>

          <Routes>
            <Route path='/login' element={<Login />}> </Route>
            <Route path='/register' element={<Registration />}> </Route>
            <Route path='/' element={<Home />}> 
            <Route index element={<Dashboard />}></Route>
            <Route path='displayproducts/:categoryId' element={<ProductDisplay />}> </Route>
            <Route path='displayitems/:productId' element={<UserPanelItems />}></Route>
            <Route path='displayproducts/:categoryId/displayitems/:productId' element={<UserPanelItems />}></Route>


            <Route path='cart' element={<Cart />}> </Route>  



            </Route>

            <Route path='/:name/:id' element={<RequireAuth><Home /></RequireAuth>}>
              <Route index element={<Dashboard />}></Route>
              <Route path='orders' element={<Orders />}> </Route>
              <Route path='displayproducts/:categoryId' element={<ProductDisplay />}></Route>
              <Route path='displayitems/:productId' element={<UserPanelItems />}></Route>
              <Route path='displayproducts/:categoryId/displayitems/:productId' element={<UserPanelItems />}></Route>


              <Route path ='cart' element ={<CartPage/>}>
              <Route path='cartitems' element={<Cart />}> </Route>  
              <Route path='cartitems/checkout' element={<StripeContainer />}> </Route>  
              </Route>

              {/* <Route path='displayproducts/:categoryId/displayitems/:productid/cart' element={<Cart />}> </Route>   */}


 
            </Route>
            <Route path='profile' element={<Profile />}> </Route>




            <Route path='/adminhome/:name' element={<RequireAuth><AdminHome /></RequireAuth>}>
              <Route path='dashboard' element={<AdminDashboard />} />
              <Route path='category' element={<Categories />} ></Route>
              <Route path='category/products/:categoryId' element={<Products />}></Route>
              <Route path='category/products/:categoryId/items/:productid' element={<Items />}></Route>
              <Route path='products/items/:productid' element={<Items />}></Route>

              <Route path='items' element={<Items/>}> </Route>
              <Route path='customers' element={<CustomerList />}> </Route>
              <Route path='products' element={<Products />}> </Route>
              <Route path='analytics' element={<AdminAnalytics />} />
            </Route>

          </Routes>
        </AuthProvider >

      </BrowserRouter>
    </div>
  )
}

export default RouterPage
