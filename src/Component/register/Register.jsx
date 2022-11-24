import React, { useState } from 'react'
import x from '../../images/Form.jpg'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Joi from 'joi';
export default function Register() {
  let [user, setUser] = useState({
    first_name: "",
    last_name: "",
    age: "",
    password: "",
    email: "",
  })
  let [loading, setLoading] = useState(false)
  let [errorList, setErrorList] = useState([])
  let navigate = useNavigate()
  function addUser(e) {
    let myUser = { ...user }
    myUser[e.target.name] = e.target.value
    setUser(myUser)
  }
  async function submitForm(e) {
    e.preventDefault()
    let valid = validData()
    if (valid.error == null) {
      setLoading(true)
      let { data } = await axios.post('https://route-egypt-api.herokuapp.com/signup', user)
      if (data.message === 'success') {
        navigate('/login')
      }
      setLoading(false)
    }
    else {
      setErrorList(valid.error.details)
    }
  }
  function validData() {
    let scheme = Joi.object({
      first_name: Joi.string().required().min(3).max(30).alphanum(),
      last_name: Joi.string().required().min(3).max(30).alphanum(),
      age: Joi.number().required().min(18).max(100),
      email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
      password: Joi.string().required().pattern(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,32}$/)),
    })
    return scheme.validate(user, { abortEarly: false })
  }
  return (
    <div className="row p-5">
      <img src={x} className="col-lg-6" alt=""></img>
      <div className="col-lg-6 bg-grey">
        <div className="py-5 px-2">
          <div className="text-center">
            <h1 className="h4 mb-4">Create My Account!</h1>
          </div>
          <form onSubmit={submitForm}>
            <div className="row">
              <div className='col-6 mb-3'>
                <input type="text" onChange={addUser} name="first_name" placeholder="First Name" required="" className="form-control text-white bg-form" />
                {errorList.length > 0 ? errorList.map((e, i) => { if (e.path[0] === 'first_name') { return <div key={e} className='bg-warning'>{errorList[i].message}</div> } else { return '' } }) : ''}</div>
              <div className='col-6 mb-3'>
                <input type="text" onChange={addUser} name="last_name" placeholder="Last Name" required="" className="form-control text-white bg-form" />
                {errorList.length > 0 ? errorList.map((e) => { if (e.path[0] === 'last_name') { return <div key={e} className='bg-warning'>{e.message}</div> } else { return '' } }) : ''}</div>
            </div>
            <input type="email" onChange={addUser} name="email" placeholder="Email Address" required="" className="form-control text-white bg-form" />
            {errorList.length > 0 ? errorList.map((e) => { if (e.path[0] === 'email') { return <div key={e} className='bg-warning'>{e.message}</div> } else { return '' } }) : ''}
            <input type="number" onChange={addUser} name="age" placeholder="age" required="" className="form-control text-white mt-3 bg-form" />
            {errorList.length > 0 ? errorList.map((e) => { if (e.path[0] === 'age') { return <div key={e} className='bg-warning'>{e.message}</div> } else { return '' } }) : ''}
            <input type="password" onChange={addUser} name="password" placeholder="Password" required="" className="form-control text-white mt-3 bg-form" />
            {errorList.length > 0 ? errorList.map((e) => { if (e.path[0] === 'password') { return <div key={e} className='bg-warning'>{e.message}</div> } else { return '' } }) : ''}
            {!loading ?
              <button type="submit" className="btn text-white w-100 py-2 btn-form mt-3">
                <span>Create Account</span>
              </button> :
              <button className="btn text-white w-100 py-2 btn-form mt-3">
                <i className='fa-solid fa-spinner fa-spin'></i>
              </button>}
          </form>
          <p className="text-center mt-2 text-muted small">This site is protected by reCAPTCHA and the Google
            <a href="https://policies.google.com/privacy" className="text-secondary">Privacy Policy</a> and
            <a href="https://policies.google.com/terms" className="text-secondary">Terms of Service</a> apply.</p><hr />
          <div className="text-center">
            <span className="small">Already a member?</span>
            <Link className="small ms-2 text-primary" to='/login' >Log In<i className="fas fa-chevron-right small"></i></Link>
          </div>
        </div>
      </div>
    </div>
  )
}
