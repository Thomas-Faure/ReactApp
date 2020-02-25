//compteur
export const increment = () =>{
    return {
        type: "INCREMENT"
    }
}
export const decrement = () =>{
    return {
        type: "DECREMENT"
    }
}

//login
export const login = () =>{
    return {
        type: "SIGN_IN"
    }
}
export const logoff = () =>{
    return {
        type: "SIGN_OFF"
    }
}