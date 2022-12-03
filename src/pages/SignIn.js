// rfce
import React, { useState } from 'react'
import axios from 'axios'
import config from '../configuration.js'
import { toast } from 'react-toastify'
import Header from '../component/Header.js'
import Footer from '../component/Footer.js'
import { useNavigate } from 'react-router-dom'

function SignIn () {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${config.api.uri}/auth/actions/signin`, {
        email,
        password
      })

      // ritorna i campi a stringhe vuote
      setEmail('')
      setPassword('')

      toast.success('Accesso effettuato')
      navigate('/user/dashboard')
    } catch (err) {
      toast.error(err.response.data.error)
    }
  }

  return (
    <div>
      <Header/>
     <div className="container custom_className pt-5">
      <h2 className="signup_title text-center">SIGN IN</h2>
      <form className=" col-sm-6 offset-3 pt-5 signup_form">

        <div className="form-outline mb-4">
          <input onChange={e => setEmail(e.target.value)} type="email" id="form4Example2" className="form-control" value={email}/>
          <label className="form-label" htmlFor="form4Example2">Email</label>
        </div>

        <div className="form-outline mb-4">
          <input onChange={e => setPassword(e.target.value)} type="password" id="form4Example3" className="form-control" value={password}/>
          <label className="form-label" htmlFor="form4Example3">Password</label>
        </div>

        <button onClick={handleSubmit} type="submit" className="btn btn-primary btn-block mb-4">Login</button>
      </form>
     </div>
     <Footer/>
   </div>
  )
}

export default SignIn
