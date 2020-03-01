import counterReducer from './counter';
import loggedReducer from './isLogged';
import { combineReducers } from 'redux';
import userReducer from './user';

const allReducers = combineReducers({
    counter: counterReducer,
    isLogged: loggedReducer,
    user: userReducer
})

export default allReducers