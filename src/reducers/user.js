const userReducer = (state = null, action)=>{
    switch(action.type){
        case "SETUSER":
            state = action.payload
            return action.payload
        case "UNSETUSER":
            state = null
            return null
        default:
            return state
    }
}
export default userReducer;