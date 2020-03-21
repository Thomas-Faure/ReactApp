import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormattedMessage } from 'react-intl';
class Contact extends Component {
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
              <form className="column is-one-third ">
                <div className="has-text-left">
                  <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                      <input className="input is-medium" type="text" />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                      <input className="input is-medium" type="text" />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Message</label>
                    <div className="control">
                      <textarea className="textarea is-medium"></textarea>
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