import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LogoutButton from "../layout/LogoutButton"
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'

const Header = () => {
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
                                    <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
                                    <NavDropdown.Item href="/password/update">Update Password</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item><LogoutButton /></NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown title="Admin" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/admin/new/user">Register user (Admin)</NavDropdown.Item>
                                    <NavDropdown.Item href="/admin/users">All users (Admin)</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="/admin/product/new">Create Product</NavDropdown.Item>
                                    <NavDropdown.Item href="/admin/products">Get All Products</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="/admin/service/new">Create Service</NavDropdown.Item>
                                    <NavDropdown.Item href="/admin/services">Get All Services</NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown title="Staff" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/admin/product/new">Create Product</NavDropdown.Item>
                                    <NavDropdown.Item href="/admin/products">Get All Products</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="/admin/service/new">Create Service</NavDropdown.Item>
                                    <NavDropdown.Item href="/admin/services">Get All Services</NavDropdown.Item>
                                </NavDropdown>
                            </> : <>
                                <Nav.Link href='/login'>Login</Nav.Link>
                            </>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header