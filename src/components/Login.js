import React, { Component } from "react";
import { connect } from "react-redux";
import { login, setUser, unsetPopUp, setPopUp } from '../actions';
import sha256 from 'sha256';
import { FormattedMessage, injectIntl } from 'react-intl';
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      valueP: "",
      valueU: "",
      errorLogin: false,
      forget: "",
      mailF: "",
      passwordCF: "",
      passwordF: "",

    }
    this.login = this.login.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
    this.handleChangeUsername = this.handleChangeUsername.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.register = this.register.bind(this)
    this.mailF = this.mailF.bind(this)
    this.passwordCF = this.passwordCF.bind(this)
    this.passwordF = this.passwordF.bind(this)
  }

  mailF(event) {
    this.setState({ mailF: event.target.value })
  }
  passwordF(event) {
    this.setState({ passwordF: event.target.value })
  }
  passwordCF(event) {
    this.setState({ passwordCF: event.target.value })
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

  login() {
    var user_id = 0

    fetch("https://thomasfaure.fr/user/login", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: this.state.valueU, password: sha256(this.state.valueP) })
    })
      .then(res => res.json())
      .then((data) => {
        if (data.token !== undefined) {
          localStorage.setItem("token", data.token)
          this.props.login()
          user_id = data.id
          this.setState({ errorLogin: false })

          fetch("https://thomasfaure.fr/user/" + user_id, {
            method: "GET",
            headers: {
              'Authorization': 'Bearer ' + data.token
            }
          })
            .then(res => res.json())
            .then((data) => {
              this.props.setUser(data[0])
              this.props.unsetPopUp()

            })
        } else {
          this.setState({ errorLogin: true })
        }
      })

  }

  render() {
    const { formatMessage } = this.props.intl;

    return (
      <section className=" is-fullheight" style={{ backgroundColor: "#BBDCF2", borderRadius: "5px" }}>
        <div className="">
          <div className="container has-text-centered">
            <div className="column">
              <h3 className="title has-text-black"><FormattedMessage id="login.label" /></h3>
              <hr className="login-hr" />
              <p className="subtitle has-text-black"><FormattedMessage id="login.sentence" /></p>
              <div className="box">
                <div>{this.state.errorLogin ? <h1>Il y a un erreur dans le login</h1>
                  : null}
                </div>

                <form onSubmit={this.handleSubmit}>
                  <div className="field" onSubmit={this.handleSubmit}>
                    <label className=" is-large"><FormattedMessage id="register.field.username" /></label>
                    <div className="control">
                      <input className="input is-large" type="text" placeholder={formatMessage({ id: "login.field.username" })} value={this.state.valueU} onChange={this.handleChangeUsername} />
                    </div>
                  </div>
                  <div className="field">
                    <label className=" is-large"><FormattedMessage id="register.field.password" /></label>
                    <div className="control">
                      <input className="input is-large" type="password" placeholder={formatMessage({ id: "login.field.password" })} value={this.state.valueP} onChange={this.handleChangePassword} />
                    </div>
                  </div>

                  <input className="button is-link" type="submit" value={formatMessage({ id: "login.submit" })}></input>
                </form>
              </div>
              <p className="has-text-grey spacearound">
                <a onClick={() => { this.register() }}><FormattedMessage id="login.bottom.signup" /></a>
                <a onClick={() => { this.setState({ forget: "stateForget" }) }}><FormattedMessage id="login.bottom.forgot" /></a>
                <a href="../"><FormattedMessage id="login.bottom.needHelp" /></a>
              </p>
            </div>
          </div>
        </div>
        {this.state.forget != "stateForget" ? null
          :
          <div className={'modal is-active '}>
            <div className="modal-background" onClick={() => { this.setState({ forget: null }) }}></div>
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">Forget password</p>
                <button className="delete" aria-label="close" onClick={() => { this.setState({ forget: null }) }}></button>
              </header>
              <section className="modal-card-body">
                <div className="field">
                  <label className=" is-large">Mail</label>
                  <div className="control">
                    <input className="input is-large" type="mail" placeholder={formatMessage({ id: "register.field.mail" })} value={this.state.mailF} onChange={this.mailF} />
                  </div>
                </div>
              </section>
              <footer className="modal-card-foot ">
                <div className="padding">
                  <button className="button is-sucess" onClick={() => { this.setState({ forget: "stateReset" }) }}>Confirm</button>
                  <button className="button" onClick={() => { this.setState({ forget: null }) }}>Cancel</button>
                </div>
              </footer>
            </div>
          </div>
        }
        {this.state.forget != "stateReset" ? null
          :
          <div className={'modal is-active '}>
            <div className="modal-background" onClick={() => { this.setState({ forget: null }) }}></div>
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">Forget password</p>
                <button className="delete" aria-label="close" onClick={() => { this.setState({ forget: null }) }}></button>
              </header>
              <section className="modal-card-body">
                <div className="field">
                  <label className=" is-large">Password</label>
                  <div className="control">
                    <input className="input is-large" type="password" placeholder={formatMessage({ id: "login.field.password" })} value={this.state.passwordF} onChange={this.passwordF} />
                  </div>
                </div>
                <div className="field">
                  <label className=" is-large">Password Confirmation</label>
                  <div className="control">
                    <input className="input is-large" type="password" placeholder={formatMessage({ id: "login.field.password" })} value={this.state.passwordCF} onChange={this.passwordCF} />
                  </div>
                </div>
              </section>
              <footer className="modal-card-foot ">
                <div className="padding">
                  <button className="button is-sucess" onClick={() => { this.setState({ forget: null }) }}>Confirm</button>
                  <button className="button" onClick={() => { this.setState({ forget: null }) }}>Cancel</button>
                </div>
              </footer>
            </div>
          </div>
        }
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