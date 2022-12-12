import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './component/Header'
import Footer from './component/Footer'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import UserDashboard from './pages/user/UserDashboard'
import CreateProduct from './pages/admin/CreateProduct'
import PrivateRoutes from './component/PrivateRoutes'

const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route element={<PrivateRoutes/>}>
              <Route path='/user/dashboard' element={<UserDashboard/>} />
              <Route path='/admin/create/product' element={<CreateProduct/>}/>
          </Route>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
