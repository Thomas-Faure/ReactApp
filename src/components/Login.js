import React, { Component } from "react";
import { connect } from "react-redux";
import {login} from '../actions';
class Login extends Component {
  constructor(props){
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

  componentDidMount(){
    if(this.props.isLogged){
        window.location.href = '/#/';
    } 
  }

  handleChangeUsername(event){
    this.setState({valueU: event.target.value})
  }
  handleChangePassword(event){
    this.setState({valueP: event.target.value})
  }

  handleSubmit(even){
      this.login()
  }

  login(){
      fetch("http://localhost:2000/user/login",{
          method:'POST',
          headers:{
              'Accept':'application/json',
              'Content-Type':'application/json'
          },
          body: JSON.stringify({username: this.state.valueU, password: this.state.valueP})
      })
      .then(res => res.json())
      .then((data)=>{
          if(data.token !== undefined){
              localStorage.setItem("token",data.token)
              this.props.login()
              this.setState({errorLogin : false})
              window.location.href = '/#/';
              
          }else{
              this.setState({errorLogin : true})
          }
      })

  }

  render() {
    return (
      <div>
          <div>{this.state.errorLogin ? <h1>Il y a un erreur dans le login</h1>
          : null}
          </div>
        
          <form onSubmit={this.handleSubmit}>
          <div class="field">
          <label class="label">Name</label>
          <div class="control">
            <input class="input" type="text" placeholder="Username" value={this.state.valueU} onChange={this.handleChangeUsername}/>
          </div>
        </div>
        <div class="field">
  <label class="label">Name</label>
  <div class="control">
    <input class="input" type="password" placeholder="Password" value={this.state.valueP} onChange={this.handleChangePassword}/>
  </div>
</div>
              
<div class="control">
  <input class="button is-link" type="submit" value="submit"></input>
 
  </div>
       

          </form>
         
      </div>
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
    login

  }
}


 
export default connect(mapStateToProps,mapDispatchToProps())(Login);