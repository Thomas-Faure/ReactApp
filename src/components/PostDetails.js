import React, { Component } from "react";
import { connect } from "react-redux";
import CommentModel from './Model/CommentModel'
import Moment from 'react-moment';
class PostDetails extends Component {

  constructor(props) {
    super(props)

    this.state = {
      id: 0,
      post: null,
      comments: null,
      alreadyReported: false,
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
    this.sendData = this.sendData.bind(this)

  }

  pushPrevButton() {
    if (this.state.actualPage > 0) {
      this.setState({
        actualPage: this.state.actualPage - 1

      })
    }

  }

  pushNextButton() {
    if (this.state.actualPage != this.state.maxPage) {
      this.setState({
        actualPage: this.state.actualPage + 1

      })
    }

  }
  componentDidMount() {
    this.getData()
    this.getCategories()

  }
  handleChangeComment(event) {
    this.setState({ valueComment: event.target.value })
  }
  handleChangeCategory(event) {
    this.setState({ valueCategory: event.target.value })
  }

  getPost() {
    fetch("http://51.255.175.118:2000/post/" + this.state.id, {
      method: "GET"
    })
      .then(res => res.json())
      .then((data) => {

        this.setState({ post: data[0] }, () => { this.verifAlreadyCommented() })

      })

  }
  async getComments() {

    let x = await fetch("http://51.255.175.118:2000/post/" + this.state.id + "/comments", {
      method: "GET"
    })
    let y = await  x.json()

    let z = await  this.setState(
          {
            comments: y,
            maxPage: (Math.ceil(y.length / this.state.elementsByPage)-1)
          }
        )
        
        
    return

  }
  verifAlreadyCommented() {
    const token = localStorage.token;
    fetch("http://51.255.175.118:2000/reportpost/" + this.state.post.post_id + "/byToken", {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }

    }
    ).then(res => res.json())
      .then(res => {

        if (res.length > 0) {
          this.setState({ alreadyReported: true })

        } else {
          this.setState({ alreadyReported: false })
        }
      })

  }

  report() {
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
        this.setState({ alreadyReported: res.result })
      })

  }
  getCategories() {
    fetch("http://51.255.175.118:2000/commentCategory", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then((data) => {

        this.setState({ categories: data },
          this.setState({ valueCategory: data[0].comment_category_id }))

      })

  }


  getData() {
    {
      if (this.state.id !== this.props.match.params.id) {
        this.setState({ id: this.props.match.params.id },
          () => {
            this.getPost()
            this.getComments()

          });
      }
    }
  }

  sendData() {
    const token = localStorage.token;
    fetch("http://51.255.175.118:2000/post/" + this.state.post.post_id + "/comment/create", {
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
         
         let asyncChangepage = async()=>{
           console.log("oui")
           let x = await this.getComments()
           console.log(this.state.comments.length)
           let y = await this.setState({actualPage: this.state.maxPage,valueComment: ""})

         }
         asyncChangepage()
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
                  </div>
                </div>
                <div className="rating">
                  <div className="liked"><p className="infosRate">{this.state.post.like}</p><img src="ear.png" alt="img1" className="icon"></img></div>
                  <div className="liked"><p className="infosRate">{this.state.post.comment}</p><img src="comment.png" alt="img2" className="icon"></img></div>
                  <div className="liked"> 
                  {this.props.isLogged ?
                    (this.state.alreadyReported === true ?
                      <a  onClick={this.report} > <p className="infosRate">{this.state.post.report}</p><img src="warning.png" alt="img3" className="icon"></img> <span aria-label="validate">✅</span></a>
                      :
                      <a  onClick={this.report}><p className="infosRate"> {this.state.post.report}<img src="warning.png" alt="img3" className="icon"></img></p></a>)
                    : <p className="infosRate">{this.state.post.report}<img src="warning.png" alt="img3" className="icon"></img></p>}
                  </div>
                </div>
                <div className="bestanswer">
                  <p>Best answer</p>
                </div>
              </div>

            </div>
            {(this.state.maxPage == 0 ) || (this.state.maxPage + 1 == 0 )? null : <p style={{ textAlign: "center", margin: "auto" }}><span style={{ marginBottom: "10px" }}>The actual page is : {this.state.actualPage + 1} / {this.state.maxPage + 1}</span><br />{(this.state.actualPage ) == 0 ? <button className="button is-link" disabled>Prev</button> : <button className="button is-link" onClick={this.pushPrevButton}>Prev</button>}  {this.state.actualPage == this.state.maxPage ? <button className="button is-link" disabled>Next</button> : <button className="button is-link" onClick={this.pushNextButton}>Next</button>}<br />
            </p>}

            {this.state.comments != null ?
              this.state.comments.slice(0 + (this.state.actualPage * this.state.elementsByPage), 5 + (this.state.actualPage * this.state.elementsByPage)).map((val, index) =>
                <CommentModel comment={val}></CommentModel>
              )
              :
              <p>Aucun commentaire</p>}

          </div>
          :
          <div><p>Aucun post avec cet identifiant</p></div>}
        {this.props.isLogged ?
          <div class="field card addpost">
            <label class="label add_top">Add a comment</label>
            <div class="control is-flex add">
              <textarea class="area" type="text" placeholder="Comment" value={this.state.valueComment} onChange={this.handleChangeComment} />
              <div class="add_bottom">
                <div className="select" class="select">
                  <select value={this.state.valueCategory} onChange={this.handleChangeCategory}>
                    {(this.state.categories.length != 0) ?
                      this.state.categories.map((val, index) =>
                        <option value={val.comment_category_id}>{val.description}</option>
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
          <div class="field card addpost">
            <label class="label add_top">Merci de vous connecter pour commenter</label>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLogged: state.isLogged
  }
}

export default connect(mapStateToProps, null)(PostDetails);
