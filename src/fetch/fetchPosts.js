import {fetchPostsPending, fetchPostsSuccess, fetchPostsError} from '../actions';

export const fetchPosts= ()=> {
    console.log("on fetch")
    return dispatch => {
       
        dispatch(fetchPostsPending());
        fetch("http://51.255.175.118:2000/post", {
            method: "GET"
          })
          .then(res => res.json())
          .then(async res  => {  
              
         
            console.log("go") 
             dispatch(fetchPostsSuccess(res));
                    
            return res;
                
               
              
          })
          .catch(error => {
              dispatch(fetchPostsError(error));
          })  
    }
}

export default fetchPosts;