import {fetchCommentCategoriesPending, fetchCommentCategoriesSuccess, fetchCommentCategoriesError} from '../actions';

export const fetchCommentCategories= ()=> {
    console.log("on fetch")
    return dispatch => {
       
        dispatch(fetchCommentCategoriesPending());
        fetch("http://51.255.175.118:2000/commentCategory", {
            method: "GET"
          })
          .then(res => res.json())
          .then(res => {       
              console.log(res)   
              dispatch(fetchCommentCategoriesSuccess(res));
              return res;
          })
          .catch(error => {
              dispatch(fetchCommentCategoriesError(error));
          })  
    }
}

export default fetchCommentCategories;