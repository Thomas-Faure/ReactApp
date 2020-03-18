import React, { Component } from "react";
import Moment from 'react-moment';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
class PostModel extends Component {

  constructor(props) {
    super(props)

    var best = null
    if(this.props.bestAnswer.answers.length >0){
      best = this.props.bestAnswer.answers.find(element => element.post == this.props.post.post_id)

    }

    
    this.props.post.report = 0
    this.state = {
      post: this.props.post,
      bestAnswer: best

    }

  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      post: nextProps.post
    })
  }


  seePost(id) {
    window.location.href = '/#/post/' + id;
  }

  render() {
    return (
      <div className="">
        <div >
          <div className="media-content postModel">
            <div className="infos">
              <p className="author"><FontAwesomeIcon icon="user" /><strong>@{this.state.post.username}</strong></p>
              {this.state.post.location != undefined && this.state.post.location.length>0 ? 
               <p style={{fontSize: "10px"}}><FontAwesomeIcon icon="map-marker-alt" />{this.state.post.location}</p>
              : 
              null
              }
             
              <p className="date"><Moment fromNow>
                {this.state.post.date}
              </Moment></p>
            </div>
            
            <div className="post_title" >
              <h4 className="title is-4 animated  fadeIn" id="post_title">{this.state.post.title}</h4>
              <h4 className="title is-4 animated  fadeIn delay-1s" id="post_id">#{this.state.post.post_id}</h4>
            </div>
            <div className="description animated  fadeIn delay-1s">
              <p>{this.state.post.description}</p>
              {this.state.post.url_image.length > 0 ?

                <img style={{ imageOrientation: "from-image" }} src={'https://thomasfaure.fr/' + this.state.post.url_image} />

                :
                null}

            </div>

          </div>
          <div className="rating" >
            <div className="liked"><p className="infosRate">{this.state.post.like}</p><img src="ear.png" alt="img1" className="icon"></img></div>
            <div className="liked"><p className="infosRate">{this.state.post.comment}</p><img src="comment.png" alt="img2" className="icon"></img></div>
          </div>
          {this.state.bestAnswer == null ? null :
            <div className="bestanswer" >
              <p ><strong className="star"><FontAwesomeIcon icon="star" /></strong>Best:<br />{this.state.bestAnswer.description}</p>
            </div>
          }
        </div>

      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    comment: state.comment,
    user: state.user,
    bestAnswer: state.bestAnswer
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)



export default connect(mapStateToProps, mapDispatchToProps)(PostModel);
