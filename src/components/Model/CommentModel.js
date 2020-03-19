import axios from 'axios'
import Moment from 'react-moment';
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { updateCommentReport, updateCommentRate } from '../../actions'
class CommentModel extends Component {

  constructor(props) {

    super(props)

    this.props.comment.report = 0

    var color = this.props.categorieComment.categories.find(element => element.comment_category_id == this.props.comment.comment_category).color
    this.state = {
      comment: this.props.comment,
      color: color,
      best: this.props.best,
    }
    this.report = this.report.bind(this)
    this.like = this.like.bind(this)
    this.removeComment = this.removeComment.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      comment: nextProps.commentState.byId[this.state.comment.comment_id]
    })
  }

  async removeComment(){
    const token = localStorage.token;
    const config = {
      headers: { Authorization: 'Bearer ' + token }
    };
    const res = await axios.delete("https://thomasfaure.fr/comment/" + this.state.comment.comment_id + "/delete", config)
  }

  like(like) {
    const token = localStorage.token;
    fetch("https://thomasfaure.fr/rateComment/create", {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ comment: this.state.comment.comment_id, like: like })
    }
    ).then(res => res.json())
      .then(res => {
        this.props.updateCommentRate(this.state.comment.comment_id, like, res.result)
      })

  }


  report() {
    const token = localStorage.token;
    fetch("https://thomasfaure.fr/reportcomment/create", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ comment_id: this.state.comment.comment_id })
    }
    ).then(res => res.json())
      .then(res => {
        this.props.updateCommentReport(this.state.comment.comment_id, res.result)
      })
  }
  render() {
    if (this.state.best) {
      return (
        <div className="card">
          <div className="card-content" className="bestanswerD">
            <div className="media">
              <div className="media-left">
                <figure className="image is-48x48">
                  <img src="https://i.pinimg.com/originals/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.png" alt="image48" />
                </figure>
              </div>
              <div className="media-content" className="bestDescription">
                <div className="spacebetween">
                  <p className="subtitle is-6"><strong>@{this.state.comment.username}</strong></p>
                  <div className="cercle" style={{ backgroundColor: this.state.comment.color }}></div>
                </div>
                <div>
                  <p className="title is-4">{this.state.comment.description}</p>
                </div>
              </div>
            </div>
            <footer className="card-footer" >
              <div className="commentRate center" >
                <div className="like"><a onClick={() => { this.like(false) }}><i className="fas fa-thumbs-down red"></i></a> <p className="infosRate">{this.state.comment.like - this.state.comment.dislike}</p><a onClick={() => { this.like(true) }}><i className="fas fa-thumbs-up bleu"></i></a></div>
                <div className="liked">
                  {this.props.isLogged ?
                    (this.props.commentState.byId[this.state.comment.comment_id].reported == true ?
                      <a onClick={this.report} > <p className="infosRate"></p><img src="warning.png" alt="img3" className="icon"></img> <span aria-label="validate">✅</span></a>
                      :
                      <a onClick={this.report}><p className="infosRate"><img src="warning.png" alt="img3" className="icon"></img></p></a>)
                    : <p className="infosRate"><img src="warning.png" alt="img3" className="icon"></img></p>}
                </div>
              </div>
            </footer>
          </div>
        </div>
      );
    }
    return (
      <div className="card">
        <div className="card-content" style={{ backgroundColor: this.state.color }}>
          <div className="media">
            <div className="media-left">
              <figure className="image is-48x48">
                <img src="https://i.pinimg.com/originals/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.png" alt="image48" />
              </figure>
            </div>
            <div className="media-content">
              {this.props.owner ? <div className="btDelete"><button className="delete red" title="Remove post" onClick={() => { this.removeComment() }}></button></div>
                : null}
              <div className="spacebetween white">
                <p className="subtitle is-6"><strong>@{this.state.comment.username}</strong></p>
                <div className="cercle" style={{ backgroundColor: this.state.comment.color }}></div>
              </div>
              <div>
                <p className="title is-4">{this.state.comment.description}</p>
              </div>
              <p className="date"><Moment fromNow>
                {this.state.comment.date}
              </Moment></p>
            </div>
          </div>
          <footer className="card-footer" >
            <div className="commentRate center" >
              <div className="like"><a onClick={() => { this.like(false) }}><i className="fas fa-thumbs-down red"></i></a><p className="infosRate">{this.state.comment.like - this.state.comment.dislike}</p><a onClick={() => { this.like(true) }}><i className="blue fas fa-thumbs-up"></i></a></div>
              <div className="liked">
                {this.props.isLogged ?
                  (this.props.commentState.byId[this.state.comment.comment_id].reported == true ?
                    <a onClick={this.report} > <p className="infosRate"></p><img src="warning.png" alt="img3" className="icon"></img> <span aria-label="validate">✅</span></a>
                    :
                    <a onClick={this.report}><p className="infosRate"><img src="warning.png" alt="img3" className="icon"></img></p></a>)
                  : <p className="infosRate"><img src="warning.png" alt="img3" className="icon"></img></p>}
              </div>
            </div>
          </footer>
        </div>
      </div >
    );
  }
}


const mapStateToProps = state => {
  return {
    categorieComment: state.categorieComment,
    commentState: state.comment,
    isLogged: state.isLogged
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  updateCommentReport: updateCommentReport,
  updateCommentRate: updateCommentRate

}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CommentModel);

