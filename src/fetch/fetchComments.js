import {fetchCommentsPending, fetchCommentsSuccess} from '../actions';
import axios from 'axios'


export const fetchComments= ()=> async dispatch => {
    dispatch(fetchCommentsPending());
    const res = await axios.get("http://51.255.175.118:2000/comment")
 
    dispatch(fetchCommentsSuccess(res.data));           
      return res;
    
}

export default fetchComments;