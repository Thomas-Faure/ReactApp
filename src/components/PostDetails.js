import React, { Component } from "react";
import Moment from 'react-moment';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import CommentModel from './Model/CommentModel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import fetchCommentsByPostId from '../fetch/fetchComments'
import fetchCommentCategories from "../fetch/fetchCommentCategories";
import fetchPosts from '../fetch/fetchPosts'
import { unsetPopUp, updatePostLike, updatePostReport, deletePost, changeBestAnswer } from '../actions';
import axios from 'axios'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import { FormattedMessage, injectIntl } from 'react-intl';

/*
* Composant affichant le détails d'un post, c'est à dire les informations d'un post en lui même
* et sa list de commentaires ainsi q'un formulaire pour ajouter un nouveau commentaire à ce post
*
*/
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
      valueCategory: this.props.categorieComment.byId[this.props.categorieComment.allIds[0]].comment_category_id,
      categories: [],
      owner: false,
      commentsID: [],
      anonymous: false,
      delete: null,
      error: false
    }
    this.geData = this.getData.bind(this)
    this.report = this.report.bind(this)
    this.pushNextButton = this.pushNextButton.bind(this)
    this.pushPrevButton = this.pushPrevButton.bind(this)
    this.handleChangeComment = this.handleChangeComment.bind(this)
    this.handleChangeCategory = this.handleChangeCategory.bind(this)
    this.sendData = this.sendData.bind(this)
    this.postOwner = this.postOwner.bind(this)
    this.commentsOwner = this.commentsOwner.bind(this)
    this.isOwner = this.isOwner.bind(this)
    this.handleAnonymousInput = this.handleAnonymousInput.bind(this)

  }


  componentDidMount() {

    this.props.fetchCommentsByPostId(this.props.popUp.id).then(() => {
      this.getData()
    })
    if (this.props.isLogged) {
      this.postOwner()
      this.commentsOwner()
    }
  }

  handleAnonymousInput(event) {
    this.setState({ anonymous: !this.state.anonymous })
  }
/*
* Acceder à la page precedente si possible
*
*/
  pushPrevButton() {
    if (this.state.actualPage > 0) {
      this.setState({
        actualPage: this.state.actualPage - 1

      })
    }
  }
/*
* Supprimer un post qui nous appartient
*
*/
  async removePost() {
    const token = localStorage.token;
    const config = {
      headers: { Authorization: 'Bearer ' + token }
    };
    const res = await axios.delete("https://thomasfaure.fr/post/" + this.state.id + "/delete", config)
    if (res.data.affectedRows > 0) {
      this.props.unsetPopUp()
      this.props.deletePost(this.state.id)
      let commentsList = this.props.comment.allIds.map(id => this.props.comment.byId[id])
    }
  }
/*
* Acceder à la page suivante si elle existe
*
*/
  pushNextButton() {
    if (this.state.actualPage !== this.state.maxPage) {
      this.setState({
        actualPage: this.state.actualPage + 1

      })
    }

  }
/*
* Recuperation des posts dont l'utilisateur courant est le propriétaire
*
*/
  async postOwner() {
    const token = localStorage.token;
    const config = {
      headers: { Authorization: 'Bearer ' + token }
    };
    const res = await axios.get("https://thomasfaure.fr/post/" + this.state.id + "/isOwner", config)
    this.setState({
      owner: res.data
    });
  }
/*
* Recuperation des commentaires du post dont l'utilisateur est le propriétaire
*
*/
  async commentsOwner() {
    const token = localStorage.token;
    const config = {
      headers: { Authorization: 'Bearer ' + token }
    };
    const res = await axios.get("https://thomasfaure.fr/user/post/" + this.state.id + "/commentsId", config)
    this.setState({
      commentsID: res.data
    });
  }
/*
* Ajout ou suprression d'un like sur un post
*
*/
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
/*
* Mise à jour des commentaires du post
*
*/
  setComments() {
    let commentsList = this.props.comment.allIds.map(id => this.props.comment.byId[id])

    this.setState({
      comments: commentsList,
      maxPage: (Math.ceil(commentsList.length / this.state.elementsByPage) - 1)
    })
  }
