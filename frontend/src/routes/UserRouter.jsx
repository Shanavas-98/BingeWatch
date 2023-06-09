import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/user/HomePage'

function UserRouter() {
  return (
    <Routes>
        <Route element={<HomePage/>} path='/'/>
    </Routes>
  )
}

export default UserRouter