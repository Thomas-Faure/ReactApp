import {FETCH_POSTS_PENDING,UPDATE_POSTS_REPORT,DECREASE_COMMENT_COUNTER, FETCH_POSTS_SUCCESS, FETCH_POSTS_ERROR,UPDATE_POST_LIKE,DELETE_POST} from '../actions';
const initialState = {
    pending: false,
    byId: {},
    allIds: [],
    error: null
}
const postReducer = (state = initialState, action)=>{
    switch(action.type) {
      
        case DECREASE_COMMENT_COUNTER:
            console.log(state.byId[action.payload])
            return{
                ...state,
                byId:{
                    ...state.byId,
                    [action.payload]:{
                        ...state.byId[action.payload],
                        comment: (state.byId[action.payload].comment)-1
                    }
                } 
            }
    
        case DELETE_POST:
            var byIdTemp = state.byId
            const { [action.payload]: ignored, ...finalById } = byIdTemp;
            var allIds = state.allIds.filter(el=>el != action.payload)
            return{
                ...state,
                byId:finalById,
                allIds:allIds

            }
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
