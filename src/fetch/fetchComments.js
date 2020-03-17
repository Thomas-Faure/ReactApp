import {fetchCommentsPending, fetchCommentsSuccess} from '../actions';
import axios from 'axios'


export const fetchCommentsByPostId = (id) => async dispatch =>{
  dispatch(fetchCommentsPending());

    const res = await axios.get("http://51.255.175.118:80/post/"+id+"/comments")
    const token = localStorage.token;
    const config = {
      headers: { Authorization: 'Bearer '+token }
    };

    for(var i =0;i< res.data.length;++i){
      const resBis = await axios.get("http://51.255.175.118:80/reportcomment/" + res.data[i].comment_id + "/byToken",config)

      if(resBis.data.length > 0){

        res.data[i].reported=true
      }else{
        res.data[i].reported=false
      }
    }

 
    dispatch(fetchCommentsSuccess(res.data));           
      return res;
}




export default fetchCommentsByPostId;