/*
* Chargement descommentaires du post
*
*/
  getData() {

    let commentsList = this.props.comment.allIds.map(id => this.props.comment.byId[id])


    this.setState({
      comments: commentsList,
      maxPage: (Math.ceil(commentsList.length / this.state.elementsByPage) - 1)

    }, () => { })
  }

  handleChangeComment(event) {
    if ((event.target.value).trim() == "") {
      this.setState({ error: true })
    }
    else {
      this.setState({ error: false })
    }
    this.setState({ valueComment: event.target.value })
  }
  handleChangeCategory(event) {
    this.setState({ valueCategory: event.target.value })
  }
/*
* Verification si l'id du commentaire donné en paramètres est un id dont l'utilisateur est propriétaire
*
*/
  isOwner(id) {
    var a = false
    this.state.commentsID.filter(idC => {
      if (id == idC.comment_id) {
        a = true
      }
    })
    return a
  }
/*
* Signalement d'un post
*
*/
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



/*
* Ajout d'un commentaire sur le post
*
*/

  async sendData() {
    if ((this.state.valueComment).trim() == "") {
      this.setState({ error: true })
      return false
    }
    const token = localStorage.token;
    fetch("https://thomasfaure.fr/post/" + this.props.post.byId[this.props.popUp.id].post_id + "/comment/create", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token

      },
      body: JSON.stringify({ description: this.state.valueComment, category: this.state.valueCategory, anonyme: this.state.anonymous })
    })
      .then(res => res.json())
      .then((data) => {
        if (data.result === true) {
          let asyncChangepage = async () => {
            await this.props.fetchCommentsByPostId(this.props.popUp.id)
            await this.props.fetchCommentCategories()
            await this.props.fetchPosts()
            this.setComments()
            var listComments = this.props.comment.allIds.map(el => this.props.comment.byId[el])
            if (listComments.length == 0) {
              this.props.changeBestAnswer(null, this.props.popUp.id)
            } else {
              const max = listComments.reduce(function (prev, current) {
                return ((prev.like-prev.dislike) > (current.like-current.dislike)) ? prev : current
              })

              if((max.like-max.dislike) > 0){
              this.props.changeBestAnswer(max, this.props.popUp.id)
              }else{
                this.props.changeBestAnswer(null, this.props.popUp.id)
              }
            }
            await this.setState({ actualPage: this.state.maxPage, valueComment: "" })
            await this.commentsOwner()
          }
          asyncChangepage()
        }

      })
  }
