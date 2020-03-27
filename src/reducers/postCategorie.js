import {FETCH_POST_CATEGORIES_PENDING,REMOVE_POST_CATEGORIE, FETCH_POST_CATEGORIES_SUCCESS, FETCH_POST_CATEGORIES_ERROR} from '../actions';
const initialState = {
    pending: false,
    byId: {},
    allIds: [],
    error: null
}
const categoriePostReducer = (state = initialState, action)=>{
    switch(action.type) {
        case REMOVE_POST_CATEGORIE:
            var byIdTemp = state.byId
            const { [action.payload]: ignored, ...finalById } = byIdTemp;
            var allIds = state.allIds.filter(el=>el != action.payload)
            return{
                ...state,
                byId:finalById,
                allIds:allIds

            }
        case FETCH_POST_CATEGORIES_PENDING: 
            return {
                ...state,
                pending: true
            }
        case FETCH_POST_CATEGORIES_SUCCESS:
            var catTemp = {byId: {},allIds : []}
            catTemp.allIds = action.payload.map(function(val, index){ 
            return val.post_category_id; 
          })
          
          for(var i = 0;i<action.payload.length;++i){
            catTemp.byId[action.payload[i].post_category_id] = action.payload[i]
          }
          return {
              ...state,
              pending: false,
              byId: catTemp.byId,
              allIds: catTemp.allIds
          }
        case FETCH_POST_CATEGORIES_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        default: 
            return state;
    }
}
export default categoriePostReducer;
