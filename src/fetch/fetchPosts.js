import {fetchPostsPending, fetchPostsSuccess} from '../actions';
import axios from 'axios';

export const fetchPosts= ()=> async dispatch => {
  
        dispatch(fetchPostsPending());
        const res = await axios.get("http://51.255.175.118:80/post")

        const token = localStorage.token;
    const config = {
      headers: { Authorization: 'Bearer '+token }
    };

      for(var i = 0;i< res.data.length;++i){
        const resBis = await axios.get("http://51.255.175.118:80/reportpost/" + res.data[0].post_id + "/byToken",config)
        if(resBis.data.length>0){
          res.data[i].reported=true
        }else{
          res.data[i].reported=false
        }
      }
        dispatch(fetchPostsSuccess(res.data));
                    
          return res;
                 
          
           
    
}

export default fetchPosts;