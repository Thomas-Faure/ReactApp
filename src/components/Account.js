import React, { Component } from "react";
import { connect } from "react-redux";
import { login, setUser, unsetPopUp, setPopUp } from '../actions';
import sha256 from 'sha256';
import { FormattedMessage, injectIntl } from 'react-intl';
/*
* Composant affichant une page de modification de son compte utilisateur
*
*/
class Account extends Component {
  constructor(props) {
    super(props)
    this.state = {
      valueUsername: "",
      valueFirstname: "",
      valueLastname: "",
      valueMail: "",
      valueSexe: "",
      valueBirthday: "",
      valuePassword: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangeFirstname = this.handleChangeFirstname.bind(this)
    this.handleChangeUsername = this.handleChangeUsername.bind(this)
    this.handleChangeLastname = this.handleChangeLastname.bind(this)
    this.handleChangeSexe = this.handleChangeSexe.bind(this)
    this.handleChangeMail = this.handleChangeMail.bind(this)
    this.handleChangeBirthday = this.handleChangeBirthday.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
    this.getData = this.getData.bind(this)
    this.sendData = this.sendData.bind(this)
  }

  componentDidMount() {
    this.getData();
  }

  handleChangeUsername(event) {
    this.setState({ valueUsername: event.target.value })
  }
  handleChangeFirstname(event) {
    this.setState({ valueFirstname: event.target.value })
  }
  handleChangeLastname(event) {
    this.setState({ valueLastname: event.target.value })
  }
  handleChangeSexe(event) {
    this.setState({ valueSexe: event.target.value })
  }


  handleChangeMail(event) {
    this.setState({ valueMail: event.target.value })
  }
  handleChangeBirthday(event) {
    this.setState({ valueBirthday: event.target.value })
  }
  handleChangePassword(event) {
    this.setState({ valuePassword: event.target.value })
  }

  handleSubmit(event) {
    this.sendData()
    event.preventDefault();
  }

  getData() {
    var user = this.props.user
    this.setState({
      valueUsername: user.username,
      valueFirstname: user.firstname,
      valueMail: user.mail,
      valueLastname: user.lastname,
      valueSexe: user.sexe,
      valueBirthday: user.birthday.slice(0, 10)
    })
  }

  async sendData() {
    console.log(this.state.birthday)
    const token = localStorage.token;
    fetch("https://thomasfaure.fr/user/edit", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        username: this.state.valueUsername,
        firstname: this.state.valueFirstname,
        lastname: this.state.valueLastname,
        birthday: this.state.valueBirthday,
        mail: this.state.valueMail,
        sexe: this.state.valueSexe,
        admin: this.props.user.admin,
        password: (this.state.valuePassword.length > 1 ? sha256(this.state.valuePassword) : "")
      })
    })
      .then(res => res.json())
      .then((data) => {
        if (data.affectedRows === 1) {
          let asyncUpdate = async () => {
            if (token !== undefined) {
              var user_id = this.props.user.user_id

              var info = await fetch("https://thomasfaure.fr/user/" + user_id, {
                method: "GET",
                headers: {
                  'Authorization': 'Bearer ' + token
                }
              })
              info = await info.json()
              this.props.setUser(info[0])
              this.props.unsetPopUp()

            } else {
              this.setState({ errorLogin: true })
            }
          }
          asyncUpdate()

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
              <h3 className="title has-text-black"><FormattedMessage id="account.label" /></h3>
              <hr className="login-hr" />
              <p className="subtitle has-text-black"><FormattedMessage id="account.sentence" /></p>
              <div className="box">
                <form onSubmit={this.handleSubmit}>
                  <div className="field">
                    <label className="label">Username</label>
                    <div className="control">
                      <input className="input" type="text" placeholder="Username" value={this.state.valueUsername} onChange={this.handleChangeUsername} />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Firstname</label>
                    <div className="control">
                      <input className="input" type="text" placeholder="Firstname" value={this.state.valueFirstname} onChange={this.handleChangeFirstname} />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">LastName</label>
                    <div className="control">
                      <input className="input" type="text" placeholder="Lastname" value={this.state.valueLastname} onChange={this.handleChangeLastname} />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Password <strong style={{ color: "red" }}>empty to avoid modification</strong></label>
                    <div className="control">
                      <input className="input" type="password" placeholder="Password" value={this.state.valuePassword} onChange={this.handleChangePassword} />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Mail</label>
                    <div className="control">
                      <input className="input" type="text" placeholder="Mail" value={this.state.valueMail} onChange={this.handleChangeMail} />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Birthday</label>
                    <div className="control">

                      <input className="input" type="date" placeholder="Birthday" value={this.state.valueBirthday} onChange={this.handleChangeBirthday} />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Sexe</label>
                    <div className="control">
                      <div className="select" style={{ width: "100%" }}>
                        <select value={this.state.valueSexe} onChange={this.handleChangeSexe}>
                          <option value="M">Man</option>
                          <option value="F">Woman</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="control">
                    <input className="button is-link" type="submit" value="submit"></input>

                  </div>


                </form>
              </div>
            </div>
          </div>
        </div>

      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = () => {
  return {
    setUser,
    unsetPopUp,
    setPopUp

  }
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps())(Account));