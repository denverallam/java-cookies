import * as user from '../constants/userConstants'

export const authReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case user.LOGIN_REQUEST:
        case user.LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false
            }

        case user.LOGIN_SUCCESS:
        case user.LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }

        case user.LOGOUT_SUCCESS:
            return {
                loading: false,
                isAuthenticated: false,
                user: null
            }

        case user.LOAD_USER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                loadError: action.payload
            }

        case user.LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }

        case user.LOGOUT_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case user.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case user.REGISTER_USER_REQUEST:
        case user.UPDATE_PASSWORD_REQUEST:
        case user.UPDATE_USER_REQUEST:
        case user.DELETE_USER_REQUEST:
            return {
                ...state,
                loading: true
            }

        case user.REGISTER_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isCreated: action.payload,
                message: action.payload.message
            }

        case user.UPDATE_PASSWORD_SUCCESS:
        case user.UPDATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }

        case user.DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case user.REGISTER_USER_FAIL:
        case user.UPDATE_PASSWORD_FAIL:
        case user.UPDATE_USER_FAIL:
        case user.DELETE_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case user.REGISTER_USER_RESET:
            return {
                ...state,
                loading: false,
                isCreated: false
            }

        case user.UPDATE_PASSWORD_RESET:
        case user.UPDATE_USER_RESET:
            return {
                ...state,
                loading: false,
                isUpdated: false
            }

        case user.DELETE_USER_RESET:
            return {
                ...state,
                loading: false,
                isDeleted: false
            }

        case user.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const usersReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case user.ALL_USERS_REQUEST:
            return {
                loading: true
            }

        case user.ALL_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload.users
            }

        case user.ALL_USERS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case user.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case user.USER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case user.USER_DETAILS_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                user: action.payload.user
            }

        case user.USER_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case user.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

//forgot password and set new password
export const forgotPasswordReducer = (state = {}, action) => {
    switch (action.type) {

        case user.FORGOT_PASSWORD_REQUEST:
        case user.NEW_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }

        case user.FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload
            }

        case user.NEW_PASSWORD_SUCCESS:
            return {
                ...state,
                success: action.payload
            }

        case user.FORGOT_PASSWORD_FAIL:
        case user.NEW_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case user.FORGOT_PASSWORD_RESET:
            return {
                loading: false
            }

        case user.NEW_PASSWORD_RESET:
            return {
                ...state,
                loading: false
            }

        case user.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}