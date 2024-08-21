import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Home from '../Page/Home/Home'
import Login from '../Page/Login/Login'
import Signup from '../Page/Signup/Signup'

const MainRoutes = () => {
    return (
        <Routes>
            {/* <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} /> */}
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}

export default MainRoutes