import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools} from 'redux-devtools-extension'

import { userReducers, productReducers, serviceReducers } from './reducers'

const reducer = combineReducers({
    auth: userReducers.authentication,
    user: userReducers.manageUser,
    users: userReducers.users,
    userDetails: userReducers.singleUser,
    forgotPassword: userReducers.passwordReset,
})

let initialState = {}

const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store