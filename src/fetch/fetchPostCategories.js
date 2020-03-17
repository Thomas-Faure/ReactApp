import {fetchPostCategoriesPending, fetchPostCategoriesSuccess} from '../actions';
import axios from 'axios'



export const fetchPostCategories= ()=> async dispatch => {

    dispatch(fetchPostCategoriesPending());
    const res = await axios.get("http://51.255.175.118:80/postCategory")
 
    dispatch(fetchPostCategoriesSuccess(res.data));      
      return res;


}

export default fetchPostCategories;