import React, { useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser, logout, clearErrors } from '../../actions/authActions'
import { Link, useNavigate } from "react-router-dom"
import Logout from "../layout/Logout"
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'

const Header = () => {
    const dispatch = useDispatch()

    const { user } = useSelector(state => state.auth)

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>

                            {user ? <>
                                <NavDropdown title={user.username} id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/me/profile">My Profile</NavDropdown.Item>
                                    <NavDropdown.Item href="/update/password">Update Password</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item><Logout/></NavDropdown.Item>
                                </NavDropdown>
                            </> : <>
                                <Nav.Link href='/login'>Login</Nav.Link>
                                <Nav.Link href='/register'>Register</Nav.Link>
                            </>}
                            <NavDropdown title="Products" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/products">All Products (Home)</NavDropdown.Item>
                                <NavDropdown.Item href="/admin/new/product">Create product (Admin)</NavDropdown.Item>
                                <NavDropdown.Item href="/admin/products">All Products (Admin)</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Users" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/admin/new/user">Register user (Admin)</NavDropdown.Item>
                                <NavDropdown.Item href="/admin/users">All users (Admin)</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href='/me/cart'>Cart</Nav.Link>
                            <NavDropdown title="Orders" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/me/orders">My Orders</NavDropdown.Item>
                                <NavDropdown.Item href="/admin/orders">All Orders (Admin)</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header