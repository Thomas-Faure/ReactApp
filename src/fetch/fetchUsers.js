import {fetchUsersPending, fetchUsersSuccess} from '../actions';
import axios from 'axios'


export const fetchUsers= ()=> async dispatch => {
    dispatch(fetchUsersPending());
    const token = localStorage.token;
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
  
    
    const res = await axios.get("http://51.255.175.118:2000/user/list",config)
    
    dispatch(fetchUsersSuccess(res.data));           
      return res;
    
}

export default fetchUsers;