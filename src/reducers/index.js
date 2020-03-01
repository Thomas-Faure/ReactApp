import counterReducer from './counter';
import loggedReducer from './isLogged';
import userReducer from './user';
import { combineReducers } from 'redux';


const allReducers = combineReducers({
    counter: counterReducer,
    isLogged: loggedReducer,
    userInfo: userReducer
})

export default allReducers