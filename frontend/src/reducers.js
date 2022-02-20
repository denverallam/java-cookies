import { CLEAR_ERRORS, userConstants, productConstants, serviceConstants } from './constants'

export const userReducers = {
    authentication: (state = { user: {} }, action) => {
        switch (action.type) {
            case userConstants.LOGIN_REQUEST:
            case userConstants.LOAD_USER_REQUEST:
                return {
                    loading: true,
                    isAuthenticated: false
                }
    
            case userConstants.LOGIN_SUCCESS:
            case userConstants.LOAD_USER_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    isAuthenticated: true,
                    user: action.payload
                }
    
            case userConstants.LOGOUT_SUCCESS:
                return {
                    loading: false,
                    isAuthenticated: false,
                    user: null
                }
    
            case userConstants.LOAD_USER_FAIL:
                return {
                    loading: false,
                    isAuthenticated: false,
                    user: null,
                    loadError: action.payload
                }
    
            case userConstants.LOGIN_FAIL:
                return {
                    ...state,
                    loading: false,
                    isAuthenticated: false,
                    user: null,
                    error: action.payload
                }
    
            case userConstants.LOGOUT_FAIL:
                return {
                    ...state,
                    error: action.payload
                }
    
            case CLEAR_ERRORS:
                return {
                    ...state,
                    error: null
                }
    
            default:
                return state
        }
    },
    manageUser: (state = { user: {} }, action) => {
        switch (action.type) {
            case userConstants.REGISTER_USER_REQUEST:
            case userConstants.UPDATE_PASSWORD_REQUEST:
            case userConstants.UPDATE_USER_REQUEST:
            case userConstants.DELETE_USER_REQUEST:
                return {
                    ...state,
                    loading: true
                }
    
            case userConstants.REGISTER_USER_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    isCreated: action.payload,
                    message: action.payload.message
                }
    
            case userConstants.UPDATE_PASSWORD_SUCCESS:
            case userConstants.UPDATE_USER_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    isUpdated: action.payload
                }
    
            case userConstants.DELETE_USER_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    isDeleted: action.payload
                }
    
            case userConstants.REGISTER_USER_FAIL:
            case userConstants.UPDATE_PASSWORD_FAIL:
            case userConstants.UPDATE_USER_FAIL:
            case userConstants.DELETE_USER_FAIL:
                return {
                    ...state,
                    loading: false,
                    error: action.payload
                }
    
            case userConstants.REGISTER_USER_RESET:
                return {
                    ...state,
                    loading: false,
                    isCreated: false
                }
    
            case userConstants.UPDATE_PASSWORD_RESET:
            case userConstants.UPDATE_USER_RESET:
                return {
                    ...state,
                    loading: false,
                    isUpdated: false
                }
    
            case userConstants.DELETE_USER_RESET:
                return {
                    ...state,
                    loading: false,
                    isDeleted: false
                }
    
            case CLEAR_ERRORS:
                return {
                    ...state,
                    error: null
                }
    
            default:
                return state
        }
    },
    users: (state = { users: [] }, action) => {
        switch (action.type) {
            case userConstants.ALL_USERS_REQUEST:
                return {
                    loading: true
                }
    
            case userConstants.ALL_USERS_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    users: action.payload.users
                }
    
            case userConstants.ALL_USERS_FAIL:
                return {
                    ...state,
                    loading: false,
                    error: action.payload
                }
    
            case CLEAR_ERRORS:
                return {
                    ...state,
                    error: null
                }
            default:
                return state
        }
    },
    singleUser: (state = { user: {} }, action) => {
        switch (action.type) {
            case userConstants.USER_DETAILS_REQUEST:
                return {
                    ...state,
                    loading: true
                }
    
            case userConstants.USER_DETAILS_SUCCESS:
                return {
                    loading: false,
                    success: action.payload.success,
                    user: action.payload.user
                }
    
            case userConstants.USER_DETAILS_FAIL:
                return {
                    ...state,
                    loading: false,
                    error: action.payload
                }
    
            case CLEAR_ERRORS:
                return {
                    ...state,
                    error: null
                }
            default:
                return state
        }
    },
    passwordReset: (state = {}, action) => {
        switch (action.type) {
    
            case userConstants.FORGOT_PASSWORD_REQUEST:
            case userConstants.NEW_PASSWORD_REQUEST:
                return {
                    ...state,
                    loading: true,
                    error: null
                }
    
            case userConstants.FORGOT_PASSWORD_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    message: action.payload
                }
    
            case userConstants.NEW_PASSWORD_SUCCESS:
                return {
                    ...state,
                    success: action.payload
                }
    
            case userConstants.FORGOT_PASSWORD_FAIL:
            case userConstants.NEW_PASSWORD_FAIL:
                return {
                    ...state,
                    loading: false,
                    error: action.payload
                }
    
            case userConstants.FORGOT_PASSWORD_RESET:
                return {
                    loading: false
                }
    
            case userConstants.NEW_PASSWORD_RESET:
                return {
                    ...state,
                    loading: false
                }
    
            case CLEAR_ERRORS:
                return {
                    ...state,
                    error: null
                }
    
            default:
                return state
        }
    }
}

export const productReducers = {}
export const serviceReducers = {}