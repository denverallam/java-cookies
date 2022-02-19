import './App.css';

import { useEffect, useLayoutEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { loadUser } from './actions/authActions'
import store from './store'

import Header from './components/layout/Header'
import ProtectedRoute from './components/layout/ProtectedRoute'

import Home from './components/home/Home'
import Login from './components/home/Login'
import Profile from './components/home/Profile'
import UpdatePassword from './components/home/UpdatePassword'
import ForgotPassword from './components/home/ForgotPassword'
import ResetPassword from './components/home/ResetPassword'

import RegisterStaff from './components/admin/RegisterStaff'
import AllUsers from './components/admin/AllUsers'
import UpdateUser from './components/admin/UpdateUser'

const ScrollToTop = ({ children }) => {
    const location = useLocation();
    useLayoutEffect(() => {
        document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);
    return children
}

function App() {
    const { loading } = useSelector(state => state.auth)
    // const { dashboard } = useSelector(state => state.dashboard)

    useEffect(() => {
        store.dispatch(loadUser())
    }, [])
    return (
        <Router>
            <div className="App">
                <ScrollToTop>
                    <Header />
                    {loading ? <h1>Loading...</h1> : (
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='/password/forgot' element={<ForgotPassword />} />
                            <Route path='/password/reset/:token' element={<ResetPassword />} />

                            <Route element={<ProtectedRoute />}>
                                <Route path='/me/profile' element={<Profile />} />
                                <Route path='/update/password' element={<UpdatePassword />} />

                                <Route path='/admin/new/user' element={<RegisterStaff />} />
                                <Route path='/admin/users' element={<AllUsers />} />
                                <Route path='/admin/user/update/:id' element={<UpdateUser />} />
                            </Route>

                        </Routes>
                    )}
                    {/* <Footer /> */}
                </ScrollToTop>
            </div>
        </Router>
    )
}

export default App
