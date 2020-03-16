import {FETCH_BEST_ANSWER_PENDING, FETCH_BEST_ANSWER_SUCCESS, FETCH_BEST_ANSWER_ERROR} from '../actions';
const initialState = {
    pending: false,
    answers: [],
    error: null
}
const bestAnswer = (state = initialState, action)=>{
    switch(action.type) {
        case FETCH_BEST_ANSWER_PENDING: 
            return {
                ...state,
                pending: true
            }
        case FETCH_BEST_ANSWER_SUCCESS:

            return {
                ...state,
                pending: false,
                answers: action.payload
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
