import React, { Component } from "react";
 
class Posts extends Component {

    constructor(props){
        super(props)
        this.state = {
            posts : null
        }
        this.getPosts = this.getPosts.bind(this)

    }
  
    componentDidMount(){
     this.getPosts();
    }

    getPosts(){
        fetch("http://localhost:2000/post",{
            method:"GET"
        })
        .then(res => res.json())
        .then((data)=>{
            console.log(data)
            this.setState({posts : data})
           
        })
  
    }
  seePost(id){
    window.location.href = '/#/post/'+id;
  }
  render() {
    return (
      <div>
        <h2>Posts</h2>
        {this.state.posts != null ? 
            this.state.posts.map((val)=>
                <div>
                    <p>-------------</p>
                    <p>Voir:<button onClick={()=>this.seePost(val.post_id)}>GO</button></p>
                    <p>title :{val.title}</p>
                    <p>description :{val.description}</p>
                    <p>image url :{val.url_image}</p>
                    <p>Author:({val.user_id}){val.username}</p>
                </div>
        )
        :
        null
        }
  
      </div>
    );
  }
}
 
export default Posts;