import {fetchBestAnswerPending, fetchBestAnswerSuccess} from '../actions';
import axios from 'axios'

/*
* Recuperation de la meilleur réponse de chaque posts si elle existe et mis a jour du redux
*
*/
export const fetchBestAnswer= ()=> async dispatch => {
    dispatch(fetchBestAnswerPending());
    const res = await axios.get("https://thomasfaure.fr/post/bestAnswer")
 
    dispatch(fetchBestAnswerSuccess(res.data));  
      return res;
    
}

export default fetchBestAnswer;