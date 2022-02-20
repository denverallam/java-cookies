import React, { useState, useEffect } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, categoryActions } from '../../../actions'
import { categoryConstants } from '../../../constants'
import { useNavigate } from "react-router-dom"

const CreateCategory = () => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate()

    const { loading, error, isCreated } = useSelector(state => state.category)

    const [name, setName] = useState('')

    useEffect(() => {
        if (error) {
            alert.error(error)
            navigate('/admin/categories')
            dispatch(clearErrors())
        }

        if (isCreated) {
            navigate('/admin/categories')
            alert.success('Category successfully created')
            dispatch({ type: categoryConstants.NEW_CATEGORY_RESET })
        }
    }, [dispatch, error, isCreated, alert, navigate])
    
    const submitHandler = e => {
        e.preventDefault()

        dispatch(categoryActions.createCategory({ name }))
    }

    return (
        <>
            <Container style={{ width: '50%' }}>
                <h1>New Category</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3">
                        <Form.Label>Category Name</Form.Label>
                        <Form.Control type="text" name="name" value={name} onChange={e => setName(e.target.value)} placeholder="Enter name" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Create
                </Button>
                </Form>
            </Container>
        </>
    )
}

export default CreateCategory
