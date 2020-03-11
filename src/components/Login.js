import React, { Component } from "react";
import { connect } from "react-redux";
import { login, setUser } from '../actions';
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      valueP: "",
      valueU: "",
      errorLogin: false
    }
    this.login = this.login.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
    this.handleChangeUsername = this.handleChangeUsername.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    if (this.props.isLogged) {
      window.location.href = '/#/';
    }
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

  login() {
    var user_id = 0

    fetch("http://51.255.175.118:2000/user/login", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: this.state.valueU, password: this.state.valueP })
    })
      .then(res => res.json())
      .then((data) => {
        if (data.token !== undefined) {
          localStorage.setItem("token", data.token)
          this.props.login()
          user_id = data.id
          this.setState({ errorLogin: false })

          fetch("http://51.255.175.118:2000/user/" + user_id, {
            method: "GET",
            headers: {
              'Authorization': 'Bearer ' + data.token
            }
          })
            .then(res => res.json())
            .then((data) => {
              this.props.setUser(data[0])
              window.location.href = '/#/'

            })
        } else {
          this.setState({ errorLogin: true })
        }
      })

  }

  render() {
    return (

      <section class="hero is-success is-fullheight">
        <div class="hero-body">
          <div class="container has-text-centered">
            <div class="column is-4 is-offset-4">
              <h3 class="title has-text-black">Login</h3>
              <hr class="login-hr" />
              <p class="subtitle has-text-black">Please login to proceed.</p>
              <div class="box">
                <div>{this.state.errorLogin ? <h1>Il y a un erreur dans le login</h1>
          : null}
        </div>

                <form>
                  <div class="field" onSubmit={this.handleSubmit}>
                    <div class="control">
                      <input class="input is-large" type="text" placeholder="Usernmae" autofocus="" value={this.state.valueU} onChange={this.handleChangeUsername}/>
                    </div>
                  </div>
                  <div class="field">
                    <div class="control">
                      <input class="input is-large" type="password" placeholder="Password" value={this.state.valueP} onChange={this.handleChangePassword} />
                    </div>
                  </div>
                  <div class="field">
                    <label class="checkbox">
                      <input type="checkbox" />
                        Remember me
                				</label>
                  </div>
                  <input class="button is-link" type="submit" value="submit"></input>
                </form>
              </div>
              <p class="has-text-grey">
                <a href="../">Sign Up</a> &nbsp;·&nbsp;
                        <a href="../">Forgot Password</a> &nbsp;·&nbsp;
                        <a href="../">Need Help?</a>
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
    user: state.userInfo

  }
}

const mapDispatchToProps = () => {
  return {
    login,
    setUser

  }
}



export default connect(mapStateToProps, mapDispatchToProps())(Login);