import counterReducer from './counter';
import loggedReducer from './isLogged';
import userReducer from './user';
import postReducer from './post';
import commentReducer from './comment';
import categorieCommentReducer from './commentCategorie';
import categoriePostReducer from './postCategorie';

import { combineReducers } from 'redux';


const allReducers = combineReducers({
    counter: counterReducer,
    isLogged: loggedReducer,
    userInfo: userReducer,
    post:postReducer,
    comment:commentReducer,
    categorieComment:categorieCommentReducer,
    categoriePost:categoriePostReducer

})

export default allReducers