import counterReducer from './counter';
import loggedReducer from './isLogged';
import userReducer from './user';
import postReducer from './post';
import userListReducer from './userList';
import commentReducer from './comment';
import categorieCommentReducer from './commentCategorie';
import categoriePostReducer from './postCategorie';
import PopUpReducer from './popUp'

import { combineReducers } from 'redux';


const allReducers = combineReducers({
    counter: counterReducer,
    isLogged: loggedReducer,
    userInfo: userReducer,
    post:postReducer,
    userList:userListReducer,
    user:userReducer,
    comment:commentReducer,
    categorieComment:categorieCommentReducer,
    categoriePost:categoriePostReducer,
    popUp:PopUpReducer
})

export default allReducers