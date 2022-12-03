// rafce
import React, { useState } from 'react'
import axios from 'axios'
import config from '../../configuration.js'
import { toast } from 'react-toastify'
const UserDashboard = () => {
  const [user, setUser] = useState('')
  axios.get(`${config.api.uri}/auth/actions/getme`, { withCredentials: true })
    .then(res => {
      setUser(res.data.user)
    }).catch(err => {
      console.log(err)
      toast.error(err.response.data.error)
    })

  return (
    <div>
    <h1>{user.name}</h1>
    </div>
  )
}

export default UserDashboard
