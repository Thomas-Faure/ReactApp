/*
* Réduceur permettant de connaitre le formulaire/popup à faire apparaitre souhaité
*/
const PopUpReducer = (state = {page:null,id:null}, action)=>{
    switch(action.type){
        case "SET_POPUP":
            return action.payload
        case "UNSET_POPUP":
            return {page:null,id:null}
        default:
            return state
    }
}
export default PopUpReducer;