import {fetchCommentCategoriesPending, fetchCommentCategoriesSuccess} from '../actions';
import axios from 'axios'

/*
* Récuperation des catégories de commentaires et mise à jour du redux
*
*/
export const fetchCommentCategories= ()=> async dispatch => {
    dispatch(fetchCommentCategoriesPending());
    const res = await axios.get("https://thomasfaure.fr/commentCategory")
 
    dispatch(fetchCommentCategoriesSuccess(res.data));  
      return res;
    
}

export default fetchCommentCategories;