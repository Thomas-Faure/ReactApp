import {FETCH_POST_CATEGORIES_PENDING, FETCH_POST_CATEGORIES_SUCCESS, FETCH_POST_CATEGORIES_ERROR} from '../actions';
const initialState = {
    pending: false,
    categories: [],
    error: null
}
const categoriePostReducer = (state = initialState, action)=>{
    switch(action.type) {
        case FETCH_POST_CATEGORIES_PENDING: 
            return {
                ...state,
                pending: true
            }
        case FETCH_POST_CATEGORIES_SUCCESS:
            return {
                ...state,
                pending: false,
                categories: action.payload
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
