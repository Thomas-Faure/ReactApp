import React, { Component } from "react";
import {FormattedMessage} from 'react-intl';
class Contact extends Component {
  render() {
    return (
      <div>
        <h2><FormattedMessage id="contact.question"/></h2>
        <p><FormattedMessage id="contact.answer"/> <a href="http://forum.kirupa.com">forums</a>.
        </p>
      </div>
    );
  }
}
 
export default Contact;