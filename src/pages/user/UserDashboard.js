import React, { useState, useEffect } from 'react'
import axios from 'axios'
import config from '../../configuration.js'

const UserDashboard = () => {
  const [user, setUser] = useState('')
  useEffect(() => {
    axios.get(`${config.api.uri}/auth/actions/getme`, { withCredentials: true })
      .then(res => {
        setUser(res.data.user)
      }).catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div>
     <div className="container-fluid dashboard_container" style={{ margin: '3%' }}>
      <div className="row">
         <div className="col-sm-4">
            <div className="card card_dashboard">
            <div className="card-header">
                 <b>User Dashboard</b>
             </div>
             <ul className="list-group list-group-flush">
                <li className="list-group-item">Name: {user.name}</li>
                <li className="list-group-item">E-mail {user.email}</li>
                <li className="list-group-item">Join at {new Date(user.createdAt).toLocaleDateString()}</li>
                <li className="list-group-item">{user.role === 1 ? 'ADMIN' : 'USER'}</li>
             </ul>
            </div>
          </div>
         <div className="col-sm-8">
         <a className="btn btn-success" href="/admin/create/product" role="button">+ product</a>
        </div>
     </div>
  </div>
</div>
  )
}

export default UserDashboard
