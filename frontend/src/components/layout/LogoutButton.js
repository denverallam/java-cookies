import React from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { userActions, clearErrors } from '../../actions'

const LogoutButton = () => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate()

    const logoutHandler = () => {
        dispatch(userActions.logout())
        alert.success('Logged out successfully')
        navigate('/')
    }

    return (
        <>
            <Button onClick={logoutHandler} variant={"danger"}> Logout </Button>
        </>
    )
}

export default LogoutButton
