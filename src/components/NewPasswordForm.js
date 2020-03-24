import React, { Component } from "react";
import {FormattedMessage} from 'react-intl';
import sha256 from 'sha256';
class NewPasswordForm extends Component {
    constructor(props){
        super(props)
        this.state={
            passwordF:"",
            passwordCF:"",
            tokenMessage:"",
            errorPassword:""

        }
        this.passwordF = this.passwordF.bind(this)
        this.passwordCF = this.passwordCF.bind(this)
        this.handleSubmitForgetPassword= this.handleSubmitForgetPassword.bind(this)
        this.changePassword = this.changePassword.bind(this)
    }
    passwordF(event) {
        this.setState({ passwordF: event.target.value })
    }
    passwordCF(event) {
        this.setState({ passwordCF: event.target.value })
    }
    handleSubmitForgetPassword(event) {
        this.changePassword()
        event.preventDefault();
    }

    async changePassword(){
        if(this.state.passwordF == this.state.passwordCF){
            if(this.state.passwordF.length<5){
                this.setState({errorPassword: "Votre mot de passe doit contenir plus de 5 catactères !"})
            }else{
            this.setState({errorPassword:""})
        var res = await fetch("https://thomasfaure.fr/user/forgotPassword/verify/"+this.props.match.params.token, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password: sha256(this.state.passwordF) })
          })
          res = await res.json()
         
          if (res == false) {
            this.setState({tokenMessage : "token non fonctionnel"})
          }else{
            this.setState({tokenMessage : "votre mot de passe vient d'être changé"})
          }
        }
        }else{
            this.setState({errorPassword: "Les deux mots de passe ne correspondent pas !"})
        }
    }



    
    render() {
        return (
            <div>
                <div className={'modal is-active '}>
            <div className="modal-background"></div>
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">Forget password</p>
              </header>
              
              <form onSubmit={this.handleSubmitForgetPassword}>
              <section className="modal-card-body">
              {this.state.errorPassword.length>0 ? <p>{this.state.errorPassword}</p>: null}
              {this.state.tokenMessage.length>0 ? <p>{this.state.tokenMessage}</p>: null}
                <div className="field">
                  <label className=" is-large">Password</label>
                  <div className="control">
                    <input className="input is-large" type="password" placeholder="Password" value={this.state.passwordF} onChange={this.passwordF} />
                  </div>
                </div>
                <div className="field">
                  <label className=" is-large">Password Confirmation</label>
                  <div className="control">
                    <input className="input is-large" type="password" placeholder="Password confirmation" value={this.state.passwordCF} onChange={this.passwordCF} />
                  </div>
                </div>
                <input className="button is-link" type="submit" value="Confirm"></input>
              </section>
              
              </form>
              <footer className="modal-card-foot ">
                <div className="padding">
                    <button className="button" onClick={() => {window.location.href='/#/'}}>Accueil</button>

                </div>
              </footer>
              
            </div>
          </div>
            </div>
        );
    }
}

export default NewPasswordForm;