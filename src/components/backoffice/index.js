import React, { Component } from "react";
import {FormattedMessage} from 'react-intl';
/*
* Composant permettant d'afficher le menu du backoffice afin d'accéder aux différentes options
*
*/
class BackOfficeIndex extends Component {
  render() {
    return (
      <div>
       
        <div className="columns">
        <div className="column is-one-quarter"></div>
        <div className="column">
        <h1 style={{textAlign: "center",fontWeight: "bold",fontSize: "30px"}}><FormattedMessage id="backoffice.title"/></h1>
        <h2 style={{fontWeight: "bold",fontSize:"20px"}}><FormattedMessage id="backoffice.menu1"/>:</h2>
        <p style={{marginBottom: "10px",width: "100%"}}><button style={{width: "100%"}}className="button is-info" onClick={event =>  window.location.href='/#/backoffice/posts'}><FormattedMessage id="backoffice.menu1.posts.title"/></button></p>
        <p style={{marginBottom: "10px"}}><button style={{width: "100%"}}className="button is-info" onClick={event =>  window.location.href='/#/backoffice/users'}><FormattedMessage id="backoffice.menu1.user.title"/></button></p>
        <p style={{marginBottom: "10px"}}><button style={{width: "100%"}}className="button is-info" onClick={event =>  window.location.href='/#/backoffice/postCategories'}><FormattedMessage id="backoffice.menu1.postC.title"/></button></p>
        <p style={{marginBottom: "10px"}}><button style={{width: "100%"}}className="button is-info" onClick={event =>  window.location.href='/#/backoffice/commentCategories'}><FormattedMessage id="backoffice.menu1.commmentC.title"/></button></p>
        <h2 style={{fontWeight: "bold",fontSize:"20px"}}><FormattedMessage id="backoffice.menu2"/>:</h2>
        <p style={{marginBottom: "10px"}}><button style={{width: "100%"}}className="button is-warning" onClick={event =>  window.location.href='/#/backoffice/reportComments'}><FormattedMessage id="backoffice.menu2.comment.title"/></button></p>
        <p style={{marginBottom: "10px"}}><button style={{width: "100%"}}className="button is-warning" onClick={event =>  window.location.href='/#/backoffice/reportPosts'}><FormattedMessage id="backoffice.menu2.post.title"/></button></p>


        </div>
        <div className="column is-one-quarter"></div>
      </div>
        

      </div>
    );
  }
}
 
export default BackOfficeIndex;