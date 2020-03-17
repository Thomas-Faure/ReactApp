import {fetchBestAnswerPending, fetchBestAnswerSuccess} from '../actions';
import axios from 'axios'


export const fetchBestAnswer= ()=> async dispatch => {
    dispatch(fetchBestAnswerPending());
    const res = await axios.get("https://thomasfaure.fr/post/bestAnswer")
 
    dispatch(fetchBestAnswerSuccess(res.data));  
      return res;
    
}

export default fetchBestAnswer;