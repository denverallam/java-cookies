import React, { Fragment, useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Form, Button, Card } from 'react-bootstrap'
import { login, clearErrors } from '../../actions/userActions'
import { useNavigate } from "react-router-dom"

const Login = () => {
    const alert = useAlert()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isAuthenticated, user, error, loading } = useSelector(state => state.auth)

    const [userCredentials, setUserCredentials] = useState({
        username: "",
        password: ""
    })

    const { username, password } = userCredentials

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if(isAuthenticated) {
            alert.success(`Welcome ${user.username}`)
            navigate('/')
        }
    }, [dispatch, navigate, alert, error, isAuthenticated])

    const submitHandler = e => {
        e.preventDefault()
        dispatch(login(userCredentials))
    }

    const onChange = e => {
        e.preventDefault() 

        setUserCredentials({
            ...userCredentials,
            [e.target.name]: e.target.value
        })
    }

    return (
        <Fragment>
            <Container fluid style={{ paddingTop: '50px' }}>
                <Card style={{ width: '25rem', margin: 'auto' }}>
                    <Card.Body>
                        <Card.Title>Login</Card.Title>
                        <Form onSubmit={submitHandler}>
                            <Form.Group className="mb-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="text" placeholder="Enter username" name="username" value={username} onChange={onChange} />
                                <Form.Text className="text-muted">
                                    We'll never share your username with anyone else.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={onChange} />
                            </Form.Group>
                            <Button variant="primary" type="submit" disabled={loading ? true : false}>
                                Login
                            </Button>
                            <Link to='/forgot-password'>Forgot password?</Link>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </Fragment>
    )
}

export default Login