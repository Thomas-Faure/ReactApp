import {fetchPostCategoriesPending, fetchPostCategoriesSuccess, fetchPostCategoriesError} from '../actions';

export const fetchPostCategories= ()=> {
    console.log("on fetch")
    return dispatch => {
       
        dispatch(fetchPostCategoriesPending());
        fetch("http://51.255.175.118:2000/postCategory", {
            method: "GET"
          })
          .then(res => res.json())
          .then(res => {       
              console.log(res)   
              dispatch(fetchPostCategoriesSuccess(res));
              return res;
          })
          .catch(error => {
              dispatch(fetchPostCategoriesError(error));
          })  
    }
}

export default fetchPostCategories;