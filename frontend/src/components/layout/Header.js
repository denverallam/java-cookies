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
                            <NavDropdown title="Admin" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/admin/new/user">Register user (Admin)</NavDropdown.Item>
                                <NavDropdown.Item href="/admin/users">All users (Admin)</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/">Create Product</NavDropdown.Item>
                                <NavDropdown.Item href="/">Get All Products</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/">Create Service</NavDropdown.Item>
                                <NavDropdown.Item href="/">Get All Services</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Staff" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/">Create Product</NavDropdown.Item>
                                <NavDropdown.Item href="/">Get All Products</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/">Create Service</NavDropdown.Item>
                                <NavDropdown.Item href="/">Get All Services</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header