import {fetchCommentsPending, fetchCommentsSuccess, fetchCommentsError} from '../actions';

export const fetchComments= ()=> {
    console.log("on fetch")
    return dispatch => {
       
        dispatch(fetchCommentsPending());
        fetch("http://51.255.175.118:2000/comment", {
            method: "GET"
          })
          .then(res => res.json())
          .then(res => {       
              console.log(res)   
              dispatch(fetchCommentsSuccess(res));
              return res;
          })
          .catch(error => {
              dispatch(fetchCommentsError(error));
          })  
    }
}

export default fetchComments;