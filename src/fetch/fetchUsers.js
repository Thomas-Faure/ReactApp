import {fetchUsersPending, fetchUsersSuccess} from '../actions';
import axios from 'axios'

/*
* Recuperation des utilisateurs et mise a jour du redux
*
*/
export const fetchUsers= ()=> async dispatch => {
    dispatch(fetchUsersPending());
    const token = localStorage.token;
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
  
    
    const res = await axios.get("https://thomasfaure.fr/user/list",config)
    
    dispatch(fetchUsersSuccess(res.data));           
      return res;
    
}

export default fetchUsers;