import counterReducer from './counter';
import loggedReducer from './isLogged';
import userReducer from './user';
import postReducer from './post'
import { combineReducers } from 'redux';


const allReducers = combineReducers({
    counter: counterReducer,
    isLogged: loggedReducer,
    userInfo: userReducer,
    post:postReducer
})

export default allReducers