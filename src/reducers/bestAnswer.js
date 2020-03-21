import {FETCH_BEST_ANSWER_PENDING, FETCH_BEST_ANSWER_SUCCESS, FETCH_BEST_ANSWER_ERROR, CHANGE_BEST_ANSWER} from '../actions';
const initialState = {
    pending: false,
    byId: [],
    allIds: [],
    error: null
}
const bestAnswer = (state = initialState, action)=>{
    switch(action.type) {
        case CHANGE_BEST_ANSWER:
            var byIdTemp = state.byId
            const { [action.payload.idPost]: ignored, ...finalById } = byIdTemp;
            
            if(action.payload.comment !=null && action.payload.comment != undefined){
                finalById[action.payload.idPost]=action.payload.comment
                var allIds = state.allIds
            }else{
                var allIds = state.allIds.filter(el=>el != action.payload.idPost)
            }
            
            return{
                ...state,
                byId:finalById,
                allIds:allIds

            }
            
        case FETCH_BEST_ANSWER_PENDING: 
            return {
                ...state,
                pending: true
            }
        case FETCH_BEST_ANSWER_SUCCESS:
            var bestTemp = {byId: {},allIds : []}
            bestTemp.allIds = action.payload.map(function(val, index){ 
            return val.post; 
          })
          
          for(var i = 0;i<action.payload.length;++i){
              bestTemp.byId[action.payload[i].post] = action.payload[i]
          }
            return {
                ...state,
                pending: false,
                byId: bestTemp.byId,
                allIds: bestTemp.allIds
            }
        case FETCH_BEST_ANSWER_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        default: 
            return state;
    }
}
export default bestAnswer;
