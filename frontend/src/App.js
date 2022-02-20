import './App.css';
import { useEffect, useLayoutEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { loadUser } from './actions/userActions'
import store from './store'

import Header from './components/layout/Header'

import ProtectedRoute from './components/routes/ProtectedRoute'
import AuthenticatedRoute from './components/routes/AuthenticatedRoute'

import Home from './components/home/Home'
import Login from './components/home/Login'
import ForgotPassword from './components/home/ForgotPassword'
import ResetPassword from './components/home/ResetPassword'

import Profile from './components/authenticated/user/Profile'
import UpdatePassword from './components/authenticated/user/UpdatePassword'

import RegisterUser from './components/admin/RegisterUser'
import ListUsers from './components/admin/ListUsers'
import UpdateUser from './components/admin/UpdateUser'

import ListProducts from './components/authenticated/products/ListProducts'
import CreateProduct from './components/authenticated/products/CreateProduct'
import UpdateProduct from './components/authenticated/products/UpdateProduct'

import ListServices from './components/authenticated/services/ListServices'
import CreateService from './components/authenticated/services/CreateService'
import UpdateService from './components/authenticated/services/UpdateService'

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
                            <Route path='/forgot-password' element={<ForgotPassword />} />
                            <Route path='/reset/:token' element={<ResetPassword />} />

                            <Route element={<AuthenticatedRoute />}>
                                <Route path='/profile' element={<Profile />} />
                                <Route path='/password/update' element={<UpdatePassword />} />

                                <Route path='/admin/products' element={<ListProducts />} />
                                <Route path='/admin/product/new' element={<CreateProduct />} />
                                <Route path='/admin/product/:id' element={<UpdateProduct />} />

                                <Route path='/admin/services' element={<ListServices />} />
                                <Route path='/admin/service/new' element={<CreateService />} />
                                <Route path='/admin/service/:id' element={<UpdateService />} />
                            </Route>

                            <Route element={<ProtectedRoute />}>
                                <Route path='/admin/new/user' element={<RegisterUser />} />
                                <Route path='/admin/users' element={<ListUsers />} />
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
