import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./Home";
import Stuff from "./Stuff";
import Contact from "./Contact";
import Login from "./Login";
import Posts from "./Posts";
import Post from "./Post";
import {login,logoff,setUser} from '../actions';
class Main extends Component {

 
  verifLogin(){
    const token = localStorage.token;
    fetch("http://51.255.175.118:2000/user/verify",{
      method:"GET",
      headers:{
        'Authorization':'Bearer '+token
      }
    })
    .then(response => response.json())
    .then(json =>{
      if(json){
        
          if(!json.error){
          this.props.login()
          fetch("http://51.255.175.118:2000/user/" + json.id, {
            method: "GET",
            headers:{
              'Authorization':'Bearer '+token
            }
          })
            .then(res => res.json())
            .then((data) => {
            
              this.props.setUser(data[0])
    
            })
          }
      }
    })
    
  }
  componentDidMount(){
    this.verifLogin()
  }
  logoff(){
   this.props.logoff();
    localStorage.setItem("token",null)
    window.location.href = '/#/';
  }

  render() {
    return (
      
        <HashRouter>
         <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="/#/">
   
      <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"/>
  
    </a>

    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item" href="/#/">
      Home
      </a>
      <a class="navbar-item"href="/#/contact" >
      Contact
      </a>
      <a class="navbar-item" href="/#/posts">
      Posts
      </a>

    
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
        {!this.props.isLogged ? <NavLink to="/login"><a class="button is-primary">
            <strong>Login</strong>
          </a></NavLink>: null}
          
        {this.props.isLogged ? <button  class="button is-primary" onClick={()=> this.logoff()}>logOff</button>: null}
        </div>
      </div>
    </div>
  </div>
</nav>
<section class="section">
    <div class="container">
    <Route exact path="/" component={Home}/>
    <Route path="/stuff" component={Stuff}/>
    <Route path="/posts" component={Posts}/>
    <Route path="/post/:id" component={Post}/>
    <Route path="/login" component={Login}/>
    <Route path="/contact" component={Contact}/>
  
    </div>
  </section>

        </HashRouter>
    );
  }
}


const mapStateToProps = (state) =>{
  return{
    isLogged : state.isLogged
  }
}
const mapDispatchToProps = ()=>{
  return{
    logoff,
    login,
    setUser

  }
}
 
export default connect(mapStateToProps,mapDispatchToProps())(Main);