import {FETCH_COMMENTS_PENDING, FETCH_COMMENTS_SUCCESS, FETCH_COMMENTS_ERROR,UPDATE_COMMENTS_REPORT} from '../actions';
const initialState = {
    pending: false,
    byId: [],
    allIds: [],
    error: null
}
const commentReducer = (state = initialState, action)=>{
    switch(action.type) {

        case UPDATE_COMMENTS_REPORT:
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
        case FETCH_COMMENTS_PENDING: 
            return {
                ...state,
                pending: true
            }
        case FETCH_COMMENTS_SUCCESS:
              var commentsTemp = {byId: {},allIds : []}
              commentsTemp.allIds = action.payload.map(function(val, index){ 
              return val.comment_id; 
            })
            
            for(var i = 0;i<action.payload.length;++i){
                commentsTemp.byId[action.payload[i].comment_id] = action.payload[i]
            }
            return {
                ...state,
                pending: false,
                byId: commentsTemp.byId,
                allIds: commentsTemp.allIds
            }
        case FETCH_COMMENTS_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        default: 
            return state;
    }
}
export default commentReducer;