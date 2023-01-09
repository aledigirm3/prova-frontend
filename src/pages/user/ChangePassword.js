import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'react-toastify'
import config from '../../configuration'

const ChangePassword = () => {
  const navigate = useNavigate()
  const { token } = useParams()
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')

  const handleSubmit = () => {
    toast.dismiss()
    if (password !== repeatPassword) {
      toast.error('I campi devono corrispondere!')
    } else {
      axios.put(`${config.api.uri}/auth/actions/update/password/${token}`, {
        password
      })
        .then(() => {
          setPassword('')
          setRepeatPassword('')
          toast.success('Password modificata con successo')
          navigate('/signin')
        })
        .catch(error => {
          toast.error(error.response.data.error)
        })
    }
  }

  return (

<div>
  <div className="form-outline mb-4">
    <input type="password" id="form1Example1" className="form-control" onChange={e => setPassword(e.target.value)} value={password} />
    <label className="form-label" htmlFor="form1Example1">Password</label>
  </div>

  <div className="form-outline mb-4">
    <input type="password" id="form1Example2" className="form-control" onChange={e => setRepeatPassword(e.target.value)} value={repeatPassword} />
    <label className="form-label" htmlFor="form1Example2">Repeat Password</label>
  </div>

  <button type="submit" className="btn btn-primary btn-block" onClick={handleSubmit}>Change</button>
  </div>
  )
}

export default ChangePassword
