import React, { useEffect } from 'react'
import './styles/login.css'
import { Link, useNavigate } from 'react-router-dom'
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../utils/Auth';




const Login = () => {

  const auth = useAuth()
  

  const navigate = useNavigate()
  const [user, setUser] = useState({
    email: '', password: ''
  })
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }


  const handleLogin = () => {
    debugger

    auth.login(user.email, user.password)
  const url = "https://localhost:7136/api/Users/Login"
  const value = {
    'email': user.email,
    'password': user.password
  }
  localStorage.setItem("token-info", JSON.stringify(value))
  axios.post(url, value).then((res) => {
    const name = res.data.user.firstName +" "+ res.data.user.lastName
    const id = res.data.user.id
    res.data.status === null ? navigate(res.data.user.type === 'User' ? `/${name}/id=${id}` : `/adminhome/${name}`, { replace: true }) : toast.error('Please enter correct credentials')
  })
    .catch(() => {
      toast.error('Invalid Credentials')
    })
  }




  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <ToastContainer />
        <div className="container py-5 px-5 h-60">
          <div className="row d-flex align-items-center justify-content-center background" style={{ backgroundColor: "white" }}>
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid" alt="Phone image" />
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <div className=" mb-4">
                <input type="email" className="input" placeholder='abc@gmail.com' name="email"
                  onChange={handleChange} />
              </div>

              <div className="form-outline mb-4">
                <input type="password" className="input" placeholder='Password' name="password"
                  onChange={handleChange} />

              </div>

              <div className="d-flex align-items-center mb-4 ">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="form1Example3" />
                  <label className="form-check-label " for="form1Example3"> Remember me </label>
                </div>
                <Link className="mx-4">Forgot password?</Link>
              </div>

              <button className="btn btn-primary btn-lg btn-block w-100" onClick={handleLogin}>Sign in</button>

              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
              </div>
              <div className='flex flex-direction row w-100 mx-0'>
                <Link className="btn btn-primary btn-lg btn-block mb-3" style={{ backgroundColor: "#3b5998" }}
                  role="button">
                  <FaFacebookF className='me-2' />Continue with Facebook
                </Link>
                <Link className="btn btn-primary btn-lg btn-block" style={{ backgroundColor: "#55acee" }}
                  role="button">
                  <FaTwitter className='me-2' />Continue with Twitter</Link>
              </div>
              <div className='mt-3'>Don't have an account ?<Link className='mx-2' to='/register'>Sign Up</Link></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Login
