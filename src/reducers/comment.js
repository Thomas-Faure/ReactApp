import {FETCH_COMMENTS_PENDING,UPDATE_COMMENT, FETCH_COMMENTS_SUCCESS, FETCH_COMMENTS_ERROR,UPDATE_COMMENTS_REPORT,UPDATE_COMMENTS_RATE,DELETE_COMMENT} from '../actions';
const initialState = {
    pending: false,
    byId: {},
    allIds: [],
    error: null
}
const commentReducer = (state = initialState, action)=>{
    switch(action.type) {

  
        case UPDATE_COMMENT:
            return{
                ...state,
                byId:{
                    ...state.byId,
                    [action.payload.comment_id]:{
                        ...state.byId[action.payload.comment_id],
                        comment_category: action.payload.comment_category,
                        description: action.payload.description, 
                    }
                }  
            }
        case DELETE_COMMENT:
            var byIdTemp = state.byId
            const { [action.payload]: ignored, ...finalById } = byIdTemp;
            var allIds = state.allIds.filter(el=>el != action.payload)
            return{
                ...state,
                byId:finalById,
                allIds:allIds

            }

        case UPDATE_COMMENTS_RATE:
            var like = state.byId[action.payload.id].like
            var dislike = state.byId[action.payload.id].dislike
            var rated = undefined
            if(state.byId[action.payload.id].rated == undefined){
                if(action.payload.like == true){
                   
                    like = like +1
                    rated = 1
                }else{
                
                    like = like -1
                    rated = -1
                }
            }else if(state.byId[action.payload.id].rated == 1){
                if(action.payload.info == "updated"){
                   
                    like = like - 1
                    dislike = dislike +1
                    rated = -1
                }else if(action.payload.info == "deleted"){
               
                    like = like - 1
                    rated = undefined
                }

            }else if(state.byId[action.payload.id].rated == -1){
                if(action.payload.info == "updated"){
                
                    like = like + 1
                    dislike = dislike-1
                    rated = 1
                }else if(action.payload.info == "deleted"){
                
                    dislike = dislike - 1
                    rated = undefined
                }
            }
            return{
                ...state,
                byId:{
                    ...state.byId,
                    [action.payload.id]:{
                        ...state.byId[action.payload.id],
                        like: like,
                        dislike: dislike,
                        rated: rated
                    }
                }       
            }
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