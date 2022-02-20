import React, { useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { categoryActions, clearErrors } from '../../../actions'
import { categoryConstants } from '../../../constants'

const ListCategories = () => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate()

    const { loading, categories, error } = useSelector(state => state.categories)
    const { loading: deleteLoading, isDeleted, error: deleteError } = useSelector(state => state.category)

    useEffect(() => {
        dispatch(categoryActions.getCategories())

        if (error) {
            alert.error(error)
            navigate('/')
            dispatch(clearErrors())
        }

        if (deleteError) {
            navigate('/admin/categories')
            alert.error(deleteError)
            dispatch(clearErrors())
        }

        if(isDeleted) {
            alert.success('Category has been deleted')
            
            dispatch({type: categoryConstants.DELETE_CATEGORY_RESET})
        }
    }, [dispatch, deleteError, alert, isDeleted, error])

    const deleteHandler = (id) => {
        dispatch(categoryActions.deleteCategory(id))
    }

    return (
        <>
            {loading ? <h1>Loading...</h1> : categories ? (
                <>
                    <h1>Category List</h1>
                    <table>
                        <thead>
                            <th>Name</th>
                            <th>Created By</th>
                            <th>Actions</th>
                        </thead>
                        <tbody>
                            {categories && categories.map(category => (
                                <>
                                    <tr>
                                        <td>{category.name}</td>
                                        <td>{category.created_by}</td>
                                        <td>
                                            <button onClick={() => {
                                                deleteHandler(category._id)
                                            }} disabled={deleteLoading ? true : false}>Delete</button>
                                        </td>
                                    </tr>
                                </>
                            ))}
                        </tbody>
                    </table>
                </>
            ) : <h1>No categories found</h1>}
        </>
    )
}

export default ListCategories