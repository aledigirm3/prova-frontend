import React from 'react'
import './App.css'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Route exact path='/' component={Home}/>
      <Route exact path='/signup' component={SignUp}/>
      <Route exact path='/signin' component={SignIn}/>
      </BrowserRouter>
    </div>
  )
}

export default App
