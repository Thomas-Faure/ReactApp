import {fetchUsersPending, fetchUsersSuccess} from '../actions';
import axios from 'axios'

/*
* Recuperation des informations de l'utilisateur connecté et mise a jour du redux
*
*/

export const fetchUsers= (id)=> async dispatch => {
    dispatch(fetchUsersPending());
    const token = localStorage.token;
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
  
    
    const res = await axios.get("https://thomasfaure.fr/user/"+id,config)
    
    dispatch(fetchUsersSuccess(res.data));           
      return res;
    
}

export default fetchUsers;