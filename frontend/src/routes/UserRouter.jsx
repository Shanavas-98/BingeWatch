import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/user/HomePage'
import Login from '../components/Login/Login'
import Signup from '../components/Signup/Signup'
import Otp from '../components/Otp/Otp'

function UserRouter() {
  return (
    <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Signup/>}/>
        <Route path='/verify' element={<Otp/>}/>
    </Routes>
  )
}

export default UserRouter