import React, { Component } from "react";
import {FormattedMessage} from 'react-intl';
class NotFound extends Component {
    render() {
        return (
            <div>
                <h1 className="title">404 PAGE</h1>
                <button className="button is-link" onClick={() => { window.location.href = '/#/' }} >Home</button>
               
            </div>
        );
    }
}

export default NotFound;