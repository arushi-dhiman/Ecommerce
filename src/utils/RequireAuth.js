import React from 'react'
import { useAuth } from './Auth'
import { Navigate } from 'react-router-dom'

export default function RequireAuth({ children }) {
    const loginData = JSON.parse(localStorage.getItem('token-info'))
    const auth = useAuth()
    debugger
    if (!loginData) {
        return <Navigate to='/login' replace/>
    }
    return children
    
}
