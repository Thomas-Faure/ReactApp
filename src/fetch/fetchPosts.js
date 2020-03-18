import {fetchPostsPending, fetchPostsSuccess} from '../actions';
import axios from 'axios';

export const fetchPosts= ()=> async dispatch => {
  
        dispatch(fetchPostsPending());
        const res = await axios.get("https://thomasfaure.fr/post")

        const token = localStorage.token;
    const config = {
      headers: { Authorization: 'Bearer '+token }
    };
    const resBis = await axios.get("https://thomasfaure.fr/reportPost/byToken",config)

    if(resBis.data.length>0){
      for(var i =0;i< res.data.length;++i){
        var data = resBis.data.find(el => el.post == res.data[i].post_id)
        if(data != undefined && data != null){
          if(data.report == 1){
            res.data[i].reported=true
          }else{
            res.data[i].reported=false
          }
        }

    
      }
    }
        dispatch(fetchPostsSuccess(res.data));
                    
          return res;
                 
          
           
    
}

export default fetchPosts;