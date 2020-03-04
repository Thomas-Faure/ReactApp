import React, { Component } from "react";
import Moment from 'react-moment';
class PostModel extends Component {

    constructor(props){
        super(props)
      
        this.props.post.report=0
        this.state = {
            post : this.props.post,
         

        }     
        this.getReport = this.getReport.bind(this) 
    }

    
    UNSAFE_componentWillReceiveProps(nextProps) {
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
        <div className="card" onClick={() => { this.seePost(this.state.post.post_id) }}>
        <div className="card-content">
          <div >
            {(this.state.post.url_image !== "") && (this.state.post.url_image !== null) ?
              <div className="media-left">
                <figure className="image is-48x48">
                  <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder" />
                </figure>
              </div> : null}

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
      </div>
    );
  }
}
 
export default PostModel;