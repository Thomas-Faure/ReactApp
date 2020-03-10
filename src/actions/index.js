export const FETCH_POSTS_PENDING = 'FETCH_POSTS_PENDING';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_ERROR = 'FETCH_POSTS_ERROR';

export const  fetchPostsPending= ()=> {
    return {
        type: FETCH_POSTS_PENDING
    }
}

export const fetchPostsSuccess= (posts) =>{
    return {
        type: FETCH_POSTS_SUCCESS,
        payload: posts
    }
}

export const  fetchPostsError = (error)=> {
    return {
        type: FETCH_POSTS_ERROR,
        payload: error
    }
}

/////////////////BACKOFFICE//////////////////
export const setPosts = (posts) =>{

    return {
        type: "SET_POSTS",
        payload: posts
    }
}
////////////////////////////////////////////
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
//user
export const setUser = (user) =>{
    return {
        type: "SETUSER",
        payload: user
    }
}
export const unSetUser = () =>{
    return {
        type: "UNSETUSER"
    }
}