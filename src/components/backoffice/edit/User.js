import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import fetchUsers from '../../../fetch/fetchUsers'
import sha256 from 'sha256';
import { queryAllByTestId } from "@testing-library/react";
import {unsetPopUp} from '../../../actions'
class BackOfficeEditUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id:this.props.popUp.id,
      valueUsername: "",
      valueFirstname: "",
      valueLastname: "",
      valueMail: "",
      valueSexe: "",
      valueAdmin: "",
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

  getData(){
    let usersList = this.props.userList.allIds.map(id => this.props.userList.byId[id])

    var data = usersList.find(element => element.user_id == this.state.id);
    this.setState({
        valueUsername:data.username,
        valueFirstname:data.firstname,
    valueAdmin:data.admin,
valueMail:data.mail,
valueLastname:data.lastname,
valueSexe:data.sexe,
valueBirthday:data.birthday.slice(0,10)})
  }

  sendData() {
    
    const token = localStorage.token;
    fetch("http://51.255.175.118:80/user/"+this.state.id+"/edit", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({username: this.state.valueUsername,
         firstname: this.state.valueFirstname,
         lastname: this.state.valueLastname,
         birthday:this.state.valueBirthday,
         mail: this.state.valueMail,
         sexe: this.state.valueSexe,
         admin:this.state.valueAdmin,
         password: sha256(this.state.valuePassword)})
    })
      .then(res => res.json())
      .then((data) => {
          if(data.affectedRows===1){
            let asyncUpdate = async()=>{
              await this.props.fetchUsers()
              this.props.unsetPopUp()
             }
             asyncUpdate()
  
          }
        
      })
   
  }

  render() {
    return (

      <div className={'modal is-active'}>
  <div className="modal-background" onClick={()=>{this.props.unsetPopUp()}}></div>
  <div className="modal-card">
    <header className="modal-card-head">
      <p className="modal-card-title">Edit User</p>
      <button className="delete" aria-label="close" onClick={()=>{this.props.unsetPopUp()}}></button>
    </header>
    <section className="modal-card-body">
    <div className="columns">
      <div className="column is-one-quarter"></div>
      <div className="column is-half">
      <div>


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
            <label className="label">Password <strong style={{color: "red"}}>empty to avoid modification</strong></label>
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
            <label className="label">Admin</label>
            <div className="control">
              <div className="select"  style={{width:"100%"}}>
              <select value={this.state.valueAdmin} onChange={this.handleChangeAdmin}>
            <option value="1">Oui</option>
            <option value="0">Non</option>

          </select>
          </div>
            </div>
          </div>
          <div className="field">
            <label className="label">Sexe</label>
            <div className="control">
              <div className="select"  style={{width:"100%"}}>
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
        <p style={{marginTop:"10px"}}><button className="button is-danger" onClick={()=>{this.props.unsetPopUp()}}>Back</button></p>


      </div>
      </div>
      <div className="column is-one-quarter"></div>
      </div>
    </section>

  </div>
</div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    userList: state.userList,
    popUp: state.popUp
  }
}

const mapDispatchToProps = dispatch => bindActionCreators( {
  fetchUsers: fetchUsers,
  unsetPopUp
  
},dispatch)
 
export default connect(mapStateToProps, mapDispatchToProps)(BackOfficeEditUser);

