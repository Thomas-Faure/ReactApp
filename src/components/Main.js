import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import fetchPosts from '../fetch/fetchPosts'
import Login from './Login'
import Register from './Register'
import fetchUsers from '../fetch/fetchUsers'
import {FormattedMessage} from 'react-intl';


import {
  Route,
  HashRouter
} from "react-router-dom";
import Contact from "./Contact";

import PostsList from "./PostsList";
import PostDetails from "./PostDetails";
import Informations from "./Informations";
import BackOfficeShowPosts from './backoffice/show/Post'
import BackOfficeShowUsers from './backoffice/show/User'
import BackOfficeShowPostCategories from './backoffice/show/PostCategory'
import BackOfficeShowCommentCategories from './backoffice/show/CommentCategory'
import BackOfficeShowComments from './backoffice/show/Comments'
import BackOfficeIndex from './backoffice/index'
import BackOfficeCreatePost from './backoffice/create/Post'
import BackOfficeCreateUser from './backoffice/create/User'
import BackOfficeEditPost from './backoffice/edit/Post'
import BackOfficeEditUser from './backoffice/edit/User'
import BackOfficeEditComment from './backoffice/edit/Comment'
import BackOfficeEditPostCategory from './backoffice/edit/PostCategory'
import BackOfficeCreatePostCategory from './backoffice/create/PostCategory'
import BackOfficeCreateCommentCategory from './backoffice/create/CommentCategory'
import BackOfficeEditCommentCategory from './backoffice/edit/CommentCategory'
import BackOfficeShowReportComments from './backoffice/show/ReportComment'
import BackOfficeShowReportPosts from './backoffice/show/ReportPost'
import { login, logoff, setUser, unSetUser, setPopUp, unsetPopUp,changeLanguage } from '../actions';
import sha256 from 'sha256';
import fetchBestAnswer from "../fetch/fetchBestAnswer";
import fetchCommentCategories from "../fetch/fetchCommentCategories";
import fetchPostCategories from "../fetch/fetchPostCategories";
import AddPost from "./AddPost";
import Account from "./Account";

class Main extends Component {

  constructor(props) {
    super(props)

    this.state = {
      dataLoaded: false,
      burgerOpen: false
    }


  }

  async verifLogin() {
    if (localStorage.getItem("token") !== null) {

      const token = localStorage.token;

      if (token != "null" && token != undefined) {

        var response = await fetch("https://thomasfaure.fr/user/verify", {
          method: "GET",
          headers: {
            'Authorization': 'Bearer ' + token
          }
        })
        if (response.status == 500) {
          localStorage.removeItem("token")
        } else {
          response = await response.json()

          if (response) {
            if (!this.props.isLogged) {
              if (!response.error) {
                this.props.login()
                var res = await fetch("https://thomasfaure.fr/user/" + response.id, {
                  method: "GET",
                  headers: {
                    'Authorization': 'Bearer ' + token
                  }
                })

                res = await res.json()

                this.props.setUser(res[0])


              }
            }
          }
        }
      } else {
        this.props.setUser(null)
      }
    }


  }

  async componentDidMount() {
    await this.verifLogin()

    await this.props.fetchPostCategories()
    await this.props.fetchCommentCategories()
     this.props.fetchPosts()
     this.props.fetchBestAnswer()
    
     this.setState({ dataLoaded: true })
  }

  clickBurger(){
    this.setState({burgerOpen: (!this.state.burgerOpen)})
  }
  logoff() {
    this.props.logoff();
    localStorage.setItem("token", null)
    window.location.href = '/#/';
    this.props.unSetUser()
  }

