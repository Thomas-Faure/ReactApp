import {fetchPostsPending, fetchPostsSuccess} from '../actions';
import axios from 'axios';

export const fetchPosts= ()=> async dispatch => {
  
        dispatch(fetchPostsPending());
        const res = await axios.get("http://51.255.175.118:2000/post")
          dispatch(fetchPostsSuccess(res.data));
                    
          return res;
                 
          
           
    
}

export default fetchPosts;