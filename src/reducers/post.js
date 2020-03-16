import {FETCH_POSTS_PENDING, FETCH_POSTS_SUCCESS, FETCH_POSTS_ERROR} from '../actions';
const initialState = {
    pending: false,
    byId: {},
    allIds: [],
    error: null
}
const postReducer = (state = initialState, action)=>{
    switch(action.type) {
        case FETCH_POSTS_PENDING: 
            return {
                ...state,
                pending: true
            }
        case FETCH_POSTS_SUCCESS:
            var postsTemp = {byId: {},allIds : []}
            postsTemp.allIds = action.payload.map(function(val, index){ 
            return val.post_id; 
          })
          
          for(var i = 0;i<action.payload.length;++i){
              postsTemp.byId[action.payload[i].post_id] = action.payload[i]
          }
            return {
                ...state,
                pending: false,
                byId: postsTemp.byId,
                allIds: postsTemp.allIds
            }
        case FETCH_POSTS_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        default: 
            return state;
    }
}
export default postReducer;
