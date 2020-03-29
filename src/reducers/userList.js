
import {FETCH_USERS_PENDING,REMOVE_USER, FETCH_USERS_SUCCESS, FETCH_USERS_ERROR,FETCH_USER_BY_ID_SUCCESS,ADD_NEW_USER_TO_LIST,UPDATE_USER} from '../actions';
const initialState = {
    pending: false,
    byId: {},
    allIds: [],
    error: null
}
/*
* Réduceur permettant le stockage de tout les utilisateurs
*
*/
const userListReducer = (state = initialState, action)=>{
    switch(action.type) {
        case REMOVE_USER:
            var byIdTemp = state.byId
            const { [action.payload]: ignored, ...finalById } = byIdTemp;
            var allIds = state.allIds.filter(el=>el != action.payload)
            return{
                ...state,
                byId:finalById,
                allIds:allIds
            }
        case UPDATE_USER:
            return{
                ...state,
                byId:{
                    ...state.byId,
                    [action.payload.id]:{
                        ...state.byId[action.payload.id],
                        username: action.payload.username,
                        firstname: action.payload.firstname,
                        lastname: action.payload.lastname,
                        birthday: action.payload.birthday,
                        mail: action.payload.mail,
                        sexe: action.payload.sexe,
                        admin: action.payload.admin,
                        
                    }
                } 

            }
        case ADD_NEW_USER_TO_LIST:
            var allIds = state.allIds
            allIds.push(action.payload.user_id)
            var byId = state.byId
            byId[action.payload.user_id]=action.payload
            return{
                ...state,
                allIds: allIds,
                byId: byId
            }
        case FETCH_USERS_PENDING: 
            return {
                ...state,
                pending: true
            }
     
        case FETCH_USERS_SUCCESS:

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