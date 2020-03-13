/////////////////CATEGORIES COMMENT/////////////////////////////////
export const FETCH_USERS_PENDING = 'FETCH_USERS_PENDING';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USER_BY_ID_SUCCESS = 'FETCH_USER_BY_ID_SUCCESS';
export const FETCH_USERS_ERROR = 'FETCH_USERS_ERROR';

export const  fetchUsersPending = ()=> {
    return {
        type: FETCH_USERS_PENDING
    }
}

export const fetchUsersByIdSuccess = (user) =>{

    return {
        type: FETCH_USER_BY_ID_SUCCESS,
        payload: user
    }
}

export const fetchUsersSuccess = (users) =>{

    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}
export const  fetchUsersError = (error)=> {
    return {
        type: FETCH_USERS_ERROR,
        payload: error
    }
}
/////////////////CATEGORIES COMMENT/////////////////////////////////
export const FETCH_POST_CATEGORIES_PENDING = 'FETCH_POST_CATEGORIES_PENDING';
export const FETCH_POST_CATEGORIES_SUCCESS = 'FETCH_POST_CATEGORIES_SUCCESS';
export const FETCH_POST_CATEGORIES_ERROR = 'FETCH_POST_CATEGORIES_ERROR';

export const  fetchPostCategoriesPending = ()=> {
    return {
        type: FETCH_POST_CATEGORIES_PENDING
    }
}

export const fetchPostCategoriesSuccess = (categories) =>{
    return {
        type: FETCH_POST_CATEGORIES_SUCCESS,
        payload: categories
    }
}
export const  fetchPostCategoriesError = (error)=> {
    return {
        type: FETCH_POST_CATEGORIES_ERROR,
        payload: error
    }
}
/////////////////CATEGORIES COMMENT/////////////////////////////////
export const FETCH_COMMENT_CATEGORIES_PENDING = 'FETCH_COMMENT_CATEGORIES_PENDING';
export const FETCH_COMMENT_CATEGORIES_SUCCESS = 'FETCH_COMMENT_CATEGORIES_SUCCESS';
export const FETCH_COMMENT_CATEGORIES_ERROR = 'FETCH_COMMENT_CATEGORIES_ERROR';

export const  fetchCommentCategoriesPending = ()=> {
    return {
        type: FETCH_COMMENT_CATEGORIES_PENDING
    }
}

export const fetchCommentCategoriesSuccess = (categories) =>{
    return {
        type: FETCH_COMMENT_CATEGORIES_SUCCESS,
        payload: categories
    }
}

export const  fetchCommentCategoriesError = (error)=> {
    return {
        type: FETCH_COMMENT_CATEGORIES_ERROR,
        payload: error
    }
}
/////////////////COMMENTS/////////////////////////////////
export const FETCH_COMMENTS_PENDING = 'FETCH_COMMENTS_PENDING';
export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';
export const FETCH_COMMENTS_ERROR = 'FETCH_COMMENTS_ERROR';

export const  fetchCommentsPending = ()=> {
    return {
        type: FETCH_COMMENTS_PENDING
    }
}

export const fetchCommentsSuccess = (comments) =>{
    
    return {
        type: FETCH_COMMENTS_SUCCESS,
        payload: comments
    }
}

export const  fetchCommentsError = (error)=> {
    return {
        type: FETCH_COMMENTS_ERROR,
        payload: error
    }
}
/////////////////POST/////////////////////////////////
export const FETCH_POSTS_PENDING = 'FETCH_POSTS_PENDING';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_ERROR = 'FETCH_POSTS_ERROR';

export const  fetchPostsPending = ()=> {
    return {
        type: FETCH_POSTS_PENDING
    }
}

export const fetchPostsSuccess = (posts) =>{
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
//////////////////////////////////////////
//popup-up
export const setPopUp = (page,id) =>{
    return {
        type: "SET_POPUP",
        payload: {page:page,id:id}
    }
}
export const unsetPopUp = () =>{
    return {
        type: "UNSET_POPUP"
    }
}