  render() {
    return (
      (this.state.dataLoaded !== true) ? null :
        <div>
          <HashRouter>
            {this.props.popUp.page != "addPost" ? null
              :
              <AddPost></AddPost>
            }

            {this.props.popUp.page != "postDetails" ? null
              :
              <PostDetails></PostDetails>
            }

            {!this.props.isLogged ?
              <div>
                {this.props.popUp.page != "register" ? null :
                  <div className={'modal is-active'}>
                    <div className="modal-background" onClick={() => { this.props.unsetPopUp() }}></div>
                    <div className="modal-card">
                      <header className="modal-card-head">
                        <p className="modal-card-title">Register</p>
                        <button className="delete" aria-label="close" onClick={() => { this.props.unsetPopUp() }}></button>
                      </header>
                      <section className="modal-card-body">
                        <Register></Register>
                      </section>
                      <footer className="modal-card-foot">
                        <button className="button" onClick={() => { this.props.unsetPopUp() }}>Cancel</button>
                      </footer>
                    </div>
                  </div>
                  }
                {this.props.popUp.page != "login" ? null :
                  <div className={'modal is-active'}>
                    <div className="modal-background" onClick={() => { this.props.unsetPopUp() }}></div>
                    <div className="modal-card">
                      <header className="modal-card-head">
                        <p className="modal-card-title">Login</p>
                        <button className="delete" aria-label="close" onClick={() => { this.props.unsetPopUp() }}></button>
                      </header>
                      <section className="modal-card-body">
                        <Login></Login>
                      </section>
                      <footer className="modal-card-foot">
                        <button className="button" onClick={() => { this.props.unsetPopUp() }}>Cancel</button>
                      </footer>
                    </div>
                  </div>}
              </div>
              : null}
              {this.props.popUp.page != "account" ? null :
                <Account></Account> 
              }
            <nav className="navbar" style={{ backgroundColor: '#BBDCF2' }} role="navigation" aria-label="main navigation">
              <div className="navbar-brand navbar-start">
                <a className="navbar-item" href="/#/">

                  <img src="logo1.png" alt="logo" />

                </a>

                {this.state.burgerOpen != true ? 
                <a role="button" className="navbar-burger burger"  onClick={()=>this.clickBurger()} aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </a>
                
                :
                <a role="button" className="navbar-burger burger is-active"  onClick={()=>this.clickBurger()} aria-expanded="false" data-target="navbarBasicExample">
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                </a>

                
                }
                
              </div>
              
              <div id="navbarBasicExample"className={this.state.burgerOpen != true ?"navbar-menu" : "navbar-menu is-active" }>
                <div className="navbar-start">
                  <a className="navbar-item" onClick={()=>{this.setState({burgerOpen: false});window.location.href='/#/'}}>
                  <FormattedMessage id="navbar.home"/>
      </a>
                  <a className="navbar-item" onClick={()=>{this.setState({burgerOpen: false});window.location.href='/#/contact'}}>
                  <FormattedMessage id="navbar.contact"/>
      </a>
                  <a className="navbar-item" onClick={()=>{this.setState({burgerOpen: false});window.location.href='/#/informations'}}>
                  <FormattedMessage id="navbar.informations"/>
      </a>
      <div className="navbar-item has-dropdown is-hoverable">
        <a className="navbar-link">
        <FormattedMessage id="navbar.language"/>
        </a>

        <div className="navbar-dropdown">
          <a className="navbar-item" onClick={()=>{this.props.changeLanguage("fr")}}>
            Fr
          </a>
          <a className="navbar-item" onClick={()=>{this.props.changeLanguage("en")}}>
            En
          </a>

        </div>
      </div>

                  {this.props.user != null ?
                    (this.props.user.admin == 1) ?
                      <a className="navbar-item" onClick={()=>{this.setState({burgerOpen: false});window.location.href='/#/backoffice'}}>
                        <FormattedMessage id="navbar.backoffice"/>
      </a>
                      :
                      null
                    :
                    null
                  }
                </div>
                <div className="navbar-end">
                  <div className="navbar-item">
                    <div>
                      {!this.props.isLogged ? <a onClick={() => { this.setState({burgerOpen: false});this.props.setPopUp("login", null) }} className="navbar-item">
                        Login
                  </a> : <div><a className="navbar-item" onClick={() => {this.setState({burgerOpen: false});this.props.setPopUp("acount", null)}}>Account</a>
                  <a className="navbar-item" onClick={() => {this.setState({burgerOpen: false});this.logoff()}}>Logout</a></div>}
                    </div>
                  </div>
                </div>
              </div>
            </nav>
            <section className="section">
            
              <div className="container">
                <Route exact path="/" component={PostsList} />
                <Route path="/posts" component={PostsList} />
                <Route path="/post/:id" component={PostDetails} />
                <Route path="/login" component={Login} />
                <Route path="/account" component={account} />
                <Route path="/register" component={Register} />
                <Route exact path="/addPost" component={AddPost} />
                <Route path="/contact" component={Contact} />
                <Route path="/informations" component={Informations} />
                <Route exact path="/backoffice" component={BackOfficeIndex} />
                <Route exact path="/backoffice/users" component={BackOfficeShowUsers} />
                <Route exact path="/backoffice/posts" component={BackOfficeShowPosts} />
                <Route exact path="/backoffice/postCategories" component={BackOfficeShowPostCategories} />
                <Route exact path="/backoffice/commentCategories" component={BackOfficeShowCommentCategories} />
                <Route exact path="/backoffice/posts/create" component={BackOfficeCreatePost} />
                <Route exact path="/backoffice/users/create" component={BackOfficeCreateUser} />
                <Route exact path="/backoffice/postCategories/create" component={BackOfficeCreatePostCategory} />
                <Route exact path="/backoffice/commentCategories/create" component={BackOfficeCreateCommentCategory} />
                <Route exact path="/backoffice/users/:id/edit" component={BackOfficeEditUser} />
                <Route exact path="/backoffice/posts/:id/edit" component={BackOfficeEditPost} />
                <Route exact path="/backoffice/postCategories/:id/edit" component={BackOfficeEditPostCategory} />
                <Route exact path="/backoffice/commentCategories/:id/edit" component={BackOfficeEditCommentCategory} />
                <Route exact path="/backoffice/posts/:id/comments" component={BackOfficeShowComments} />
                <Route exact path="/backoffice/posts/:post_id/comments/:comment_id/edit" component={BackOfficeEditComment} />
                <Route exact path="/backoffice/reportComments" component={BackOfficeShowReportComments} />
                <Route exact path="/backoffice/reportPosts" component={BackOfficeShowReportPosts} />
              </div>
            </section>

          </HashRouter>
        </div>

    );
  }
}


const mapStateToProps = (state) => {
  return {
    isLogged: state.isLogged,
    post: state.post,
    comment: state.comment,
    user: state.user,
    popUp: state.popUp,
    bestAnswer:state.bestAnswer
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  logoff,
  login,
  setUser,
  unSetUser,
  setPopUp,
  unsetPopUp,
  fetchPosts: fetchPosts,
  fetchCommentCategories: fetchCommentCategories,
  fetchPostCategories: fetchPostCategories,
  fetchUsers: fetchUsers,
  fetchBestAnswer: fetchBestAnswer,
  changeLanguage:changeLanguage

}, dispatch)



export default connect(mapStateToProps, mapDispatchToProps)(Main);
