import axios from 'axios'
import { CLEAR_ERRORS, userConstants } from './constants'

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}

export const userActions = {

    login: (user) => async (dispatch) => {
        try {
            dispatch({
                type: userConstants.LOGIN_REQUEST
            })
    
            const { data } = await axios.post('/api/v1/login', user, config)
    
            dispatch({
                type: userConstants.LOGIN_SUCCESS,
                payload: data.user
            })
    
        } catch (error) {
            dispatch({
                type: userConstants.LOGIN_FAIL,
                payload: error.response.data.message
            })
        }
    }, 

    logout: () => async (dispatch) => {
        try {
            dispatch({
                type: userConstants.LOGOUT_REQUEST
            })
    
            await axios.get('/api/v1/logout')
    
            dispatch({
                type: userConstants.LOGOUT_SUCCESS
            })
    
        } catch (error) {
            dispatch({
                type: userConstants.LOGOUT_FAIL,
                payload: error.response.data.message
            })
        }
    },

    loadUser: () => async (dispatch) => {
        try {
            dispatch({
                type: userConstants.LOAD_USER_REQUEST
            })
    
            const { data } = await axios.get('/api/v1/me/profile')
    
            dispatch({
                type: userConstants.LOAD_USER_SUCCESS,
                payload: data.user
            })
    
        } catch (error) {
            dispatch({
                type: userConstants.LOAD_USER_FAIL,
                payload: error.response.data.message
            })
        }
    },

    getUsers: () => async (dispatch) => {
        try {
            dispatch({
                type: userConstants.ALL_USERS_REQUEST
            })
    
            const { data } = await axios.get('/api/v1/users/all')
    
            dispatch({
                type: userConstants.ALL_USERS_SUCCESS,
                payload: data
            })
    
        } catch (error) {
            dispatch({
                type: userConstants.ALL_USERS_FAIL,
                payload: error.response.data.message
            })
        }
    },

    getUser: (id) => async (dispatch) => {
        try {
            dispatch({
                type: userConstants.USER_DETAILS_REQUEST
            })
    
            const { data } = await axios.get(`/api/v1/user/${id}`)
    
            dispatch({
                type: userConstants.USER_DETAILS_SUCCESS,
                payload: data
            })
    
        } catch (error) {
            dispatch({
                type: userConstants.USER_DETAILS_FAIL,
                payload: error.response.data.message
            })
        }
    },

    updateUser: (id, user) => async (dispatch) => {
        try {
            dispatch({
                type: userConstants.UPDATE_USER_REQUEST
            })
    
            const { data } = await axios.put(`/api/v1/user/update/${id}`, user, config)
    
            dispatch({
                type: userConstants.UPDATE_USER_SUCCESS,
                payload: data.success
            })
    
        } catch (error) {
            dispatch({
                type: userConstants.UPDATE_USER_FAIL,
                payload: error.response.data.message
            })
        }
    },

    deleteUser: (id) => async (dispatch) => {
        try {
            dispatch({
                type: userConstants.DELETE_USER_REQUEST
            })
    
            const { data } = await axios.delete(`/api/v1/user/delete/${id}`)
    
            dispatch({
                type: userConstants.DELETE_USER_SUCCESS,
                payload: data.success
            })
    
        } catch (error) {
            dispatch({
                type: userConstants.DELETE_USER_FAIL,
                payload: error.response.data.message
            })
        }
    },

    register: (user, role) => async (dispatch) => {
        try {
            dispatch({
                type: userConstants.REGISTER_USER_REQUEST
            })
        
            const { data } = await axios.post(`/api/v1/user/new`, user, config)
    
            dispatch({
                type: userConstants.REGISTER_USER_SUCCESS,
                payload: data.user
            })
        } catch (error) {
            dispatch({
                type: userConstants.REGISTER_USER_FAIL,
                payload: error.response.data.message
            })
        }
    
    },

    updatePassword: (passwords) => async (dispatch) => {
        try {
            dispatch({
                type: userConstants.UPDATE_PASSWORD_REQUEST
            })
    
            const { data } = await axios.put('/api/v1/update/password', passwords, config)
    
            dispatch({
                type: userConstants.UPDATE_PASSWORD_SUCCESS,
                payload: data.user
            })
        } catch (error) {
            dispatch({
                type: userConstants.UPDATE_PASSWORD_FAIL,
                payload: error.response.data.message
            })
        }
    },

    forgotPassword: (email) => async (dispatch) => {
        try {
    
            dispatch({ type: userConstants.FORGOT_PASSWORD_REQUEST })
    
            const { data } = await axios.post('/api/v1/password/forgot', { email }, config)
    
            dispatch({
                type: userConstants.FORGOT_PASSWORD_SUCCESS,
                payload: data.message
            })
    
        }
        catch (error) {
            dispatch({
                type: userConstants.FORGOT_PASSWORD_FAIL,
                payload: error.response.data.message
            })
        }
    },
    
    resetPassword: (token, passwords) => async (dispatch) => {
        try {
            dispatch({
                type: userConstants.NEW_PASSWORD_REQUEST
            })
    
            const { data } = await axios.put(`/api/v1/password/reset/${token}`, passwords, config)
    
            dispatch({
                type: userConstants.NEW_PASSWORD_SUCCESS,
                payload: data.success
            })
    
        } catch (error) {
            dispatch({
                type: userConstants.NEW_PASSWORD_FAIL,
                payload: error.response.data.message
            })
        }
    }
}

export const productActions = {}
export const serviceActions = {}