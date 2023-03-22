import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from '../../Pages/Login'
import SignupPage from '../../Pages/Signup'

const RegistrationRoutes = () => {
    return (
        <div className='registration'>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
            </Routes>
        </div>
    )
}

export default RegistrationRoutes