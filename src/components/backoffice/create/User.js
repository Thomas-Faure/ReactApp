import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import fetchUsers from '../../../fetch/fetchUsers'
import sha256 from 'sha256';
import {unsetPopUp} from '../../../actions'
import {FormattedMessage,injectIntl} from 'react-intl'
/*
* Composant permettant d'afficher un formulaire pour creer un nouvel utilisateur
*
*/
class BackOfficeCreateUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
    
  
    fetch("https://thomasfaure.fr/user/create", {
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
         password: sha256(this.state.valuePassword)})
    })
      .then(res => res.json())
      .then((data) => {
          if(data.result===true){
            let asyncUpdate = async()=>{
              await this.props.fetchUsers()
              this.props.unsetPopUp()
             }
             asyncUpdate()
           
          }
        
      })
   
  }

  render() {
    const { formatMessage } = this.props.intl;
    return (

      <div className={'modal is-active'}>
  <div className="modal-background" onClick={()=>{this.props.unsetPopUp()}}></div>
  <div className="modal-card">
    <header className="modal-card-head">
      <p className="modal-card-title">Create User </p>
      <button className="delete" aria-label="close" onClick={()=>{this.props.unsetPopUp()}}></button>
    </header>
    <section className="modal-card-body">
    <div className="columns">
      <div className="column is-one-quarter"></div>
      <div className="column is-half">
      <div>


        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="label"><FormattedMessage id="backoffice.menu1.users.create.username"/></label>
            <div className="control">
              <input className="input" type="text" placeholder="Username" value={this.state.valueUsername} onChange={this.handleChangeUsername} />
            </div>
          </div>
          <div className="field">
            <label className="label"><FormattedMessage id="backoffice.menu1.users.create.firstname"/></label>
            <div className="control">
              <input className="input" type="text" placeholder="Firstname" value={this.state.valueFirstname} onChange={this.handleChangeFirstname} />
            </div>
          </div>
          <div className="field">
            <label className="label"><FormattedMessage id="backoffice.menu1.users.create.lastname"/></label>
            <div className="control">
              <input className="input" type="text" placeholder="Lastname" value={this.state.valueLastname} onChange={this.handleChangeLastname} />
            </div>
          </div>
          <div className="field">
            <label className="label"><FormattedMessage id="backoffice.menu1.users.create.password"/></label>
            <div className="control">
              <input className="input" type="password" placeholder="Password" value={this.state.valuePassword} onChange={this.handleChangePassword} />
            </div>
          </div>
          <div className="field">
            <label className="label"><FormattedMessage id="backoffice.menu1.users.create.mail"/></label>
            <div className="control">
              <input className="input" type="text" placeholder="Mail" value={this.state.valueMail} onChange={this.handleChangeMail} />
            </div>
          </div>
          <div className="field">
            <label className="label"><FormattedMessage id="backoffice.menu1.users.create.birthday"/></label>
            <div className="control">
        
              <input className="input" type="date" placeholder="Birthday" value={this.state.valueBirthday} onChange={this.handleChangeBirthday} />
            </div>
          </div>
      
          <div className="field">
            <label className="label"><FormattedMessage id="backoffice.menu1.users.create.sexe"/></label>
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
            <input className="button is-link" type="submit" value={formatMessage({id: "backoffice.general.submit"})}></input>

          </div>


        </form>
        <p style={{marginTop:"10px"}}><button className="button is-danger" onClick={()=>{this.props.unsetPopUp()}}>{formatMessage({id: "backoffice.general.back"})}</button></p>


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

  }
}

const mapDispatchToProps = dispatch => bindActionCreators( {
  fetchUsers: fetchUsers,
  unsetPopUp
  
},dispatch)
 
export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(BackOfficeCreateUser));


