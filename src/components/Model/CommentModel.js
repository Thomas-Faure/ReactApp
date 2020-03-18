import Moment from 'react-moment';
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { updateCommentReport } from '../../actions'
class CommentModel extends Component {

  constructor(props) {

    super(props)

    this.props.comment.report = 0

    var color = this.props.categorieComment.categories.find(element => element.comment_category_id == this.props.comment.comment_category).color
    this.state = {
      comment: this.props.comment,
      color: color,
      best: this.props.best

    }
    this.report = this.report.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      comment: nextProps.comment
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
                  <div className="cercle" style={{ backgroundColor: this.state.comment.color}}></div>
                </div>
                <div>
                  <p className="title is-4">{this.state.comment.description}</p>
                </div>
              </div>
            </div>
            <footer className="card-footer" >
              <div className="commentRate center" >
                <div className="like"><a><i class="fas fa-thumbs-down red"></i></a> <p className="infosRate">{this.state.comment.like - this.state.comment.dislike}</p><a><i class="fas fa-thumbs-up bleu"></i></a></div>
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
              <div className="like"><a><i class="fas fa-thumbs-down red"></i></a><p className="infosRate">{this.state.comment.like - this.state.comment.dislike}</p><a><i class="blue fas fa-thumbs-up"></i></a></div>
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
  updateCommentReport: updateCommentReport

}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CommentModel);

