import React, { useState } from 'react'
import x from '../../images/Form.jpg'
import y from '../../images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Joi from 'joi';
export default function Login({ saveUser }) {
  let navigate = useNavigate()
  let [loading, setLoading] = useState(false)
  let [errorList, setErrorList] = useState([])
  let [errorApi, setErrorApi] = useState("")
  let [user, setUser] = useState({
    email: "",
    password: "",
  })
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
      let { data } = await axios.post('https://route-egypt-api.herokuapp.com/signin', user)
      if (data.message === 'success') {
        navigate('/home')
        localStorage.setItem("token", data.token)
        saveUser()
      }
      else {
        setErrorApi(data.message)
      }
      setLoading(false)
    }
    else {
      setErrorList(valid.error.details)
    }
  }
  function validData() {
    let scheme = Joi.object({
      email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
      password: Joi.string().required().pattern(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@]{8,32}$/)),
    })
    return scheme.validate(user, { abortEarly: false })
  }
  return (
    <div className="row p-5">
      <img src={x} className="col-lg-6" alt=""></img>
      <div className="col-lg-6 bg-grey">
        <div className="py-5 px-5 ">
          <div className="text-center">
            <img src={y} className="w-25" alt=""></img>
            <h1 className="h4 mb-4">Log in to GameOver</h1>
          </div>
          <form onSubmit={submitForm}>
            <input type="email" onChange={addUser} name="email" placeholder="Email Address" required="" className="form-control" />
            {errorList.length > 0 ? errorList.map((e) => { if (e.path[0] === 'email') { return <div key={e} className='bg-warning'>{e.message}</div> } else { return '' } }) : ''}
            <input type="password" onChange={addUser} name="password" placeholder="Password" required="" className="form-control mt-3" />
            {errorList.length > 0 ? errorList.map((e) => { if (e.path[0] === 'password') { return <div key={e} className='bg-warning'>{e.message}</div> } else { return '' } }) : ''}
            {errorApi === null ? "" : <div className='bg-danger mt-3 text-center'>{errorApi}</div>}
            {!loading ?
              <button type="submit" className="btn text-white w-100 py-2 btn-form mt-3">
                <span>Login</span>
              </button> :
              <button className="btn text-white w-100 py-2 btn-form mt-3">
                <i className='fa-solid fa-spinner fa-spin'></i>
              </button>}
          </form>
          <hr />
          <div className="text-center"><button className="small ms-2 text-primary bg-transparent border-0" onClick={() => { alert("ههه اعمل اكونت جديد") }}> Forgot Password?</button></div>
          <div className="text-center">
            <span className="small">Not a member yet?</span>
            <Link className="small ms-2 text-primary" to='/register' >Create Account<i className="fas fa-chevron-right small"></i></Link>
          </div>
        </div>
      </div>
    </div>
  )
}
