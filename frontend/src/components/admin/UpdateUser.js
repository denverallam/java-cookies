import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, updateUser, clearErrors } from '../../actions/userActions'
import { userConstants } from '../../constants'
// import { INSIDE_DASHBOARD_TRUE } from '../../../constants/dashboardConstants'
import Metadata from '../layout/Metadata'
// import Loader from '../../layout/Loader'

const UpdateUser = () => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate()
    const { id } = useParams()

    const { user, error, loading } = useSelector(state => state.userDetails)
    const { error: updateError, loading: updateLoading, isUpdated } = useSelector(state => state.user)

    const [userDetails, setUserDetails] = useState({
        username: "",
        email: "",
        role: ""
    })
    const { username, email, role } = userDetails

    useEffect(() => {
        if(user && user._id !== id) {
            dispatch(getUser(id))
        } else if (user) {
            setUserDetails({
                username: user.username,
                email: user.email,
                role: user.role
            })
        } else {
        dispatch(getUser(id))
        }

        if (isUpdated) {
            alert.success('User has beed updated')
            navigate('/admin/users')
            dispatch({ type: userConstants.UPDATE_USER_RESET })
        }

        if (error) {
            navigate('/')
            alert.error(error)
            dispatch(clearErrors())
        }

        if (updateError) {
            navigate('/admin/users')
            alert.error(updateError)
            dispatch(clearErrors())
        }

    }, [dispatch, alert, error, updateError, navigate, user, isUpdated])

    const updateHandler = e => {
        e.preventDefault()

        dispatch(updateUser(id, userDetails))
    }
    
    const onChange = e => {
        e.preventDefault()

        setUserDetails({
            ...userDetails,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
            <Metadata title={'Update User'} />
            {loading ? <h1>Loading</h1>
                : <>
                    <form onSubmit={updateHandler}>
                        <input type="email" value={email} name="email" onChange={onChange}/>
                        <input type="text" value={username} name="username" onChange={onChange}/>
                        
                        <select name="role" value={role} onChange={onChange}>
                            <option disabled>-</option>
                            <option value={"Staff"}>Staff</option>
                            <option value={"Admin"}>Admin</option>
                        </select>
                        {/* <input type="text" value={role} onChange={e => setRole(e.target.value)} name="role"/> */}
                        <input type="submit" value="Submit" disabled={updateLoading ? true : false}/>
                    </form>
                </>}
        </>
    )
}

export default UpdateUser
