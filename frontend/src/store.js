import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools} from 'redux-devtools-extension'

import * as user from './reducers/userReducers'

const reducer = combineReducers({
    auth: user.authReducer,
    user: user.userReducer,
    customer: user.verifyCustomerReducer,
    users: user.usersReducer,
    userDetails: user.userDetailsReducer,
    forgotPassword: user.forgotPasswordReducer,
})

let initialState = {}

const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store