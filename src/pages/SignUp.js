import React, { useState } from 'react'
import axios from 'axios'

import config from '../configuration.js'

function SignUp () {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${config.api.uri}/user`, {
        name,
        email,
        password
      })

      // ritorna i campi a stringhe vuote
      setName('')
      setEmail('')
      setPassword('')
    } catch (err) {
      console.log('Signup error: ', err)
    }
  }

  return (
    <div className="container custom_className pt-5">
      <h2 className="signup_title text-center">SIGN UP</h2>
      <form className=" col-sm-6 offset-3 pt-5 signup_form">
        <div className="form-outline mb-4">
          <input onChange={e => setName(e.target.value)} type="text" id="form4Example1" className="form-control" value={name}/>
          <label className="form-label" htmlFor="form4Example1">Name</label>
        </div>

        <div className="form-outline mb-4">
          <input onChange={e => setEmail(e.target.value)} type="email" id="form4Example2" className="form-control" value={email}/>
          <label className="form-label" htmlFor="form4Example2">Email</label>
        </div>

        <div className="form-outline mb-4">
          <input onChange={e => setPassword(e.target.value)} type="password" id="form4Example3" className="form-control" value={password}/>
          <label className="form-label" htmlFor="form4Example3">Password</label>
        </div>

        <button onClick={handleSubmit} type="submit" className="btn btn-primary btn-block mb-4">Register</button>
      </form>
    </div>
  )
}

export default SignUp