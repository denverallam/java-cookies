import React, { useEffect } from 'react'
import { useAlert } from 'react-alert'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userActions, clearErrors } from '../../../actions'
import { userConstants } from '../../../constants'

const ListUsers = () => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate()

    const { loading, users, error } = useSelector(state => state.users)
    const { isDeleted, error: deleteError } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(userActions.getUsers())

        if (error) {
            alert.error(error)
            navigate('/')
            dispatch(clearErrors())
        }

        if (deleteError) {
            navigate('/admin/users')
            alert.error(deleteError)
            dispatch(clearErrors())
        }

        if(isDeleted) {
            alert.success('User has been deleted')
            
            dispatch({type: userConstants.DELETE_USER_RESET})
        }
    }, [dispatch, deleteError, alert, isDeleted, error])

    const deleteHandler = (id) => {
        dispatch(userActions.deleteUser(id))
    }

    return (
        <>
            {loading ? <h1>Loading...</h1> : users ? (
                <>
                    <h1>All users</h1>
                    <table>
                        <thead>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </thead>
                        <tbody>
                            {users && users.map(user => (
                                <>
                                    <tr>
                                        <td>{user.first_name} {user.last_name}</td>
                                        <td>{user.username}</td>
                                        <td>{user.role}</td>
                                        <td>
                                            <Link to={`/admin/user/update/${user._id}`}>Update</Link>
                                            <button onClick={() => {
                                                deleteHandler(user._id)
                                            }} disabled={user.role === 'Admin' ? true : false}>Delete</button>
                                        </td>
                                    </tr>
                                </>
                            ))}
                        </tbody>
                    </table>
                </>
            ) : <h1>No users found</h1>}
        </>
    )
}

export default ListUsers