import React, { Component } from "react";
import { connect } from "react-redux";
import { login, setUser, unsetPopUp, setPopUp } from '../actions';
import sha256 from 'sha256';
import {FormattedMessage,injectIntl} from 'react-intl';
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      valueP: "",
      valueU: "",
      errorLogin: false,

    }
    this.login = this.login.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
    this.handleChangeUsername = this.handleChangeUsername.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.register = this.register.bind(this)
  }

  handleChangeUsername(event) {
    this.setState({ valueU: event.target.value })
  }
  handleChangePassword(event) {
    this.setState({ valueP: event.target.value })
  }

  handleSubmit(event) {
    this.login()
    event.preventDefault();
  }

  register() {
   this.props.setPopUp("register", null)
  }

  async login() {
    var user_id = 0

    var res = await fetch("https://thomasfaure.fr/user/login", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: this.state.valueU, password: sha256(this.state.valueP) })
    })
    res = await res.json()
   
    if (res.token !== undefined) {
        user_id = res.id
        this.setState({ errorLogin: false })

        var info = await fetch("https://thomasfaure.fr/user/" + user_id, {
            method: "GET",
            headers: {
              'Authorization': 'Bearer ' + res.token
            }
        })
        info = await info.json()
        this.props.setUser(info[0])
       this.props.unsetPopUp()
        localStorage.setItem("token", res.token)
      this.props.login()

        } else {
          this.setState({ errorLogin: true })
        }
      

  }

  render() {
    const { formatMessage } = this.props.intl;

    return (
      <section className=" is-fullheight" style={{ backgroundColor: "#BBDCF2", borderRadius: "5px" }}>
        <div className="">
          <div className="container has-text-centered">
            <div className="column">
              <h3 className="title has-text-black"><FormattedMessage id="login.label"/></h3>
              <hr className="login-hr" />
              <p className="subtitle has-text-black"><FormattedMessage id="login.sentence"/></p>
              <div className="box">
                <div>{this.state.errorLogin ? <h1>Il y a un erreur dans le login</h1>
                  : null}
                </div>

                <form onSubmit={this.handleSubmit}>
                  <div className="field" onSubmit={this.handleSubmit}>
                  <label className=" is-large"><FormattedMessage id="register.field.username"/></label>
                    <div className="control">
                      <input className="input is-large" type="text" placeholder={formatMessage({id: "login.field.username"})} value={this.state.valueU} onChange={this.handleChangeUsername} />
                    </div>
                  </div>
                  <div className="field">
                  <label className=" is-large"><FormattedMessage id="register.field.password"/></label>
                    <div className="control">
                      <input className="input is-large" type="password" placeholder={formatMessage({id: "login.field.password"})} value={this.state.valueP} onChange={this.handleChangePassword} />
                    </div>
                  </div>

                  <input className="button is-link" type="submit" value={formatMessage({id: "login.submit"})}></input>
                </form>
              </div>
              <p className="has-text-grey">
                <a onClick={()=>{this.register()}}><FormattedMessage id="login.bottom.signup"/></a> &nbsp;·&nbsp;
                        <a href="../"><FormattedMessage id="login.bottom.forgot"/></a> &nbsp;·&nbsp;
                        <a href="../"><FormattedMessage id="login.bottom.needHelp"/></a>
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLogged: state.isLogged,
    user: state.userInfo,
    loginPopUp: state.loginPopUp
  }
}

const mapDispatchToProps = () => {
  return {
    login,
    setUser,
    unsetPopUp,
    setPopUp

  }
}



export default injectIntl(connect(mapStateToProps, mapDispatchToProps())(Login));