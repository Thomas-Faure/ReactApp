import React, { Component } from "react";
import { connect } from "react-redux";
import { login, setUser, unsetPopUp, setPopUp } from '../actions';
import sha256 from 'sha256';
import { FormattedMessage, injectIntl } from 'react-intl';
/*
* Composant affichant un formulaire d'inscription pour un utilisateur
*
*/
class Register extends Component {

  constructor(props) {
    super(props)
    this.state = {
      valueP: "",
      valueU: "",
      valueD: null,
      valueF: "",
      valueS: "",
      valueL: "",
      valueM: "",
      valuePC: "",
      errorLogin: false,
      backgroundColor: "#b5b5b5",
      backgroundColorPC: "#b5b5b5",
      password: false,
      error : false

    }
    this.register = this.register.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
    this.handleChangePasswordC = this.handleChangePasswordC.bind(this)
    this.handleChangeUsername = this.handleChangeUsername.bind(this)
    this.handleChangeFirstname = this.handleChangeFirstname.bind(this)
    this.handleChangeLastname = this.handleChangeLastname.bind(this)
    this.handleChangeDate = this.handleChangeDate.bind(this)
    this.handleChangeMail = this.handleChangeMail.bind(this)
    this.handleChangeSexe = this.handleChangeSexe.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

  }

  componentDidMount() {

  }

  handleChangeUsername(event) {
    this.setState({ valueU: event.target.value })
  }
/*
* Mis à jour du "state" pour le mot de passe avec une sécurisation
*
*/
  handleChangePassword(event) {
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*/])(?=.{8,})");
    const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
    if (strongRegex.test(event.target.value)) {
      this.setState({ backgroundColor: "#0F9D58", password: true });
    } else if (mediumRegex.test(event.target.value)) {
      this.setState({ backgroundColor: "#F4B400", password: false });
    } else {
      this.setState({ backgroundColor: "#DB4437", password: false });
    }
    this.setState({ valueP: event.target.value })
    if ((event.target.value == this.state.valuePC) && (this.state.valuePC != "")) {
      this.setState({
        backgroundColorPC: "#0F9D58"
      })
    }
    else {
      this.setState({
        backgroundColorPC: "#DB4437"
      })
    }
  }
  handleChangePasswordC(event) {
    this.setState({ valuePC: event.target.value })
    if ((this.state.valueP == event.target.value) && (event.target.value != "")) {
      this.setState({
        backgroundColorPC: "#0F9D58"
      })
    }
    else {
      this.setState({
        backgroundColorPC: "#DB4437"
      })
    }
  }
  handleChangeFirstname(event) {
    this.setState({ valueF: event.target.value })
  }
  handleChangeLastname(event) {
    this.setState({ valueL: event.target.value })
  }
  handleChangeDate(event) {
    this.setState({ valueD: event.target.value })
  }
  handleChangeMail(event) {
    this.setState({ valueM: event.target.value })
  }
  handleChangeSexe(event) {
    this.setState({ valueS: event.target.value })
  }
/*
* Soumission du formulaire
*
*/
  handleSubmit(event) {

    this.register()
    event.preventDefault();
  }
/*
* Accès vue login
*
*/
  login() {
    this.props.unsetPopUp()
    this.props.setPopUp("login", null)
  }
/*
* Enregistrement d'un nouveau utilisateur avec de la sécurité
*
*/
  register() {
    if ((this.state.password == false)) {
      this.setState({error : "password"})
      return false
    }
    if((this.state.valueP != this.state.valuePC)){
      this.setState({error : "passwordC"})
      return false
    }
    if((this.state.valueU).trim() == ""){
      this.setState({error : "username"})
      return false
    }
    if((this.state.valueF).trim() == ""){
      this.setState({error : "firstname"})
      return false
    }
    if((this.state.valueL).trim() == ""){
      this.setState({error : "lastname"})
      return false
    }
    if((this.state.valueM).trim() == ""){
      this.setState({error : "mail"})
      return false
    }
    
    fetch("https://thomasfaure.fr/user/create", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: this.state.valueU, firstname: this.state.valueF, lastname: this.state.valueL, birthday: this.state.valueD, mail: this.state.valueM, sexe: this.state.valueS, password: sha256(this.state.valueP) })
    })
      .then(res => res.json())
      .then((data) => {
        this.props.unsetPopUp()
      })

  }
