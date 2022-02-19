import axios from 'axios'
import * as auth from '../constants/authConstants'

export const login = (user) => async (dispatch) => {
    try {
        dispatch({
            type: auth.LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/v1/login', user, config)

        dispatch({
            type: auth.LOGIN_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: auth.LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}

export const logout = () => async (dispatch) => {
    try {
        dispatch({
            type: auth.LOGOUT_REQUEST
        })

        await axios.get('/api/v1/logout')

        dispatch({
            type: auth.LOGOUT_SUCCESS
        })

    } catch (error) {
        dispatch({
            type: auth.LOGOUT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: auth.LOAD_USER_REQUEST
        })

        const { data } = await axios.get('/api/v1/me/profile')

        dispatch({
            type: auth.LOAD_USER_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: auth.LOAD_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({
            type: auth.ALL_USERS_REQUEST
        })

        const { data } = await axios.get('/api/v1/users/all')

        dispatch({
            type: auth.ALL_USERS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: auth.ALL_USERS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getUser = (id) => async (dispatch) => {
    try {
        dispatch({
            type: auth.USER_DETAILS_REQUEST
        })

        const { data } = await axios.get(`/api/v1/user/${id}`)

        dispatch({
            type: auth.USER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: auth.USER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateUser = (id, user) => async (dispatch) => {
    try {
        dispatch({
            type: auth.UPDATE_USER_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/user/update/${id}`, user, config)

        dispatch({
            type: auth.UPDATE_USER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: auth.UPDATE_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({
            type: auth.DELETE_USER_REQUEST
        })

        const { data } = await axios.delete(`/api/v1/user/delete/${id}`)

        dispatch({
            type: auth.DELETE_USER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: auth.DELETE_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const register = (user, role) => async (dispatch) => {
    try {
        dispatch({
            type: auth.REGISTER_USER_REQUEST
        })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post(`/api/v1/user/new`, user, config)

        dispatch({
            type: auth.REGISTER_USER_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: auth.REGISTER_USER_FAIL,
            payload: error.response.data.message
        })
    }

}

export const updatePassword = (passwords) => async (dispatch) => {
    try {
        dispatch({
            type: auth.UPDATE_PASSWORD_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put('/api/v1/update/password', passwords, config)

        dispatch({
            type: auth.UPDATE_PASSWORD_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: auth.UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}


//forgot password
export const forgotPassword = (email) => async (dispatch) => {
    try {

        dispatch({ type: auth.FORGOT_PASSWORD_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/v1/password/forgot', { email }, config)

        dispatch({
            type: auth.FORGOT_PASSWORD_SUCCESS,
            payload: data.message
        })

    }
    catch (error) {
        dispatch({
            type: auth.FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}

//reset password
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
        dispatch({
            type: auth.NEW_PASSWORD_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/password/reset/${token}`, passwords, config)

        dispatch({
            type: auth.NEW_PASSWORD_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: auth.NEW_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: auth.CLEAR_ERRORS
    })
}