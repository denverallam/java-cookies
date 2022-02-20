import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

function AuthenticatedRoute() {
    const { isAuthenticated, loading, user } = useSelector(state => state.auth)

    if(loading === false) {
        if (!isAuthenticated) return <Navigate to="/login" />
    }

    return <Outlet />;
}


export default AuthenticatedRoute