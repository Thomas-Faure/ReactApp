import {FETCH_COMMENT_CATEGORIES_PENDING,REMOVE_COMMENT_CATEGORIE, FETCH_COMMENT_CATEGORIES_SUCCESS, FETCH_COMMENT_CATEGORIES_ERROR} from '../actions';
const initialState = {
    pending: false,
    byId: {},
    allIds: [],
    error: null
}
/*
* Réduceur permettant le stockage des catégories de commentaires
*
*/
const categorieCommentReducer = (state = initialState, action)=>{
    switch(action.type) {

        case REMOVE_COMMENT_CATEGORIE:
            var byIdTemp = state.byId
            const { [action.payload]: ignored, ...finalById } = byIdTemp;
            var allIds = state.allIds.filter(el=>el != action.payload)
            return{
                ...state,
                byId:finalById,
                allIds:allIds

            }
        case FETCH_COMMENT_CATEGORIES_PENDING: 
            return {
                ...state,
                pending: true
            }
        case FETCH_COMMENT_CATEGORIES_SUCCESS:

            var catTemp = {byId: {},allIds : []}
            catTemp.allIds = action.payload.map(function(val, index){ 
            return val.comment_category_id; 
          })
          
          for(var i = 0;i<action.payload.length;++i){
            catTemp.byId[action.payload[i].comment_category_id] = action.payload[i]
          }
          return {
              ...state,
              pending: false,
              byId: catTemp.byId,
              allIds: catTemp.allIds
          }
         
        case FETCH_COMMENT_CATEGORIES_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        default: 
            return state;
    }
}
export default categorieCommentReducer;
