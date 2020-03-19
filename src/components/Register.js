import React, { Component } from "react";
import { connect } from "react-redux";
import { login, setUser, unsetPopUp } from '../actions';
import sha256 from 'sha256';
import {FormattedMessage ,injectIntl} from 'react-intl';

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
  handleChangePassword(event) {
    this.setState({ valueP: event.target.value })
  }
  handleChangePasswordC(event) {
    this.setState({ valuePC: event.target.value })
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

  handleSubmit(event) {

    this.register()
    event.preventDefault();
  }

  /*login(){
    this.props.unsetPopUp()
    this.props.setPopUp("login", null)
  }*/

  register() {
    if (this.state.valueP != this.state.valuePC) {
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
  render() {
    const { formatMessage } = this.props.intl;

    return (

      <section className=" is-fullheight" style={{ backgroundColor: "#BBDCF2", borderRadius: "5px" }}>
        <div className="">
          <div className="container has-text-centered">
            <div className="column">
              <h3 className="title has-text-black"><FormattedMessage id="register.label"/></h3>
              <hr className="register-hr" />
              <p className="subtitle has-text-black"><FormattedMessage id="register.sentence"/></p>
              <div className="box">
                <div>
                </div>

                <form onSubmit={this.handleSubmit}>
                  <div className="field">
                  <label className=" is-large"><FormattedMessage id="register.field.firstname"/></label>
                    <div className="control">
                      <input className="input" type="text" placeholder="Firstname" value={this.state.valueF} onChange={this.handleChangeFirstname} required />
                    </div>
                  </div>
                  <div className="field">
                  <label className=" is-large"><FormattedMessage id="register.field.lastname"/></label>
                    <div className="control">
                      <input className="input" type="text" placeholder="Lastname" value={this.state.valueL} onChange={this.handleChangeLastname} required />
                    </div>
                  </div>
                  <div className="field">
                  <label className=" is-large"><FormattedMessage id="register.field.mail"/></label>
                    <div className="control">
                      <input className="input" type="email" placeholder="Mail" value={this.state.valueM} onChange={this.handleChangeMail} required />
                    </div>
                  </div>
                  <div className="field">
                  <label className=" is-large"><FormattedMessage id="register.field.birthday"/></label>
                    <div className="control">
                      <input className="input" type="date" value={this.state.valueD} onChange={this.handleChangeDate} required />
                    </div>
                  </div>
                  <div className="field">
                  <label><FormattedMessage id="register.field.sexe"/></label>
                    <div className="control">
                      <label className="radio"><input type="radio" name="sexe" value="M" onChange={this.handleChangeSexe} />Male</label>
                      <label className="radio">
                        <input type="radio" name="sexe" value="F" checked onChange={this.handleChangeSexe} />Female</label>
                    </div>
                  </div>
                  <div className="field">
                  <label className=" is-large"><FormattedMessage id="register.field.username"/></label>
                    <div className="control">
                      <input className="input" type="text" placeholder="Username" value={this.state.valueU} onChange={this.handleChangeUsername} required />
                    </div>
                  </div>
                  <div className="field">
                  <label className=" is-large"><FormattedMessage id="register.field.password"/></label>
                    <div className="control">
                      <input className="input" type="password" placeholder="Password" value={this.state.valueP} onChange={this.handleChangePassword} required />
                    </div>
                  </div>
                  <div className="field">
                  <label className=" is-large"><FormattedMessage id="register.field.passwordConfirmation"/></label>
                    <div className="control">
                      <input className="input" type="password" placeholder="Password confirmation" value={this.state.valuePC} onChange={this.handleChangePasswordC} required />
                    </div>
                  </div>
                  <input className="button is-link" type="submit" value={formatMessage({id: "register.submit"})}></input>
                </form>
              </div>
              <p className="has-text-grey"><FormattedMessage id="register.bottom.alreadyRegister"/>
                <a onClick={()=>{this.register()}}>Login</a> &nbsp;·&nbsp;
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

  }
}


export default injectIntl(connect(mapStateToProps, mapDispatchToProps())(Register));