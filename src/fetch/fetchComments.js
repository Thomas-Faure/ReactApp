import {fetchCommentsPending, fetchCommentsSuccess} from '../actions';
import axios from 'axios'


export const fetchCommentsByPostId = (id) => async dispatch =>{
  dispatch(fetchCommentsPending());

    
    const res = await axios.get("https://thomasfaure.fr/post/"+id+"/comments")
    const token = localStorage.token;
    const config = {
      headers: { Authorization: 'Bearer '+token }
    };
    try{
    const resBis = await axios.get("https://thomasfaure.fr/reportcomment/post/" + id + "/byToken",config)

    if(resBis.data.length>0){
      for(var i =0;i< res.data.length;++i){
        var data = resBis.data.find(el => el.comment == res.data[i].comment_id)
        if(data != undefined && data != null){
          if(data.report == 1){
            res.data[i].reported=true
          }else{
            res.data[i].reported=false
          }
        }

    
      }
    }
  }catch(err){
    console.log("not connected to get report comment of user")
  }
  try{
    const rate = await axios.get("https://thomasfaure.fr/rateComment/post/" + id + "/byToken",config)

    if(rate.data.length>0){
      for(var i =0;i< res.data.length;++i){
        var data = rate.data.find(el => el.comment == res.data[i].comment_id)
        if(data != undefined && data != null){
          if(data.like == 1){
            res.data[i].rated=1
          }else{
            res.data[i].rated=-1
          }
        }

    
      }
    }
  }catch(err){
    console.log("not connected to get the rate")
  }
   
    

 
    dispatch(fetchCommentsSuccess(res.data));           
      return res;
}




export default fetchCommentsByPostId;