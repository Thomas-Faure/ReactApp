import React, { Component } from "react";
import Moment from 'react-moment';
class PostModel extends Component {

    constructor(props){
        super(props)
        console.log("called")
        console.log(this.props.index)
        this.props.post.report=0
        this.state = {
            post : this.props.post,
         

        }     
        this.getReport = this.getReport.bind(this) 
    }

    
    componentWillReceiveProps(nextProps) {
       this.setState({
           post : nextProps.post
       })
      }
  componentDidMount() {
    this.getReport()
  }
    getReport(){
        fetch("http://51.255.175.118:2000/reportpost/"+this.props.post.post_id+"/count", {
      method: "GET"
    })
      .then(res => res.json())
      .then((data) => {
        var postTemp = this.state.post
        postTemp.report = data
        this.setState({
          post: postTemp,
        })
      })


    }


    seePost(id) {
        window.location.href = '/#/post/' + id;
      }
 
  render() {

    return (
        <div class="card" onClick={() => { this.seePost(this.state.post.post_id) }}>
        <div class="card-content">
          <div >
            {(this.state.post.url_image !== "") && (this.state.post.url_image !== null) ?
              <div class="media-left">
                <figure class="image is-48x48">
                  <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
                </figure>
              </div> : null}

            <div class="media-content">
              <div class="post_title">
                <h4 class="title is-4" id="post_title">{this.state.post.title}</h4>
                <h4 class="title is-4" id="post_id">#{this.state.post.post_id}</h4>
              </div>
              <div class="description">
                <p>{this.state.post.description}</p>
              </div>
              <div class="infos">
                <Moment interval={30000} fromNow>
                  {this.state.post.date}
                </Moment >
                <p class="author">{this.state.post.username}</p>
              </div>
            </div>
            <div class="rating">
              <div class="liked"><p class="infosRate">{this.state.post.like}</p><img src="ear.png" class="icon"></img></div>
              <div class="liked"><p class="infosRate">{this.state.post.comment}</p><img src="comment.png" class="icon"></img></div>
              <div class="liked"><p class="infosRate">{this.state.post.report}</p><img src="warning.png" class="icon"></img></div>
              
            </div>
            <div class="bestanswer">
              <p>Best answer</p>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
 
export default PostModel;