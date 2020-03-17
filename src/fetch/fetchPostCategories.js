import {fetchPostCategoriesPending, fetchPostCategoriesSuccess} from '../actions';
import axios from 'axios'



export const fetchPostCategories= ()=> async dispatch => {

    dispatch(fetchPostCategoriesPending());
    const res = await axios.get("https://thomasfaure.fr/postCategory")
 
    dispatch(fetchPostCategoriesSuccess(res.data));      
      return res;


}

export default fetchPostCategories;