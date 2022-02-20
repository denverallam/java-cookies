import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { FloatingLabel, Form, Button, Card, Container, Row } from 'react-bootstrap'
import { userActions, clearErrors } from '../../actions'
import { userConstants } from '../../constants'
import Metadata from './../layout/Metadata'

const ForgotPassword = () => {
    const alert = useAlert()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { error, message, loading } = useSelector(state => state.forgotPassword)

    const [email, setEmail] = useState('')

    const goBack = (path) => {
        if (path === '/login') {
            dispatch({
                type: userConstants.FORGOT_PASSWORD_RESET
            })
        }
        navigate(path)
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
            setEmail('')
            dispatch(clearErrors())
            dispatch({ type: userConstants.FORGOT_PASSWORD_RESET })
        }
    }, [dispatch, alert, error])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(userActions.forgotPassword(email))
    }

    return (
        <Fragment>
            <Metadata title={'Forgot your password?'} />
            <Container fluid style={{ paddingTop: '50px 20px', margin: '40px 0px' }}>
                {message ? (
                    <Fragment>
                        <Container fluid>
                            <Row className='justify-content-md-center'>
                                <Card style={{ maxWidth: '30rem', margin: '50px auto', backgroundColor: "#F5F5F5", borderTop: '7px solid #9c0b0b' }}>
                                    <Card.Body>
                                        <center>
                                            <h3>
                                                <span style={{ color: 'green' }}>
                                                    <i class="fa fa-check" style={{ textAlign: 'center' }}></i>
                                                </span> Email sent</h3>
                                        </center>
                                        <Card.Text style={{ textAlign: 'center', paddingBottom: '50px' }}>A reset password link has been sent to your email. Kindly check your inbox to proceed.</Card.Text>
                                        <center>
                                            <Button variant="outline-primary" onClick={() => goBack('/login')}>
                                                <span>
                                                    <i class="fa fa-home" style={{ textAlign: 'center' }}></i>
                                                </span> Go back home
                                        </Button>
                                        </center>
                                    </Card.Body>
                                </Card>
                            </Row>
                        </Container>
                    </Fragment>
                ) : (
                    <Fragment>
                        <Row className='justify-content-md-center'>
                            <Card style={{ maxWidth: '30rem', margin: '50px auto', backgroundColor: "#F5F5F5", borderTop: '7px solid #9c0b0b' }}>
                                <Card.Body>
                                    <Card.Title style={{ margin: '50px 0 20px 0' }}>Forgot Password?</Card.Title>
                                    <Card.Text style={{ fontSize: '12px' }}>Enter your registered UST GSuite email address. A reset password link will be sent to your inbox.</Card.Text>
                                    <Form onSubmit={submitHandler} encType='application/json' method='post'>
                                        <FloatingLabel label="Email address" className="mb-3">
                                            <Form.Control
                                                type='email'
                                                name="email"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                                required
                                            />
                                        </FloatingLabel>
                                        <center>
                                            <Button
                                                type='button'
                                                style={{ margin: '10px 5px', borderRadius: '50px', width: '10rem' }}
                                                disabled={loading ? true : false}
                                                variant='outline-secondary'
                                                onClick={() => goBack('/')}>
                                                Back
                                            </Button>
                                            <Button
                                                type='submit'
                                                style={{ margin: '10px 5px', borderRadius: '50px', width: '10rem' }}
                                                disabled={loading ? true : false}>
                                                {loading ? (
                                                    <span>
                                                        <i class="fa fa-circle-o-notch fa-spin fa-1x fa-fw" style={{ textAlign: 'center' }}></i>
                                                    </span>
                                                ) : (
                                                    <span>Send Email</span>
                                                )}
                                            </Button>
                                        </center>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Row>
                    </Fragment>
                )}
            </Container>
        </Fragment>
    )
}

export default ForgotPassword
