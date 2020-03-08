import React, { Component } from "react";
 import CommentModel from './Model/CommentModel'
 import Moment from 'react-moment';
class PostDetails extends Component {

    constructor(props){
        super(props)
    
        this.state = {
            id : 0,
            post: null,
            comments: null,
            alreadyReported : false,
            actualPage: 0,
            maxPage: 1,
            elementsByPage: 5,
            valueComment: "",
            valueCategory: 1,
            categories: []


        }
        this.getPost = this.getPost.bind(this)
        this.getComments = this.getComments.bind(this)
        this.getData = this.getData.bind(this)
        this.report = this.report.bind(this)
        this.verifAlreadyCommented = this.verifAlreadyCommented.bind(this)
        this.pushNextButton = this.pushNextButton.bind(this)
        this.pushPrevButton = this.pushPrevButton.bind(this)
        this.handleChangeComment = this.handleChangeComment.bind(this)
        this.handleChangeCategory = this.handleChangeCategory.bind(this)
        this.sendData= this.sendData.bind(this)
        
    }

    pushPrevButton(){
      if(this.state.actualPage >0){
          this.setState({
              actualPage : this.state.actualPage-1
            
          })
      }

  }

  pushNextButton(){
    if(this.state.actualPage != this.state.maxPage){
        this.setState({
            actualPage : this.state.actualPage+1
          
        })
    }

}
    componentDidMount() {
        this.getData()
        this.getCategories()
 
    }
    handleChangeComment(event){
      this.setState({ valueComment: event.target.value })
    }
    handleChangeCategory(event){
      this.setState({ valueCategory: event.target.value })
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
         
            this.setState(
              {
              comments : data,
              maxPage: Math.floor(data.length/this.state.elementsByPage)
            }
            )
           
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
    getCategories(){
      fetch("http://51.255.175.118:2000/commentCategory", {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then((data) => {
         
            this.setState({categories:data},
              this.setState({valueCategory:data[0].comment_category_id}))
          
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

    sendData() {
    
      const token = localStorage.token;
      fetch("http://51.255.175.118:2000/post/"+this.state.post.post_id+"/comment/create", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
          
        },
        body: JSON.stringify({description: this.state.valueComment, category : this.state.valueCategory})
      })
        .then(res => res.json())
        .then((data) => {
            if(data.result===true){
              this.getComments()
              this.setState({actualPage:this.state.maxPage,valueComment:""})
            }
          
        })
     
    }

  render() {

    
    return (
      <div>
          {this.state.post != null ? 
            <div>


     
        <div className="card-content">
          <div >
            
            <div className="media-content">
              <div className="post_title">
                <h4 className="title is-4" id="post_title">{this.state.post.title}</h4>
                <h4 className="title is-4" id="post_id">#{this.state.post.post_id}</h4>
              </div>
              <div className="description">
                <p>{this.state.post.description}</p>
              </div>
              <div className="infos">
                <Moment interval={30000} fromNow>
                  {this.state.post.date}
                </Moment >
                <p className="author">{this.state.post.username}</p>
                {
                this.state.alreadyReported === true ?
                 <button onClick={this.report}>Report<span aria-label="validate">✅</span></button> 
                :
                 <button onClick={this.report}>Report</button>
                }
              </div>
            </div>
            <div className="rating">
              <div className="liked"><p className="infosRate">{this.state.post.like}</p><img src="ear.png" alt= "img1"className="icon"></img></div>
              <div className="liked"><p className="infosRate">{this.state.post.comment}</p><img src="comment.png" alt="img2" className="icon"></img></div>
              <div className="liked"><p className="infosRate">{this.state.post.report}</p><img src="warning.png" alt="img3" className="icon"></img></div>     
            </div>
            <div className="bestanswer">
              <p>Best answer</p>
            </div>
          </div>

        </div>
        <p style={{textAlign: "center",margin: "auto"}}><span style={{marginBottom:"10px"}}>The actual page is : {this.state.actualPage} / {this.state.maxPage}</span><br/><button className="button is-link" onClick={this.pushPrevButton}>Prev</button><button className="button is-link" onClick={this.pushNextButton}>Next</button><br/>
                </p>

        {this.state.comments != null ? 
        this.state.comments.slice(0+(this.state.actualPage*this.state.elementsByPage),5+(this.state.actualPage*this.state.elementsByPage)).map((val,index)=>
            <CommentModel comment={val}></CommentModel>       
        )
        :
         <p>aucun commentaire</p>}
        
            </div>
          : 
          <div><p>Aucun post avec cet identifiant</p></div>}
           <div class="field">
            <label class="label">Add a comment</label>
            <div class="control">
              <input class="input" type="text" placeholder="Comment" value={this.state.valueComment} onChange={this.handleChangeComment} />
              <div className="select">
    
            <select value={this.state.valueCategory} onChange={this.handleChangeCategory}>
            {(this.state.categories.length != 0 )?
          this.state.categories.map((val,index) =>
          <option value={val.comment_category_id}>{val.description}</option>
          )
          :
       null
        }
            


        </select>
        </div>
              
            </div>
            <button className="button is-link" onClick={this.sendData}>send</button>
          </div>
        

      
  
      </div>
    );
  }
}
 
export default PostDetails;