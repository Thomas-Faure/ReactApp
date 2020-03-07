import React, { Component } from "react";


class BackOfficeCreateUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id:this.props.match.params.id,
      valueUsername: "",
      valueFirstname: "",
      valueLastname: "",
      valueMail: "",
      valueSexe: "",
      valueAdmin: 0,
      valueBirthday: "",
      valuePassword: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangeFirstname=this.handleChangeFirstname.bind(this)
    this.handleChangeUsername= this.handleChangeUsername.bind(this)
    this.handleChangeLastname= this.handleChangeLastname.bind(this)
    this.handleChangeSexe= this.handleChangeSexe.bind(this)
    this.handleChangeAdmin= this.handleChangeAdmin.bind(this)
    this.handleChangeMail= this.handleChangeMail.bind(this)
    this.handleChangeBirthday= this.handleChangeBirthday.bind(this)
    this.handleChangePassword= this.handleChangePassword.bind(this)
    this.sendData = this.sendData.bind(this)
 
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
  handleChangeAdmin(event) {
    this.setState({ valueAdmin: event.target.value })
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

  

  sendData() {
    
  
    fetch("http://51.255.175.118:2000/user/create", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: this.state.valueUsername,
         firstname: this.state.valueFirstname,
         lastname: this.state.valueLastname,
         birthday:this.state.valueBirthday,
         mail: this.state.valueMail,
         sexe: this.state.valueSexe,
         admin:this.state.valueAdmin,
         password: this.state.valuePassword})
    })
      .then(res => res.json())
      .then((data) => {
          if(data.affectedRows===1){
            window.location = "/#/backoffice/users"; 
          }
        
      })
   
  }

  render() {
    return (
      <div>


        <form onSubmit={this.handleSubmit}>
          <div class="field">
            <label class="label">Username</label>
            <div class="control">
              <input class="input" type="text" placeholder="Username" value={this.state.valueUsername} onChange={this.handleChangeUsername} />
            </div>
          </div>
          <div class="field">
            <label class="label">Firstname</label>
            <div class="control">
              <input class="input" type="text" placeholder="Firstname" value={this.state.valueFirstname} onChange={this.handleChangeFirstname} />
            </div>
          </div>
          <div class="field">
            <label class="label">LastName</label>
            <div class="control">
              <input class="input" type="text" placeholder="Lastname" value={this.state.valueLastname} onChange={this.handleChangeLastname} />
            </div>
          </div>
          <div class="field">
            <label class="label">Password <strong style={{color: "red"}}>empty to avoid modification</strong></label>
            <div class="control">
              <input class="input" type="password" placeholder="Password" value={this.state.valuePassword} onChange={this.handleChangePassword} />
            </div>
          </div>
          <div class="field">
            <label class="label">Mail</label>
            <div class="control">
              <input class="input" type="text" placeholder="Mail" value={this.state.valueMail} onChange={this.handleChangeMail} />
            </div>
          </div>
          <div class="field">
            <label class="label">Birthday</label>
            <div class="control">
        
              <input class="input" type="date" placeholder="Birthday" value={this.state.valueBirthday} onChange={this.handleChangeBirthday} />
            </div>
          </div>
          <div class="field">
            <label class="label">Admin</label>
            <div class="control">
              <div className="select">
              <select value={this.state.valueAdmin} onChange={this.handleChangeAdmin}>
            <option value="1">Oui</option>
            <option value="0">Non</option>

          </select>
          </div>
            </div>
          </div>
          <div class="field">
            <label class="label">Sexe</label>
            <div class="control">
              <div className="select">
              <select value={this.state.valueSexe} onChange={this.handleChangeSexe}>
            <option value="M">Man</option>
            <option value="F">Woman</option>

          </select>
          </div>
            </div>
          </div>

          <div class="control">
            <input class="button is-link" type="submit" value="submit"></input>

          </div>


        </form>
        <p style={{marginTop:"10px"}}><button class="button is-danger" onClick={event =>  window.location.href='/#/backoffice/users'}>Back</button></p>


      </div>
    );
  }
}





export default BackOfficeCreateUser;