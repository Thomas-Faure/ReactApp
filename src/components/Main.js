import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Route,
  HashRouter
} from "react-router-dom";
import Stuff from "./Stuff";
import Contact from "./Contact";
import Login from "./Login";
import Posts from "./Posts";
import Post from "./Post";
import Informations from "./Informations";
import { login, logoff, setUser, unSetUser } from '../actions';
class Main extends Component {


  verifLogin() {
    const token = localStorage.token;
    fetch("http://51.255.175.118:2000/user/verify", {
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(response => response.json())
      .then(json => {
        if (json) {
          if (!this.props.isLogged) {
            if (!json.error) {
              this.props.login()
              fetch("http://51.255.175.118:2000/user/" + json.id, {
                method: "GET",
                headers: {
                  'Authorization': 'Bearer ' + token
                }
              })
                .then(res => res.json())
                .then((data) => {

                  this.props.setUser(data[0])

                })
            }
          }

        }
      })

  }
  componentDidMount() {
    this.verifLogin()
  }
  logoff() {
    this.props.logoff();
    localStorage.setItem("token", null)
    window.location.href = '/#/';
    this.props.unSetUser()
  }

  render() {
    return (

      <HashRouter>
        <nav className="navbar " role="navigation" aria-label="main navigation">
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


            </div>

            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  {!this.props.isLogged ? <a href="/#/login" className="button is-primary">
                    <strong>Login</strong>
                  </a> : null}

                  {this.props.isLogged ? <button className="button is-primary" onClick={() => this.logoff()}>logOff</button> : null}
                </div>
              </div>
            </div>
          </div>
        </nav>
        <section className="section">
          <div className="container">
            <Route exact path="/" component={Posts} />
            <Route path="/stuff" component={Stuff} />
            <Route path="/posts" component={Posts} />
            <Route path="/post/:id" component={Post} />
            <Route path="/login" component={Login} />
            <Route path="/contact" component={Contact} />
            <Route path="/informations" component={Informations} />

          </div>
        </section>

      </HashRouter>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    isLogged: state.isLogged
  }
}
const mapDispatchToProps = () => {
  return {
    logoff,
    login,
    setUser,
    unSetUser

  }
}

export default connect(mapStateToProps, mapDispatchToProps())(Main);