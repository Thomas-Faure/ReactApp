
export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE'
export const changeLanguage = (language) =>{
    return {
        type : CHANGE_LANGUAGE,
        payload : language
    }
}
/////////////////BEST ANSWER/////////////////////////////////

export const CHANGE_BEST_ANSWER= 'CHANGE_BEST_ANSWER';
export const FETCH_BEST_ANSWER_PENDING = 'FETCH_BEST_ANSWER_PENDING';
export const FETCH_BEST_ANSWER_SUCCESS = 'FETCH_BEST_ANSWER_SUCCESS';
export const FETCH_BEST_ANSWER_ERROR = 'FETCH_BEST_ANSWER_ERROR';

export const changeBestAnswer=(comment,idPost)=>{
    return {
        type : CHANGE_BEST_ANSWER,
        payload: {idPost:idPost,comment:comment}
    }
}
export const  fetchBestAnswerPending = ()=> {
    return {
        type: FETCH_BEST_ANSWER_PENDING
    }
}


export const fetchBestAnswerSuccess = (answers) =>{

    return {
        type: FETCH_BEST_ANSWER_SUCCESS,
        payload: answers
    }
}
export const  fetchBestAnswerError = (error)=> {
    return {
        type: FETCH_BEST_ANSWER_ERROR,
        payload: error
    }
}




/////////////////CATEGORIES COMMENT/////////////////////////////////
export const FETCH_USERS_PENDING = 'FETCH_USERS_PENDING';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USER_BY_ID_SUCCESS = 'FETCH_USER_BY_ID_SUCCESS';
export const FETCH_USERS_ERROR = 'FETCH_USERS_ERROR';
export const ADD_NEW_USER_TO_LIST = 'ADD_NEW_USER_TO_LIST';
export const UPDATE_USER = 'UPDATE_USER';
export const REMOVE_USER = 'REMOVE_USER'

export const removeUser = (userid)=>{
    return{
        type: REMOVE_USER,
        payload: userid
    }
}
export const updateUser = (user)=>{
    return {
        type: UPDATE_USER,
        payload: user
    }
}
export const addNewUserToList = (user)=>{
    return {
        type: ADD_NEW_USER_TO_LIST,
        payload: user
    }
}
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
export const REMOVE_POST_CATEGORIE = 'REMOVE_POST_CATEGORIE';

export const removePostCategorie = (catid)=>{
    return{
        type: REMOVE_POST_CATEGORIE,
        payload: catid
    }
}
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


export const REMOVE_COMMENT_CATEGORIE = 'REMOVE_COMMENT_CATEGORIE';

export const removeCommentCategorie = (catid)=>{
    return{
        type: REMOVE_COMMENT_CATEGORIE,
        payload: catid
    }
}
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
export const UPDATE_COMMENTS_REPORT = 'UPDATE_COMMENTS_REPORT';
export const UPDATE_COMMENTS_RATE = 'UPDATE_COMMENTS_RATE';
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'

export const ADD_COMMENTS = 'ADD_COMMENTS'

export const addComments = (comments) =>{
    return {
        type: FETCH_COMMENTS_SUCCESS,
        payload: comments
    }
}

export const updateComment = (comment) =>{
    return {
        type: UPDATE_COMMENT,
        payload: comment
    }
}
export const deleteComment = (id) =>{
    return {
        type: DELETE_COMMENT,
        payload: id
    }
}
export const  fetchCommentsPending = ()=> {
    return {
        type: FETCH_COMMENTS_PENDING
    }
}

export const updateCommentReport= (id,data) =>{
    return{
        type: UPDATE_COMMENTS_REPORT,
        payload: {id:id,data:data}
    }
}
export const updateCommentRate= (id,like,info) =>{
    return{
        type: UPDATE_COMMENTS_RATE,
        payload: {id:id,like:like,info:info}
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
export const UPDATE_POST_LIKE = 'UPDATE_POST_LIKE'
export const UPDATE_POSTS_REPORT = 'UPDATE_POSTS_REPORT'
export const DELETE_POST = 'DELETE_POST'
export const DECREASE_COMMENT_COUNTER = 'DECREASE_COMMENT_COUNTER'

export const decreateCommentCounter = (id) =>{
    return{
        type: DECREASE_COMMENT_COUNTER,
        payload: id

    }
}
export const deletePost = (id) =>{
    return {
        type: DELETE_POST,
        payload: id
    }
}
export const  fetchPostsPending = ()=> {
    return {
        type: FETCH_POSTS_PENDING
    }
}
export const updatePostReport= (id,data) =>{
    return{
        type: UPDATE_POSTS_REPORT,
        payload: {id:id,data:data}
    }
}
export const updatePostLike= (id,data) =>{
    return{
        type: UPDATE_POST_LIKE,
        payload: {id:id,data:data}
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