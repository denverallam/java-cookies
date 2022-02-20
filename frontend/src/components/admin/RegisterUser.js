import React, { useState, useEffect } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, register } from '../../actions/userActions'
import { REGISTER_USER_RESET } from '../../constants/userConstants'
import { useNavigate } from "react-router-dom"

const RegisterUser = () => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate()

    const { loading, error, isCreated } = useSelector(state => state.user) 

    const [staff, setStaff] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const { username, email, password, confirmPassword } = staff

    useEffect(() => {
        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if(isCreated) {
            navigate('/')
            alert.success('User successfully created')
            dispatch({type: REGISTER_USER_RESET})
        }
    }, [dispatch, error, isCreated, alert, navigate])
    const submitHandler = e => {
        e.preventDefault()

        dispatch(register(staff, 'staff'))
    }

    const onChange = e => {
        e.preventDefault()

        setStaff({
            ...staff,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
            <Container style={{ width: '50%' }}>
                <h1>Register Staff</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name="email" value={email} onChange={onChange} placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" name="username" value={username} onChange={onChange} placeholder="Enter username" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" value={password} onChange={onChange} placeholder="Password" />
                        <Form.Control type="password" name="confirmPassword" value={confirmPassword} onChange={onChange} placeholder="Confirm Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Register
                </Button>
                </Form>
            </Container>
        </>
    )
}

export default RegisterUser
