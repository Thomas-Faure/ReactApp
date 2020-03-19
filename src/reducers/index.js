
import loggedReducer from './isLogged';
import userReducer from './user';
import postReducer from './post';
import userListReducer from './userList';
import commentReducer from './comment';
import categorieCommentReducer from './commentCategorie';
import categoriePostReducer from './postCategorie';
import PopUpReducer from './popUp'
import bestAnswer from './bestAnswer'
import languageReducer from './language'
import { combineReducers } from 'redux';


const allReducers = combineReducers({
    isLogged: loggedReducer,
    userInfo: userReducer,
    post:postReducer,
    userList:userListReducer,
    user:userReducer,
    comment:commentReducer,
    categorieComment:categorieCommentReducer,
    categoriePost:categoriePostReducer,
    popUp:PopUpReducer,
    bestAnswer:bestAnswer,
    language:languageReducer
})

export default allReducers