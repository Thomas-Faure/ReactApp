import React, { Component } from "react";


class BackOfficeEditUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id:this.props.match.params.id,
      valueUsername: "",
      valueFirstname: "",
      valueLastname: "",
      valueMail: "",
      valueSexe: "",
      valueAdmin: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangeFirstname=this.handleChangeFirstname.bind(this)
    this.handleChangeUsername= this.handleChangeUsername.bind(this)
    this.handleChangeLastname= this.handleChangeLastname.bind(this)
    this.handleChangeSexe= this.handleChangeSexe.bind(this)
    this.handleChangeAdmin= this.handleChangeAdmin.bind(this)
    this.handleChangeMail= this.handleChangeMail.bind(this)
    this.sendData = this.sendData.bind(this)
    this.getData = this.getData.bind(this)
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
  handleChangeAdmin(event) {
    this.setState({ valueAdmin: event.target.value })
  }
  handleChangeMail(event) {
    this.setState({ valueMail: event.target.value })
  }

  handleSubmit(event) {
    this.sendData()
    event.preventDefault();
  }

  getData(){
    const token = localStorage.token;
    fetch("http://51.255.175.118:2000/user/"+this.state.id, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
       
            'Authorization': 'Bearer ' + token
          
        }
      })
        .then(res => res.json())
        .then((data) => {
         
            if(data.length===1){
                this.setState({
                    valueUsername:data[0].username,
                    valueFirstname:data[0].firstname,
                valueAdmin:data[0].admin,
            valueMail:data[0].mail,
            valueLastname:data[0].lastname,
            valueSexe:data[0].sexe})
            }
          
        })

  }

  sendData() {
    
  
    fetch("http://51.255.175.118:2000/post/"+this.state.id+"/edit", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ category: 1, username: this.state.valueUsername, firstname: this.state.valueFirstname})
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
            <label class="label">Mail</label>
            <div class="control">
              <input class="input" type="text" placeholder="Mail" value={this.state.valueMail} onChange={this.handleChangeMail} />
            </div>
          </div>
          <div class="field">
            <label class="label">Admin</label>
            <div class="control">
              <input class="input" type="text" placeholder="Admin" value={this.state.valueAdmin} onChange={this.handleChangeAdmin} />
            </div>
          </div>
          <div class="field">
            <label class="label">Sexe</label>
            <div class="control">
              <input class="input" type="text" placeholder="Sexe" value={this.state.valueSexe} onChange={this.handleChangeSexe} />
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





export default BackOfficeEditUser;