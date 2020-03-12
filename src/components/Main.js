import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import fetchPosts from '../fetch/fetchPosts'
import Login from './Login'
import fetchUsers from '../fetch/fetchUsers'

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
import { login, logoff, setUser, unSetUser,openPopUp,closePopUp } from '../actions';
import sha256 from 'sha256'
import fetchCommentCategories from "../fetch/fetchCommentCategories";
import fetchPostCategories from "../fetch/fetchPostCategories";
class Main extends Component {

  constructor(props) {
    super(props)
    
    this.state = {
      dataLoaded: false,
    }


  }

  async verifLogin() {
    const token = localStorage.token;
    console.log(token)
    if(token != "null" && token != undefined){
      var response = await fetch("http://51.255.175.118:2000/user/verify", {
        method: "GET",
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
        response = await response.json()
        
          if (response) {
            if (!this.props.isLogged) {
              if (!response.error) {
                this.props.login()
                var res = await fetch("http://51.255.175.118:2000/user/" + response.id, {
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
        }else{
          this.props.setUser(null)
        }
    

  }
  
  async componentDidMount() {
   await this.verifLogin()
    
    await this.props.fetchPosts()
    await this.props.fetchCommentCategories()
    await this.props.fetchPostCategories()

  //  await this.props.fetchUsers()

    this.setState({dataLoaded: true})
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
      {!this.props.isLogged ?   
      <div className={(!this.props.loginPopUp)  && (this.state.currentPostId == null) ? 'modal' : 'modal is-active'}>
  <div className="modal-background"></div>
  <div className="modal-card">
    <header className="modal-card-head">
      <p className="modal-card-title">lOGIN</p>
      <button className="delete" aria-label="close" onClick={()=>{this.props.closePopUp()}}></button>
    </header>
    <section className="modal-card-body">
        <Login></Login>
    </section>
    <footer className="modal-card-foot">
      <button className="button" onClick={()=>{this.props.closePopUp()}}>Cancel</button>
    </footer>
  </div>
</div> : null}

        <nav className="navbar" style={{backgroundColor: '#BBDCF2'}}role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <a className="navbar-item" href="/#/">

              <img src="logo1.png" alt="logo" />

            </a>

            <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">
              <a className="navbar-item" href="/#/">
                Home
      </a>
              <a className="navbar-item" href="/#/contact" >
                Contact
      </a>
              <a className="navbar-item" href="/#/informations">
                Informations
      </a>
      {this.props.user != null ?  
      (this.props.user.admin == 1)? 
        <a className="navbar-item" href="/#/backoffice">
                Backoffice
      </a>
        :
         null
      :
      null
      }
            </div>

            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  {!this.props.isLogged ? <a onClick={()=>{this.props.openPopUp()}} className="navbar-item">
                    Login
                  </a> : <a className="navbar-item" onClick={() => this.logoff()}>Logout</a>}
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
            <Route exact path="/backoffice/postCategories/:id/edit" component={BackOfficeEditPostCategory}/>
            <Route exact path="/backoffice/commentCategories/:id/edit" component={BackOfficeEditCommentCategory}/>
            <Route exact path="/backoffice/posts/:id/comments" component={BackOfficeShowComments} />
            <Route exact path="/backoffice/posts/:post_id/comments/:comment_id/edit" component={BackOfficeEditComment} />


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
    post : state.post,
    comment : state.comment,
    user: state.user,
    loginPopUp : state.loginPopUp
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  logoff,
    login,
    setUser,
    unSetUser,
    openPopUp,
    closePopUp,
  fetchPosts: fetchPosts,
  fetchCommentCategories: fetchCommentCategories,
  fetchPostCategories:fetchPostCategories,
  fetchUsers: fetchUsers

}, dispatch)



export default connect(mapStateToProps, mapDispatchToProps)(Main);
