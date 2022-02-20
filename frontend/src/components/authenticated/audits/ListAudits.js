import React, { useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { auditActions, clearErrors } from '../../../actions'

const ListAudits = () => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate()

    const { loading, audits, error } = useSelector(state => state.audits)

    useEffect(() => {
        dispatch(auditActions.getAudits())

        if (error) {
            alert.error(error)
            navigate('/')
            dispatch(clearErrors())
        }

    }, [dispatch, alert, error])

    return (
        <>
            {loading ? <h1>Loading...</h1> : audits ? (
                <>
                    <h1>Audit Log</h1>
                    <table>
                        <thead>
                            <th>Date</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Created By</th>
                        </thead>
                        <tbody>
                            {audits && audits.map(audit => (
                                <>
                                    <tr>
                                        <td>{audit.date}</td>
                                        <td>{audit.name}</td>
                                        <td>{audit.description}</td>
                                        <td>{audit.created_by}</td>
                                    </tr>
                                </>
                            ))}
                        </tbody>
                    </table>
                </>
            ) : <h1>No audits found</h1>}
        </>
    )
}

export default ListAudits