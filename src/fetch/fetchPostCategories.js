import {fetchPostCategoriesPending, fetchPostCategoriesSuccess} from '../actions';
import axios from 'axios'

/*
* Récuperation des categories des posts et mise a jour du redux
*
*/

export const fetchPostCategories= ()=> async dispatch => {

    dispatch(fetchPostCategoriesPending());
    const res = await axios.get("https://thomasfaure.fr/postCategory")
 
    dispatch(fetchPostCategoriesSuccess(res.data));      
      return res;


}

export default fetchPostCategories;