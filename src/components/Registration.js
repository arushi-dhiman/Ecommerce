import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';


const Registration = () => {
    const navigate = useNavigate()
    const [registerUser, setRegisterUser] = useState({
        firstName : '', lastName :'', email : '', password : ''
    })
    const handleChange = (e)=>{
        setRegisterUser({...registerUser, [e.target.name] : e.target.value})
    }
    const handleSignUp =()=>{
        debugger
        const url = "https://localhost:7136/api/Users/Registration"
        const value ={
            'firstName' : registerUser.firstName,
            'lastName' : registerUser.lastName,
            'email' : registerUser.email,
            'password' : registerUser.password
        }
        axios.post(url, value).then((res)=>{
            navigate('/login')
            toast.success("User registered successfully")
        }).catch(()=>toast.error("Error!"))
    }
  return (
    <div>
      <section className="vh-100" style={{backgroundColor: "#eee"}}>
        <ToastContainer/>
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-12 col-xl-11">
        <div className="card text-black" style={{borderRadius: "25px"}}>
          <div className="card-body p-md-5">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                <form className="mx-1 mx-md-4">

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="text" id="form3Example1c" name="firstName" className="form-control" placeholder='FirstName' onChange={handleChange}/>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="text" id="form3Example3c" name="lastName" className="form-control" placeholder='LastName' onChange={handleChange}/>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="email" id="form3Example4c" name="email" className="form-control" placeholder='Email' onChange={handleChange}/>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="password" id="form3Example4cd" name="password"className="form-control" placeholder='Password' onChange={handleChange}/>
                    </div>
                  </div>

                  <div className="form-check d mb-4">
                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                    <label className="form-check-label" for="form2Example3">
                      I agree all statements in <a href="#!">Terms of service</a>
                    </label>
                  </div>

                  <div className="d-flex w-100  mb-3 mb-lg-3">
                    <button type="button" className="btn btn-primary btn-lg btn-block w-100" onClick={handleSignUp}>Register</button>
                  </div>
                  <div className='mt-3'>Already have an account ?<Link className='mx-2' to='/'>Sign In</Link></div>

                </form>

              </div>
              <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  className="img-fluid" alt="Sample image"/>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default Registration
