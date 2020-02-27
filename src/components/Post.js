import React, { Component } from "react";
 
class Post extends Component {

    constructor(props){
        super(props)
        console.log("doo")
        this.state = {
            id : 0,
            post: null,
            comments: null
        }
        this.getPost = this.getPost.bind(this)
        this.getComments = this.getComments.bind(this)
        this.getData = this.getData.bind(this)
        
    }

    getPost(){
        fetch("http://localhost:2000/post/"+this.state.id,{
            method:"GET"
        })
        .then(res => res.json())
        .then((data)=>{
            console.log(data)
            this.setState({post : data[0]})
           
        })

    }
    getComments(){

        fetch("http://localhost:2000/post/"+this.state.id+"/comments",{
            method:"GET"
        })
        .then(res => res.json())
        .then((data)=>{
            console.log(data)
            this.setState({comments : data})
           
        })

    }

    getData(){
        {if(this.state.id !== this.props.match.params.id){
                this.setState({id:this.props.match.params.id },
                    ()=>{
                        this.getPost()
                        this.getComments()
                });
      }}
    }

 
  render() {
   this.getData()
    
    return (
      <div>
          {this.state.post != null ? 
            <div>
        <h2>Post:</h2>
        <p>id: {this.state.post.post_id}</p>
        <p>title: {this.state.post.title}</p>
        <p>Author: {this.state.post.username}</p>
        <p>description: {this.state.post.description}</p>
        <p>------------</p>
        <h2>Comments:</h2>
        {this.state.comments != null ? 
        this.state.comments.map((val)=>
            <div>
                <p>id comment :{val.comment_id}</p>
                <p>description :{val.description}</p>
                <p>category :{val.comment_category}</p>
                <p>Author:({val.user_id}){val.username}</p>
                <p>-------------</p>
            </div>
        )
        :
         <p>aucun commentaire</p>}
        
            </div>
          : 
          <div><p>Aucun post avec cet identifiant</p></div>}
        

      
  
      </div>
    );
  }
}
 
export default Post;