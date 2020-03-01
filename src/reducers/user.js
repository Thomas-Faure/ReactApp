const userReducer = (state = null, action)=>{
    switch(action.type){
        case "SETUSER":
           
            return action.payload
        case "UNSETUSER":
          
            return null
        default:
            return state
    }
}
export default userReducer;