/*
* Vue détaillé d'un post avec ses commentaires
*
*/
  render() {
    let commentsList = this.props.comment.allIds.map(id => this.props.comment.byId[id])
    var bestAnswer = null
    if (this.props.bestAnswer.allIds.length > 0) {
      let bestAnswerId = this.props.bestAnswer.byId[this.state.id]
      if (bestAnswerId != undefined && bestAnswerId != null) {
        bestAnswer = commentsList.find(element => element.comment_id == bestAnswerId.comment_id)
      }
    }

    let categoryList = this.props.categorieComment.allIds.map(id => this.props.categorieComment.byId[id])
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
                        {this.state.owner ? <div className="btDelete"><button className="delete red" title="Remove post" onClick={() => { this.setState({ delete: "deletePost" }) }}></button></div>
                          : null}
                        <div className="infos">
                          <div className="spacebetween">
                            <p className="author"><FontAwesomeIcon icon="user" /><strong>@{this.props.post.byId[this.props.popUp.id].username}</strong></p>
                            <p className="date"><Moment fromNow>
                              {this.props.post.byId[this.props.popUp.id].date}
                            </Moment>
                            </p>

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
                            <div className="imgPost">
                              <img className="imgPostContent" src={'https://thomasfaure.fr/' + this.props.post.byId[this.props.popUp.id].url_image} />
                            </div>
                            :
                            null}
                        </div>

                      </div>
                      <div className="rating" >
                        <div className="liked"><a onClick={() => this.like()}><p className="infosRate">{this.props.post.byId[this.props.popUp.id].like}</p><img src="ear.png" alt="img1" className="icon"></img></a></div>
                        <div className="liked"><p className="infosRate">{this.props.comment.allIds.length}</p><img src="comment.png" alt="img2" className="icon"></img></div>
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
                  {this.state.delete != "deletePost" ? null
                    :
                    <div className={'modal is-active '}>
                      <div className="modal-background" onClick={() => { this.setState({ delete: null }) }}></div>
                      <div className="modal-card">
                        <header className="modal-card-head">
                          <p className="modal-card-title"><FormattedMessage id="post.delete" /></p>
                          <button className="delete" aria-label="close" onClick={() => { this.setState({ delete: null }) }}></button>
                        </header>
                        <section className="modal-card-body">
                          <p><FormattedMessage id="delete.confirm" /></p>
                        </section>
                        <footer className="modal-card-foot ">
                          <div className="padding">
                            <button className="button is-danger" onClick={() => { this.removePost(); this.setState({ delete: null }) }}><FormattedMessage id="delete" /></button>
                            <button className="button" onClick={() => { this.setState({ delete: null }) }}><FormattedMessage id="cancel" /></button>
                          </div>
                        </footer>
                      </div>
                    </div>
                  }
                  {this.props.comment.pending == true ? <div style={{ textAlign: "center", margin: "auto" }}><Loader
                    type="ThreeDots"
                    color="#2c60a4cc"
                    height={100}
                    width={100}


                  /></div>
                    :
                    (
                      (bestAnswer == null ? <div>

                        {(this.state.maxPage == 0) || (this.state.maxPage + 1 == 0) ?
                          null :
                          <p style={{ textAlign: "center", margin: "auto" }}><span style={{ marginBottom: "10px" }}>Page : {this.state.actualPage + 1} / {this.state.maxPage + 1}</span><br />
                            {(this.state.actualPage) == 0 ?
                              <button className="button is-link" disabled>←</button> :
                              <button className="button is-link" onClick={this.pushPrevButton}>←</button>}  {this.state.actualPage == this.state.maxPage ? <button className="button is-link" disabled>→</button> : <button className="button is-link" onClick={this.pushNextButton}>→</button>}<br />
                          </p>}
                      </div>
                        :
                        <div>
                          <CommentModel key={bestAnswer.comment_id} commentid={bestAnswer.comment_id} owner={false} best={true}></CommentModel>
                          {(this.state.maxPage == 0) || (this.state.maxPage + 1 == 0) ?
                            null :
                            <p style={{ textAlign: "center", margin: "auto" }}><span style={{ marginBottom: "10px" }}>Page : {this.state.actualPage + 1} / {this.state.maxPage + 1}</span><br />
                              {(this.state.actualPage) == 0 ?
                                <button className="button is-link" disabled>←</button> :
                                <button className="button is-link" onClick={this.pushPrevButton}>←</button>}  {this.state.actualPage == this.state.maxPage ? <button className="button is-link" disabled>→</button> : <button className="button is-link" onClick={this.pushNextButton}>→</button>}<br />
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
                          <CommentModel key={val.comment_id} commentid={val.comment_id} best={false} owner={this.isOwner(val.comment_id)}></CommentModel>
                        )
                        :
                        <p><FormattedMessage id="nocomment" /></p>}
                    </div>
                  </div>




                </div>
                :
                <div><p><FormattedMessage id="post.notfound" /></p></div>}
            </div>

          </section>
          <footer className="modal-card-foot">
            {this.props.isLogged ?
              <div className="field addcomment">
                <label className="label add_top"><FormattedMessage id="comment.add" /></label>
                <div className="control is-flex add">
                  <label className="checkbox">
                    <input type="checkbox" checked={this.state.anonymous} onChange={this.handleAnonymousInput} />
                    <FormattedMessage id="comment.anonyme" />
                  </label>
                  {this.state.error ? <h3 className="error"><FormattedMessage id="error.commentValue" /></h3> : null}
                  <textarea className="area" type="text" placeholder="Comment" value={this.state.valueComment} onChange={this.handleChangeComment} />
                  <div className="add_bottom">
                    <div className="select" className="select">
                      <select value={this.state.valueCategory} onChange={this.handleChangeCategory}>
                        {(categoryList.length !== 0) ?
                          categoryList.map((val, index) =>
                            <option key={val.comment_category_id} value={val.comment_category_id} style={{backgroundColor: val.color}}>{val.description}</option>
                          )
                          :
                          null
                        }
                      </select>
                    </div>
                    <button className="button is-link" onClick={this.sendData}><FormattedMessage id="send" /></button>
                  </div>
                </div>
              </div>
              :
              <div className="field card addpost">
                <div className="center">
                  <h6 className="title has-text-black "><FormattedMessage id="error.comment.login" /><a onClick={() => { this.login() }}><FormattedMessage id="login" /></a></h6>
                </div>
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
  unsetPopUp: unsetPopUp,
  deletePost: deletePost,
  changeBestAnswer: changeBestAnswer

}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);


