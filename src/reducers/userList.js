
import {FETCH_USERS_PENDING, FETCH_USERS_SUCCESS, FETCH_USERS_ERROR,FETCH_USER_BY_ID_SUCCESS} from '../actions';
const initialState = {
    pending: false,
    byId: {},
    allIds: [],
    error: null
}
const userListReducer = (state = initialState, action)=>{
    switch(action.type) {
        case FETCH_USERS_PENDING: 
            return {
                ...state,
                pending: true
            }
     
        case FETCH_USERS_SUCCESS:
            console.log("coucou")
            var usersTemp = {byId: {},allIds : []}
            usersTemp.allIds = action.payload.map(function(val, index){ 
            return val.user_id; 
          })
          
          for(var i = 0;i<action.payload.length;++i){
              usersTemp.byId[action.payload[i].user_id] = action.payload[i]
          }
            return {
                ...state,
                pending: false,
                byId: usersTemp.byId,
                allIds: usersTemp.allIds
            }
        case FETCH_USERS_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        default: 
            return state;
    }
}
export default userListReducer;