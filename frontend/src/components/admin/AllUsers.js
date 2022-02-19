import React, { useEffect } from 'react'
import { useAlert } from 'react-alert'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers, deleteUser, clearErrors } from '../../actions/authActions'
import { DELETE_USER_RESET } from '../../constants/authConstants'

const AllUsers = () => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate()

    const { loading, users, error } = useSelector(state => state.users)
    const { loading: deleteLoading, isDeleted, error: deleteError } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getAllUsers())

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
            
            dispatch({type:DELETE_USER_RESET})
        }
    }, [dispatch, deleteError, alert, isDeleted, error])

    const deleteHandler = (id) => {
        dispatch(deleteUser(id))
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
            ) : <h1>No orders found</h1>}
        </>
    )
}

export default AllUsers