/*
* Vue d'inscription
*
*/
  render() {
    const { formatMessage } = this.props.intl;

    return (

      <section className=" is-fullheight" style={{ backgroundColor: "#BBDCF2", borderRadius: "5px" }}>
        <div className="">
          <div className="container has-text-centered">
            <div className="column">
              <h3 className="title has-text-black"><FormattedMessage id="register.label" /></h3>
              <hr className="register-hr" />
              <p className="subtitle has-text-black"><FormattedMessage id="register.sentence" /></p>
              <div className="box">
                <div>
                </div>

                <form onSubmit={this.handleSubmit}>
                {this.state.error == "firstname" ? <h3 className="error"><FormattedMessage id="error.firstname" /></h3> : null}
                  <div className="field">
                    <label className=" is-large"><FormattedMessage id="register.field.firstname" /></label>
                    <div className="control">
                      <input className="input" type="text" placeholder="Firstname" value={this.state.valueF} onChange={this.handleChangeFirstname} required />
                    </div>
                  </div>
                  <div className="field">
                {this.state.error == "lastname" ? <h3 className="error"><FormattedMessage id="error.lastname" /></h3> : null}
                    <label className=" is-large"><FormattedMessage id="register.field.lastname" /></label>
                    <div className="control">
                      <input className="input" type="text" placeholder="Lastname" value={this.state.valueL} onChange={this.handleChangeLastname} required />
                    </div>
                  </div>
                  <div className="field">
                {this.state.error == "mail" ? <h3 className="error"><FormattedMessage id="error.mail" /></h3> : null}
                    <label className=" is-large"><FormattedMessage id="register.field.mail" /></label>
                    <div className="control">
                      <input className="input" type="email" placeholder="Mail" value={this.state.valueM} onChange={this.handleChangeMail} required />
                    </div>
                  </div>
                  <div className="field">
                    <label className=" is-large"><FormattedMessage id="register.field.birthday" /></label>
                    <div className="control">
                      <input className="input" type="date" value={this.state.valueD} onChange={this.handleChangeDate} required />
                    </div>
                  </div>
                  <div className="field">
                    <label><FormattedMessage id="register.field.sexe" /></label>
                    <div className="control">
                      <label className="radio"><input type="radio" name="sexe" value="M" onChange={this.handleChangeSexe} />Male</label>
                      <label className="radio">
                        <input type="radio" name="sexe" value="F" checked onChange={this.handleChangeSexe} />Female</label>
                    </div>
                  </div>
                  <div className="field">
                  {this.state.error == "username" ? <h3 className="error"><FormattedMessage id="error.username" /></h3> : null}
                    <label className=" is-large"><FormattedMessage id="register.field.username" /></label>
                    <div className="control">
                      <input className="input" type="text" placeholder="Username" value={this.state.valueU} onChange={this.handleChangeUsername} required />
                    </div>
                  </div>
                  <div className="field">
                  {this.state.error == "password" ? <h3 className="error"><FormattedMessage id="error.password" /></h3> : null}
                    <label className=" is-large"><FormattedMessage id="register.field.password" />&nbsp; <div className="tooltip">?
                            <span className="tooltiptext"><li>8 chars</li><li>1 Majuscle</li><li>1 Minuscule</li><li>1 chiffre</li><li>!@#$%&^*/ </li></span>
                      </div>
                    </label>
                    <div className="control">
                      <input className="input" style={{ borderColor: this.state.backgroundColor, borderWidth: '3px' }} type="password" placeholder="Password" value={this.state.valueP} onChange={this.handleChangePassword} required />
                    </div>
                  </div>
                  <div className="field">
                  {this.state.error == "passwordC" ? <h3 className="error"><FormattedMessage id="error.passwordC" /></h3> : null}
                    <label className=" is-large"><FormattedMessage id="register.field.passwordConfirmation" /></label>
                    <div className="control">
                      <input className="input" type="password" placeholder="Password confirmation" style={{ borderColor: this.state.backgroundColorPC, borderWidth: '3px' }} value={this.state.valuePC} onChange={this.handleChangePasswordC} required />
                    </div>
                  </div>
                  <input className="button is-link" type="submit" value={formatMessage({ id: "register.submit" })}></input>
                </form>
              </div>
              <p className="has-text-grey"><FormattedMessage id="register.bottom.alreadyRegister" />
                <a onClick={() => { this.login() }}>Login</a> &nbsp;·&nbsp;
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
    registerPopUp: state.registerPopUp
  }
}

const mapDispatchToProps = () => {
  return {
    unsetPopUp,
    setPopUp

  }
}


export default injectIntl(connect(mapStateToProps, mapDispatchToProps())(Register));