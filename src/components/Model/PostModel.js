import React, { Component } from "react";
import Moment from 'react-moment';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
class PostModel extends Component {

  constructor(props) {
    super(props)

    var best = null
    if (this.props.bestAnswer.answers.length > 0) {
      best = this.props.bestAnswer.answers.find(element => element.post == this.props.post.byId[this.props.postid].post_id)
      console.log(best)
    }


    this.props.post.report = 0
    this.state = {
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
              <div className="spacebetween">
                <p className="author"><FontAwesomeIcon icon="user" /><strong>@{this.props.postid.username}</strong></p>
                <p className="date"><Moment fromNow>
                  {this.props.postid.date}
                </Moment></p>

              </div>
              <div className="spacebetween">
                {this.props.post.byId[this.props.postid].location != undefined && this.props.post.byId[this.props.postid].location.length > 0 ?
                  <p style={{ fontSize: "10px" }}><FontAwesomeIcon icon="map-marker-alt" />{this.props.post.byId[this.props.postid].location}</p>
                  :
                  <div></div>
                }
                <div className="cercle" style={{backgroundColor:this.props.post.byId[this.props.postid].couleur}}></div>
              </div>
            </div>

            <div className="post_title" >
              <h4 className="title is-4 animated  fadeIn" id="post_title">{this.props.post.byId[this.props.postid].title}</h4>
              <h4 className="title is-4 animated  fadeIn delay-1s" id="post_id">#{this.props.post.byId[this.props.postid].post_id}</h4>
            </div>
            <div className="description animated  fadeIn delay-1s">
              <p>{this.props.post.byId[this.props.postid].description}</p>
              {this.props.post.byId[this.props.postid].url_image.length > 0 ?

                <img style={{ imageOrientation: "from-image" }} src={'https://thomasfaure.fr/' + this.props.post.byId[this.props.postid].url_image} />

                :
                null}

            </div>

          </div>
          <div className="rating" >
            <div className="liked"><p className="infosRate">{this.props.post.byId[this.props.postid].like}</p><img src="ear.png" alt="img1" className="icon"></img></div>
            <div className="liked"><p className="infosRate">{this.props.post.byId[this.props.postid].comment}</p><img src="comment.png" alt="img2" className="icon"></img></div>
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
    bestAnswer: state.bestAnswer,
    post: state.post
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)



export default connect(mapStateToProps, mapDispatchToProps)(PostModel);
