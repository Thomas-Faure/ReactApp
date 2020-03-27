import axios from 'axios'
import Moment from 'react-moment';
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { updateCommentReport, changeBestAnswer, updateCommentRate, deleteComment, decreateCommentCounter } from '../../actions'
import { FormattedMessage } from 'react-intl';
class CommentModel extends Component {

  constructor(props) {

    super(props)


    var color = this.props.categorieComment.byId[this.props.commentState.byId[this.props.commentid].comment_category].color
    this.state = {
      color: color,
      best: this.props.best,
      delete: null
    }
    this.report = this.report.bind(this)
    this.like = this.like.bind(this)
    this.removeComment = this.removeComment.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.commentState.byId[this.props.commentid] != null && this.props.commentState.byId[this.props.commentid] != undefined) {
      this.setState({
        comment: nextProps.commentState.byId[this.props.commentState.byId[this.props.commentid].comment_id]
      })
    }
  }

  async removeComment() {
    const token = localStorage.token;
    const id = this.props.commentState.byId[this.props.commentid].comment_id
    const post_id = this.props.commentState.byId[this.props.commentid].post
    const config = {
      headers: { Authorization: 'Bearer ' + token }
    };
    const res = await axios.delete("https://thomasfaure.fr/comment/" + id + "/delete", config)
    if (res.data.affectedRows > 0) {
      this.props.decreateCommentCounter(this.props.commentState.byId[this.props.commentid].post)
      this.props.deleteComment(id)
      var listComments = this.props.commentState.allIds.map(el => this.props.commentState.byId[el])
      if (listComments.length == 0) {
        this.props.changeBestAnswer(null, post_id)
      } else {
        const max = listComments.reduce(function (prev, current) {
          return (prev.like > current.like) ? prev : current
        })
        if(max.like>0)
        this.props.changeBestAnswer(max, post_id)
      }
    }
  }

  like(like) {
    const token = localStorage.token;
    const post_id = this.props.commentState.byId[this.props.commentid].post
    fetch("https://thomasfaure.fr/rateComment/create", {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ comment: this.props.commentState.byId[this.props.commentid].comment_id, like: like })
    }
    ).then(res => res.json())
      .then(res => {
        if(!res.error){
          this.props.updateCommentRate(this.props.commentState.byId[this.props.commentid].comment_id, like, res.result)
          var listComments = this.props.commentState.allIds.map(el => this.props.commentState.byId[el])
          if (listComments.length == 0) {
            this.props.changeBestAnswer(null, post_id)
          } else {
            const max = listComments.reduce(function (prev, current) {
              return (prev.like > current.like) ? prev : current
            })
            if(max.like>0)
             this.props.changeBestAnswer(max, post_id)
          }
        }
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
      body: JSON.stringify({ comment_id: this.props.commentState.byId[this.props.commentid].comment_id })
    }
    ).then(res => res.json())
      .then(res => {
        this.props.updateCommentReport(this.props.commentState.byId[this.props.commentid].comment_id, res.result)
      })
  }
  render() {
    if (this.props.commentState.byId[this.props.commentid] == undefined) {
      return (null)
    } else {
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
                    <p className="subtitle is-6"><strong>@{this.props.commentState.byId[this.props.commentid].username}</strong></p>
                    <div className="cercle" style={{ backgroundColor: this.props.commentState.byId[this.props.commentid].color }}></div>
                  </div>
                  <div>
                    <p className="title is-4">{this.props.commentState.byId[this.props.commentid].description}</p>
                  </div>
                </div>
              </div>
              <footer className="card-footer" >
                <div className="commentRate center" >
                  <div className="like"><a onClick={() => { this.like(false) }}><i className="fas fa-thumbs-down red"></i></a> <p className="infosRate">{this.props.commentState.byId[this.props.commentid].like - this.props.commentState.byId[this.props.commentid].dislike}</p><a onClick={() => { this.like(true) }}><i className="fas fa-thumbs-up bleu"></i></a></div>
                  <div className="liked">
                    {this.props.isLogged ?
                      (this.props.commentState.byId[this.props.commentid].reported == true ?
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
          <div className="card-content">
            <div className="media">
              <div className="media-left">
                <figure className="image is-48x48">
                  <img src="https://i.pinimg.com/originals/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.png" alt="image48" />
                </figure>
              </div>
              <div className="media-content">
                {this.props.owner ? <div className="btDelete"><button className="delete red" title="Remove post" onClick={() => { this.setState({ delete: "deleteComment" }) }}></button></div>
                  : null}
                <div className="spacebetween white">
                  <p className="subtitle is-6"><strong>@{this.props.commentState.byId[this.props.commentid].username}</strong></p>
                  <div className="cercle" style={{ backgroundColor: this.props.commentState.byId[this.props.commentid].color }}></div>
                </div>
                <div>
                  <p className="title is-4">{this.props.commentState.byId[this.props.commentid].description}</p>
                </div>
                <p className="date"><Moment fromNow>
                  {this.props.commentState.byId[this.props.commentid].date}
                </Moment></p>
              </div>
            </div>
            {this.state.delete != "deleteComment" ? null
              :
              <div className={'modal is-active '}>
                <div className="modal-background" onClick={() => { this.setState({ delete: null }) }}></div>
                <div className="modal-card">
                  <header className="modal-card-head">
                    <p className="modal-card-title"><FormattedMessage id="delete.comment"/></p>
                    <button className="delete" aria-label="close" onClick={() => { this.setState({ delete: null }) }}></button>
                  </header>
                  <section className="modal-card-body">
                    <p><FormattedMessage id="delete.comment.confirm"/></p>
                  </section>
                  <footer className="modal-card-foot ">
                    <div className="padding">
                      <button className="button is-danger" onClick={() => { this.removeComment(); this.setState({ delete: null }) }}><FormattedMessage id="delete"/></button>
                      <button className="button" onClick={() => { this.setState({ delete: null }) }}><FormattedMessage id="cancel"/></button>
                    </div>
                  </footer>
                </div>
              </div>
            }
            <footer className="card-footer" >
              <div className="commentRate center" >
                <div className="like"><a onClick={() => { this.like(false) }}><i className="fas fa-thumbs-down red"></i></a><p className="infosRate">{this.props.commentState.byId[this.props.commentid].like - this.props.commentState.byId[this.props.commentid].dislike}</p><a onClick={() => { this.like(true) }}><i className="blue fas fa-thumbs-up"></i></a></div>
                <div className="liked">
                  {this.props.isLogged ?
                    (this.props.commentState.byId[this.props.commentState.byId[this.props.commentid].comment_id].reported == true ?
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
  updateCommentRate: updateCommentRate,
  deleteComment: deleteComment,
  decreateCommentCounter: decreateCommentCounter,
  changeBestAnswer: changeBestAnswer

}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CommentModel);

