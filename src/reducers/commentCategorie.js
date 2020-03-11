import {FETCH_COMMENT_CATEGORIES_PENDING, FETCH_COMMENT_CATEGORIES_SUCCESS, FETCH_COMMENT_CATEGORIES_ERROR} from '../actions';
const initialState = {
    pending: false,
    categories: [],
    error: null
}
const categorieCommentReducer = (state = initialState, action)=>{
    switch(action.type) {
        case FETCH_COMMENT_CATEGORIES_PENDING: 
            return {
                ...state,
                pending: true
            }
        case FETCH_COMMENT_CATEGORIES_SUCCESS:
            return {
                ...state,
                pending: false,
                categories: action.payload
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
