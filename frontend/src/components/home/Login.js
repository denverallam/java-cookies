import React, { Fragment, useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Form, Button, Card } from 'react-bootstrap'
import { login, clearErrors } from '../../actions/authActions'
import { useNavigate } from "react-router-dom"

const Login = () => {
    const alert = useAlert()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isAuthenticated, error, loading } = useSelector(state => state.auth)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if(isAuthenticated) {
            alert.success("Logged in successfully.")
            navigate('/')
        }
    }, [dispatch, navigate, alert, error, isAuthenticated])

    const submitHandler = e => {
        e.preventDefault()

        dispatch(login({username, password}))
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
                                <Form.Control type="text" placeholder="Enter username" name="username" value={username} onChange={e => setUsername(e.target.value)} />
                                <Form.Text className="text-muted">
                                    We'll never share your username with anyone else.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
                            </Form.Group>
                            <Button variant="primary" type="submit" disabled={loading ? true : false}>
                                Login
                            </Button>
                            <Link to='/password/forgot'>Forgot password?</Link>
                            <Link to='/register'>Sign up</Link>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </Fragment>
    )
}

export default Login