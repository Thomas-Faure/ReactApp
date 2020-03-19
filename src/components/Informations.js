import React, { Component } from "react";
import {FormattedMessage} from 'react-intl';
class Informations extends Component {
    render() {
        return (
            <div>
                <h1 className="title"><FormattedMessage id="informations.title"/></h1>
                <p><FormattedMessage id="informations.content"/></p>
            </div>
        );
    }
}

export default Informations;