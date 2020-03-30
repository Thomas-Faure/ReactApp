import React, { Component } from "react";
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormattedMessage } from 'react-intl';
/*
* Composant affichant la page contact permettant d'envoyer un mail à l'administrateur
*
*/
class Contact extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onEmailChange = this.onEmailChange.bind(this)
    this.onNameChange = this.onNameChange.bind(this)
    this.onMessageChange = this.onMessageChange.bind(this)
  }
/*
* Fonction de soumission du formulaire de contact, envoie de mail
*
*/
  handleSubmit(e) {
    e.preventDefault();
    axios({
      method: "POST",
      url: "https://thomasfaure.fr/mail/send",
      data: this.state
    }).then((response) => {
      if (response.data.status === 'success') {
        alert("Message Sent.");
        this.resetForm()
      } else if (response.data.status === 'fail') {
        alert("Message failed to send.")
      }
    })
  }

  resetForm() {
    this.setState({ name: '', email: '', message: '' })
  }

  onNameChange(event) {
    this.setState({ name: event.target.value })
  }

  onEmailChange(event) {
    this.setState({ email: event.target.value })
  }

  onMessageChange(event) {
    this.setState({ message: event.target.value })
  }
/*
* Vue du formulaire de contact
*
*/
  render() {
    return (
      <section className="hero is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="columns is-6 is-variable ">
              <div className="column is-two-thirds has-text-left">
                <h1 className="title is-1">Contact Us</h1>
                <p className="is-size-4">A question about our website ? Contact us!</p>
                <div className="social-media">
                  <a href="https://facebook.com" target="_blank" className="button is-light is-large fb"><i className="fab fa-facebook-square"></i></a>
                  <a href="https://instagram.com" target="_blank" className="button is-light is-large insta"><i className="fab fa-instagram " aria-hidden="false"></i></a>
                  <a href="https://twitter.com" target="_blank" className="button is-light is-large twitter"><i className="fab fa-twitter-square" aria-hidden="true"></i></a>
                </div>
              </div>
              <form className="column is-one-third " onSubmit={this.handleSubmit}>
                <div className="has-text-left">
                  <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                      <input className="input is-medium" type="text" required value={this.state.name} onChange={this.onNameChange}/>
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                      <input className="input is-medium" type="text" required value={this.state.email} onChange={this.onEmailChange}/>
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Message</label>
                    <div className="control">
                      <textarea className="textarea is-medium" onChange={this.onMessageChange} value={this.state.message}></textarea>
                    </div>
                  </div>
                  <div className="control">
                    <button type="submit" className="button is-link is-fullwidth has-text-weight-medium is-medium">Send Message</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Contact;