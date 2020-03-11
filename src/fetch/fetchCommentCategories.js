import {fetchCommentCategoriesPending, fetchCommentCategoriesSuccess} from '../actions';
import axios from 'axios'


export const fetchCommentCategories= ()=> async dispatch => {
    dispatch(fetchCommentCategoriesPending());
    const res = await axios.get("http://51.255.175.118:2000/commentCategory")
 
    dispatch(fetchCommentCategoriesSuccess(res.data));  
      return res;
    
}

export default fetchCommentCategories;