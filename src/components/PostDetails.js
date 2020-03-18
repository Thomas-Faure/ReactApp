import React, { Component } from "react";
import Moment from 'react-moment';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import CommentModel from './Model/CommentModel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import fetchCommentsByPostId from '../fetch/fetchComments'
import fetchCommentCategories from "../fetch/fetchCommentCategories";
import fetchPosts from '../fetch/fetchPosts'
import { unsetPopUp, updatePostLike, updatePostReport } from '../actions';
import axios from 'axios'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

class PostDetails extends Component {

  constructor(props) {
    super(props)

    this.state = {
      id: this.props.popUp.id,
      bestAnswer: null,
      comments: [],
      alreadyReported: false,
      actualPage: 0,
      maxPage: 1,
      elementsByPage: 5,
      valueComment: "",
      valueCategory: this.props.categorieComment.categories[0].comment_category_id,
      categories: []


    }
    this.geData = this.getData.bind(this)
    this.report = this.report.bind(this)
    this.pushNextButton = this.pushNextButton.bind(this)
    this.pushPrevButton = this.pushPrevButton.bind(this)
    this.handleChangeComment = this.handleChangeComment.bind(this)
    this.handleChangeCategory = this.handleChangeCategory.bind(this)
    this.sendData = this.sendData.bind(this)

  }


  componentDidMount() {

    this.props.fetchCommentsByPostId(this.props.popUp.id).then(() => {
      this.getData()

    })


  }

  pushPrevButton() {
    if (this.state.actualPage > 0) {
      this.setState({
        actualPage: this.state.actualPage - 1

      })
    }

  }

  pushNextButton() {
    if (this.state.actualPage !== this.state.maxPage) {
      this.setState({
        actualPage: this.state.actualPage + 1

      })
    }

  }

  async like() {
    const token = localStorage.token;
    const config = {
      headers: { Authorization: 'Bearer ' + token }
    };
    const res = await axios.post("https://thomasfaure.fr/opinion/create", { post: this.props.popUp.id }, config)

    if (res.data.result == "liked") {
      await this.props.updatePostLike(this.props.post.byId[this.props.popUp.id].post_id, this.props.post.byId[this.props.popUp.id].like + 1)
    } else if (res.data.result == "deleted") {
      await this.props.updatePostLike(this.props.post.byId[this.props.popUp.id].post_id, this.props.post.byId[this.props.popUp.id].like - 1)

    }


  }

  setComments() {
    let commentsList = this.props.comment.allIds.map(id => this.props.comment.byId[id])

    this.setState({
      comments: commentsList,
      maxPage: (Math.ceil(commentsList.length / this.state.elementsByPage) - 1)
    })
  }

  getData() {

    let commentsList = this.props.comment.allIds.map(id => this.props.comment.byId[id])

    if (this.props.bestAnswer.answers.length > 0) {
      let bestAnswerId = this.props.bestAnswer.answers.find(element => element.post == this.state.id)
      if (bestAnswerId != undefined) {
        this.setState({
          bestAnswer: commentsList.find(element => element.comment_id == bestAnswerId.comment_id)
        })

      }
    }

    this.setState({
      comments: commentsList,
      maxPage: (Math.ceil(commentsList.length / this.state.elementsByPage) - 1)

    }, () => { })
  }

  handleChangeComment(event) {
    this.setState({ valueComment: event.target.value })
  }
  handleChangeCategory(event) {
    this.setState({ valueCategory: event.target.value })
  }



