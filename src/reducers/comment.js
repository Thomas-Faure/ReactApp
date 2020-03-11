import {FETCH_COMMENTS_PENDING, FETCH_COMMENTS_SUCCESS, FETCH_COMMENTS_ERROR} from '../actions';
const initialState = {
    pending: false,
    comments: [],
    error: null
}
const commentReducer = (state = initialState, action)=>{
    switch(action.type) {
        case FETCH_COMMENTS_PENDING: 
            return {
                ...state,
                pending: true
            }
        case FETCH_COMMENTS_SUCCESS:
            return {
                ...state,
                pending: false,
                comments: action.payload
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