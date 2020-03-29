import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import {FormattedMessage} from 'react-intl';
import BackOfficeEditUser from '../edit/User'
import {history} from 'react-router-dom'
import {addNewUserToList,setPopUp,unsetPopUp,removeUser} from '../../../actions'
import axios from 'axios'
/*
* Composant permettant d'afficher les informations d'un utilisateur passé en paramètre, permet de le modifier,supprimer,voir ses posts et voir ses commentaires
*
*/
class BackOfficeShowUserPage extends Component {
    constructor(props){
        super(props)
        this.state={
        }
     
        this.deleteUser=this.deleteUser.bind(this)
        this.goBack = this.goBack.bind(this);
    }

    deleteUser(id){
        const token = localStorage.token;
          fetch('https://thomasfaure.fr/user/' + id+'/delete', {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
          }).then(()=>{
            let asyncUpdate = async()=>{
              this.props.removeUser(id)
              window.location.href='/#/backoffice'
             }
             asyncUpdate()
          })
      }

    async componentDidMount(){
        //si on a pas deja enregister la liste des utilisateurs
    
        if(this.props.userList.byId[this.props.match.params.id] == null){
            console.log("on ne connait pas deja l'utilisateur")
            const token = localStorage.token;
            const config = {
                headers: { Authorization: 'Bearer ' + token }
            };
            const user = await axios.get("https://thomasfaure.fr/user/" + this.props.match.params.id, config)
            this.props.addNewUserToList(user.data[0])
        }else{
            //vu qu'on a deja tout les utilisateurs, inutile de charger via la base, on va chercher l'utilisateur souhaité
            var user = this.props.userList.byId[this.props.match.params.id]
            console.log("on a connait deja l'utilisateur")
            
            
        }
    }
    goBack(){
      this.props.history.goBack();
  }
  render() {
    if(this.props.userList.byId[this.props.match.params.id] == null){
        return(<h1>Pas d'utilisateur avec cet identifiant ! </h1>)
    }else{
        var user = this.props.userList.byId[this.props.match.params.id]
    return (
      <div>

            {this.props.popUp.page != "BOUserEdit" ? null 
            :
            <BackOfficeEditUser></BackOfficeEditUser>
            }
            {this.props.popUp.page != "deleteUser" ? null
            :
            <div className={'modal is-active'}>
            <div className="modal-background" onClick={()=>{this.props.unsetPopUp()}}></div>
            <div className="modal-card">
                <header className="modal-card-head">
                <p className="modal-card-title">Delete User</p>
                <button className="delete" aria-label="close" onClick={()=>{this.props.unsetPopUp()}}></button>
                </header>
                <section className="modal-card-body">
                    <p>Are you sure to delete this user ?</p>
                </section>
                <footer className="modal-card-foot">
                <button className="button is-danger" onClick={()=>{this.deleteUser(this.props.popUp.id);this.props.unsetPopUp()}}>Delete</button>
                <button className="button" onClick={()=>{this.props.unsetPopUp()}}>Cancel</button>
                </footer>
            </div>
            </div>}
       
        <div className="columns">
        <div className="column is-one-quarter"></div>
        <div className="column">
        <button className="button is-danger" onClick={event =>  this.goBack()}>⬅</button>

        <h1 style={{textAlign: "center",fontWeight: "bold",fontSize: "30px"}}>Page Utilisateur</h1>
        <h2 style={{fontWeight: "bold",fontSize:"20px"}}>Informations:</h2>
        <p style={{marginBottom: "10px",width: "100%"}}>Prénom: {user.firstname}</p>
        <p style={{marginBottom: "10px",width: "100%"}}>Nom: {user.lastname}</p>
        <p style={{marginBottom: "10px",width: "100%"}}>Username: {user.username}</p>
        <p style={{marginBottom: "10px",width: "100%"}}>Mail: {user.mail}</p>
        <h2 style={{fontWeight: "bold",fontSize:"20px"}}>Actions:</h2>
        <p style={{marginBottom: "10px"}}><button style={{width: "100%"}}className="button is-info" onClick={event =>  window.location.href='/#/backoffice/user/'+this.props.match.params.id+"/posts"}>Ses posts</button></p>
        <p style={{marginBottom: "10px"}}><button style={{width: "100%"}}className="button is-info" onClick={event =>  window.location.href='/#/backoffice/user/'+this.props.match.params.id+"/comments"}>Ses commentaires</button></p>
        <p style={{marginBottom: "10px"}}><button style={{width: "100%"}}className="button is-warning" onClick={()=>{this.props.setPopUp("BOUserEdit",user.user_id)}}>Modifier</button></p>
        <p style={{marginBottom: "10px"}}><button style={{width: "100%"}}className="button is-danger"  onClick={()=>{this.props.setPopUp("deleteUser",user.user_id)}}>Supprimer</button></p>


        </div>
        <div className="column is-one-quarter"></div>
      </div>
        

      </div>
    );
    }
  }
}

const mapStateToProps = state => {
    return {
      userList: state.userList,
      popUp: state.popUp
  
  
    }
  }
  
  const mapDispatchToProps = dispatch => bindActionCreators({
    addNewUserToList:addNewUserToList,
    setPopUp,
    unsetPopUp,
    removeUser:removeUser

  
    
  }, dispatch)
   
  export default connect(mapStateToProps, mapDispatchToProps)(BackOfficeShowUserPage);
 
