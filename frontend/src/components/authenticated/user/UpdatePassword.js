import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updatePassword, clearErrors } from '../../../actions/userActions'
import { UPDATE_PASSWORD_RESET } from '../../../constants/userConstants'
import { useNavigate } from "react-router-dom"
import Metadata from '../../layout/Metadata'

const UpdatePassword = () => {
    const alert = useAlert()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { error, isUpdated, loading } = useSelector(state => state.user)
    const { user } = useSelector(state => state.auth)

    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    useEffect(() => {
        if(!user) {
            navigate('/')
            alert.error('Unable to access this page. Please log in first')
        }

        if (isUpdated) {
            navigate('/profile')
            alert.success('Password updated successfully')
            dispatch({
                type: UPDATE_PASSWORD_RESET
            })
        }

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

    }, [dispatch, alert, error, isUpdated, user, navigate])

    const submitHandler = e => {
        e.preventDefault()

        dispatch(updatePassword({ oldPassword, password, confirmPassword }))
    }

    return (
        <>
            <Metadata title={'Update Password'} />
            <form onSubmit={submitHandler}>
                <input type="password" name="oldPassword" value={oldPassword} onChange={e => setOldPassword(e.target.value)} placeholder="old password"/>
                <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="password"/>
                <input type="password" name="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="confirm password"/>
                <input type="submit" value="Submit" disabled={loading ? true : false} />
            </form>
        </>
    )
}

export default UpdatePassword
