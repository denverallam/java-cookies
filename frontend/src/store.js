import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools} from 'redux-devtools-extension'

import * as auth from './reducers/authReducers'

const reducer = combineReducers({
    auth: auth.authReducer,
    user: auth.userReducer,
    customer: auth.verifyCustomerReducer,
    users: auth.usersReducer,
    userDetails: auth.userDetailsReducer,
    forgotPassword: auth.forgotPasswordReducer,
})

let initialState = {}

const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store