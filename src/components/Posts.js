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
        fetch("http://51.255.175.118:2000/post",{
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
       {this.state.posts != null ? 
            this.state.posts.map((val)=>
            <div class="card" onClick={()=>{this.seePost(val.post_id)}}>
          
          
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-48x48">
                    <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image"/>
                  </figure>
                </div>
                <div class="media-content">
                  <p class="title is-4">{val.title}</p>
                  <p class="subtitle is-6">{val.username}</p>
                </div>
              </div>
          
              <div class="content">
                {val.description}
               
                <br/>
                <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
              </div>
            </div>
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