  async report() {
    const token = localStorage.token;
    var res = await fetch("https://thomasfaure.fr/reportpost/create", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ post_id: this.props.post.byId[this.props.popUp.id].post_id })
    }
    )
    res = await res.json()

    this.props.updatePostReport(this.props.post.byId[this.props.popUp.id].post_id, res.result)




  }





  sendData() {
    const token = localStorage.token;
    fetch("https://thomasfaure.fr/post/" + this.props.post.byId[this.props.popUp.id].post_id + "/comment/create", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token

      },
      body: JSON.stringify({ description: this.state.valueComment, category: this.state.valueCategory })
    })
      .then(res => res.json())
      .then((data) => {
        if (data.result === true) {
          let asyncChangepage = async () => {
            await this.props.fetchCommentsByPostId(this.props.popUp.id)
            await this.props.fetchCommentCategories()
            await this.props.fetchPosts()
            this.setComments()
            await this.setState({ actualPage: this.state.maxPage, valueComment: "" })

          }
          asyncChangepage()
        }

      })

  }

  render() {
    return (
      <div className={'modal is-active animated  fadeIn'}>
        <div className="modal-background" onClick={() => { this.props.unsetPopUp() }}></div>
        <div className="modal-card" >
          <header className="modal-card-head">
            <p className="modal-card-title">Comments</p>
            <button className="delete" aria-label="close" onClick={() => { this.props.unsetPopUp() }}></button>
          </header>
          <section className="modal-card-body">
            <div>
              {this.props.post.byId[this.props.popUp.id] != null ?
                <div>
                  <div className="card-content">
                    <div >
                      <div className="media-content postModel">
                        <div className="infos">
                          <div className="spacebetween">
                            <p className="author"><FontAwesomeIcon icon="user" /><strong>@{this.props.post.byId[this.props.popUp.id].username}</strong></p>
                            <p className="date"><Moment fromNow>
                            {this.props.post.byId[this.props.popUp.id].date}
                            </Moment></p>

                          </div>
                          <div className="spacebetween">
                            {this.props.post.byId[this.props.popUp.id].location != undefined && this.props.post.byId[this.props.popUp.id].length > 0 ?
                              <p style={{ fontSize: "10px" }}><FontAwesomeIcon icon="map-marker-alt" />{this.props.post.byId[this.props.popUp.id].location}</p>
                              :
                              <div></div>
                            }
                            <div className="cercle" style={{ backgroundColor: this.props.post.byId[this.props.popUp.id].couleur }}>

                            </div>
                          </div>
                        </div>
                        <div className="post_title" >
                          <h4 className="title is-4" id="post_title">{this.props.post.byId[this.props.popUp.id].title}</h4>
                          <h4 className="title is-4" id="post_id">#{this.props.post.byId[this.props.popUp.id].post_id}</h4>
                        </div>
                        <div className="description">
                          <p>{this.props.post.byId[this.props.popUp.id].description}</p>
                          {this.props.post.byId[this.props.popUp.id].url_image.length > 0 ?

                            <img src={'https://thomasfaure.fr/' + this.props.post.byId[this.props.popUp.id].url_image} />

                            :
                            null}
                        </div>

                      </div>
                      <div className="rating" >
                        <div className="liked"><a onClick={() => this.like()}><p className="infosRate">{this.props.post.byId[this.props.popUp.id].like}</p><img src="ear.png" alt="img1" className="icon"></img></a></div>
                        <div className="liked"><p className="infosRate">{this.state.comments.length}</p><img src="comment.png" alt="img2" className="icon"></img></div>
                        <div className="liked">
                          {this.props.isLogged ?
                            (this.props.post.byId[this.props.popUp.id].reported === true ?
                              <a onClick={this.report} > <p className="infosRate"></p><img src="warning.png" alt="img3" className="icon"></img> <span aria-label="validate">✅</span></a>
                              :
                              <a onClick={this.report}><p className="infosRate"><img src="warning.png" alt="img3" className="icon"></img></p></a>)
                            : <p className="infosRate">{this.props.post.byId[this.props.popUp.id].report}<img src="warning.png" alt="img3" className="icon"></img></p>}
                        </div>
                      </div>

                    </div>

                  </div>
                  {this.props.comment.pending==true ? <p style={{ textAlign: "center", margin: "auto" }}><Loader
         type="ThreeDots"
         color="#2c60a4cc"
         height={100}
         width={100}
          

      /></p>
                  :
                   (
                    (this.state.bestAnswer == null ? null
                      :
                      <div>
                      <CommentModel key={this.state.bestAnswer.comment_id} comment={this.state.bestAnswer} best={true}></CommentModel>
                      {(this.state.maxPage == 0) || (this.state.maxPage + 1 == 0) ?
                       null :
                        <p style={{ textAlign: "center", margin: "auto" }}><span style={{ marginBottom: "10px" }}>The actual page is : {this.state.actualPage + 1} / {this.state.maxPage + 1}</span><br />
                        {(this.state.actualPage) == 0 ?
                         <button className="button is-link" disabled>Prev</button> :
                          <button className="button is-link" onClick={this.pushPrevButton}>Prev</button>}  {this.state.actualPage == this.state.maxPage ? <button className="button is-link" disabled>Next</button> : <button className="button is-link" onClick={this.pushNextButton}>Next</button>}<br />
                    </p>}
                    </div>
                   )
                    
                   )
                  
                  
                  }


                    <div className="columns">
                      <div className="column is-2"></div>
                      <div className="column is-8">
  
                        {this.state.comments != null ?
                          this.state.comments.slice(0 + (this.state.actualPage * this.state.elementsByPage), 5 + (this.state.actualPage * this.state.elementsByPage)).map((val, index) =>
                            <CommentModel key={val.comment_id} comment={val} best={false}></CommentModel>
                          )
                          :
                          <p>Aucun commentaire</p>}
                      </div>
                    </div>
                  



                </div>
                :
                <div><p>Aucun post avec cet identifiant</p></div>}
            </div>

          </section>
          <footer className="modal-card-foot">
            {this.props.isLogged ?
              <div className="field addcomment">
                <label className="label add_top">Add a comment</label>
                <div className="control is-flex add">
                  <textarea className="area" type="text" placeholder="Comment" value={this.state.valueComment} onChange={this.handleChangeComment} />
                  <div className="add_bottom">
                    <div className="select" className="select">
                      <select value={this.state.valueCategory} onChange={this.handleChangeCategory}>
                        {(this.props.categorieComment.categories.length !== 0) ?
                          this.props.categorieComment.categories.map((val, index) =>
                            <option key={val.comment_category_id} value={val.comment_category_id} style={{backgroundColor:val.color}}>{val.description}</option>
                          )
                          :
                          null
                        }
                      </select>
                    </div>
                    <button className="button is-link" onClick={this.sendData}>send</button>
                  </div>
                </div>
              </div>
              :
              <div className="field card addpost">
                <label className="label add_top">You need to be connected to add a comment</label>
              </div>
            }
          </footer>
        </div>
      </div>


    );
  }
}

const mapStateToProps = state => {
  return {
    categorieComment: state.categorieComment,
    isLogged: state.isLogged,
    post: state.post,
    comment: state.comment,
    error: state.post.error,
    posts: state.post.posts,
    pending: state.post.pending,
    popUp: state.popUp,
    bestAnswer: state.bestAnswer

  }
}
const mapDispatchToProps = (dispatch, own) => bindActionCreators({

  fetchCommentsByPostId: fetchCommentsByPostId,
  fetchCommentCategories: fetchCommentCategories,
  fetchPosts: fetchPosts,
  updatePostLike: updatePostLike,
  updatePostReport: updatePostReport,
  unsetPopUp

}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);


