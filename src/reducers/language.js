import {CHANGE_LANGUAGE} from '../actions';
const initialState = {
    lang: "fr",

}
/*
* Réduceur permettant de connaitre la langue souhaité (pour la traduction du site)
*
*/
const languageReducer = (state=initialState,action)=>{
    switch(action.type){
        case CHANGE_LANGUAGE:
            return {
            ...state,
            lang: action.payload
            }

        default:
            return state
        
    }
}
export default languageReducer;