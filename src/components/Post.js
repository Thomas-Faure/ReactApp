import React, { Component } from "react";
 import CommentModel from './Model/CommentModel'
class Post extends Component {

    constructor(props){
        super(props)
    
        this.state = {
            id : 0,
            post: null,
            comments: null,
            alreadyReported : false
        }
        this.getPost = this.getPost.bind(this)
        this.getComments = this.getComments.bind(this)
        this.getData = this.getData.bind(this)
        this.report = this.report.bind(this)
        this.verifAlreadyCommented = this.verifAlreadyCommented.bind(this)
        
    }
    componentDidMount() {
        this.getData()
 
    }

    getPost(){
        fetch("http://51.255.175.118:2000/post/"+this.state.id,{
            method:"GET"
        })
        .then(res => res.json())
        .then((data)=>{
       
            this.setState({post : data[0]},()=>{this.verifAlreadyCommented()})
           
        })

    }
    getComments(){

        fetch("http://51.255.175.118:2000/post/"+this.state.id+"/comments",{
            method:"GET"
        })
        .then(res => res.json())
        .then((data)=>{
         
            this.setState({comments : data})
           
        })

    }

    verifAlreadyCommented(){
        const token = localStorage.token;
        fetch("http://51.255.175.118:2000/reportpost/"+this.state.post.post_id+"/byToken", {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer ' + token
            }
            
          }
          ).then(res => res.json())
          .then(res => {
          
              if(res.length>0){
                this.setState({alreadyReported : true})
    
              }else{
                this.setState({alreadyReported : false})
              }
          })
    
      }

    report(){
     const token = localStorage.token;
     fetch("http://51.255.175.118:2000/reportpost/create", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ post_id: this.state.post.post_id })
      }
      ).then(res => res.json())
      .then(res => {
          this.setState({alreadyReported : res.result})
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

    
    return (
      <div>
          {this.state.post != null ? 
            <div>
                {this.state.alreadyReported === true ? <button onClick={this.report}>Report<span aria-label="validate">✅</span></button> : <button onClick={this.report}>Report</button>}
        <h2>Post:</h2>
        <p>id: {this.state.post.post_id}</p>
        <p>title: {this.state.post.title}</p>
        <p>Author: {this.state.post.username}</p>
        <p>description: {this.state.post.description}</p>
        <p>------------</p>
        <h2>Comments:</h2>
        {this.state.comments != null ? 
        this.state.comments.map((val,index)=>
            <CommentModel comment={val}></CommentModel>
            
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