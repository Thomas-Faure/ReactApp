import {FETCH_POSTS_PENDING,UPDATE_POSTS_REPORT, FETCH_POSTS_SUCCESS, FETCH_POSTS_ERROR,UPDATE_POST_LIKE} from '../actions';
const initialState = {
    pending: false,
    byId: {},
    allIds: [],
    error: null
}
const postReducer = (state = initialState, action)=>{
    switch(action.type) {
        case UPDATE_POSTS_REPORT:
            return{
                ...state,
                byId:{
                    ...state.byId,
                    [action.payload.id]:{
                        ...state.byId[action.payload.id],
                        reported: action.payload.data
                    }
                }       
            }
        case FETCH_POSTS_PENDING: 
            return {
                ...state,
                pending: true
            }
        
        case UPDATE_POST_LIKE:
            return{
                ...state,
                byId:{
                    ...state.byId,
                    [action.payload.id]:{
                        ...state.byId[action.payload.id],
                        like: action.payload.data
                    }
                }       
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
