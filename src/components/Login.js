import React, { Component } from "react";
import { connect } from "react-redux";
import fetchPosts from '../fetch/fetchPosts'
import { login, setUser, unsetPopUp, setPopUp } from '../actions';
import sha256 from 'sha256';
import { FormattedMessage, injectIntl } from 'react-intl';
/*
* Composant affichant un formulaire permettant la connexion, permettant d'acceder à la page "mot de passe oublié" ou bien pour acceder à la page "inscription"
*
*/
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      forgetPasswordMessage : "",
      valueP: "",
      valueU: "",
      errorLogin: false,
      forget: "",
      mailF: "",
      passwordCF: "",
      passwordF: "",

    }
    this.forgetPassword = this.forgetPassword.bind(this)
    this.login = this.login.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
    this.handleChangeUsername = this.handleChangeUsername.bind(this)
    this.handleSubmitForgetPassword = this.handleSubmitForgetPassword.bind(this)
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

  handleSubmitForgetPassword(event) {
    this.forgetPassword()
    event.preventDefault();
  }

  handleSubmit(event) {
    if((this.state.valueP == "" )||(this.state.valueU == "")){
      this.setState({ errorLogin: true })
      return false
    }
    this.login()
    event.preventDefault();
  }

  async forgetPassword(){
    var res = await fetch("https://thomasfaure.fr/user/forgotPassword/create", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ mail: this.state.mailF })
    })
    res = await res.json()
   
    if (res == false) {
      this.setState({forgetPasswordMessage : "email non existant"})
    }else{
      this.setState({forgetPasswordMessage : "email envoyé ! regardez vos mail !"})
    }


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
        console.log(info[0])
        
       this.props.unsetPopUp()
        localStorage.setItem("token", res.token)
      this.props.login()
      if(info[0].admin==1){
        console.log("oui !")
        this.props.fetchPosts();
      }

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
              <h3 className="title has-text-black"><FormattedMessage id="login.label" /></h3>
              <hr className="login-hr" />
              <p className="subtitle has-text-black"><FormattedMessage id="login.sentence" /></p>
              <div className="box">
                <div>{this.state.errorLogin ? <h1 className="error">Il y a un erreur dans le login</h1>
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
              <form onSubmit={this.handleSubmitForgetPassword}>
              <section className="modal-card-body">
                {this.state.forgetPasswordMessage.length>0 ?
                <p>{this.state.forgetPasswordMessage}</p> 
                : null}
                <div className="field">
                  <label className=" is-large">Mail</label>
                  <div className="control">
                    <input className="input is-large" type="mail" placeholder={formatMessage({ id: "register.field.mail" })} value={this.state.mailF} onChange={this.mailF} />
                  </div>
                </div>
             
              </section>
              <footer className="modal-card-foot ">
                <div className="padding">
             
                  <input className="button is-sucess" type="submit" value="Confirm"></input>
                </div>
              </footer>
              </form>
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
    setPopUp,
    fetchPosts: fetchPosts,

  }
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps())(Login));