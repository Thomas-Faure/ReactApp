import React, { Component } from "react";
 
class BackOfficeIndex extends Component {
  render() {
    return (
      <div>
       
        <div className="columns">
        <div className="column is-one-quarter"></div>
        <div className="column">
        <h1 style={{textAlign: "center",fontWeight: "bold",fontSize: "30px"}}>BackOffice Menu</h1>
        <h2 style={{fontWeight: "bold",fontSize:"20px"}}>Manage Data:</h2>
        <p style={{marginBottom: "10px",width: "100%"}}><button style={{width: "100%"}}className="button is-info" onClick={event =>  window.location.href='/#/backoffice/posts'}>Posts</button></p>
        <p style={{marginBottom: "10px"}}><button style={{width: "100%"}}className="button is-info" onClick={event =>  window.location.href='/#/backoffice/users'}>User</button></p>
        <p style={{marginBottom: "10px"}}><button style={{width: "100%"}}className="button is-info" onClick={event =>  window.location.href='/#/backoffice/postCategories'}>Post Category</button></p>
        <p style={{marginBottom: "10px"}}><button style={{width: "100%"}}className="button is-info" onClick={event =>  window.location.href='/#/backoffice/commentCategories'}>Comment Category</button></p>
        <h2 style={{fontWeight: "bold",fontSize:"20px"}}>Manage Reports:</h2>
        <p style={{marginBottom: "10px"}}><button style={{width: "100%"}}className="button is-warning" onClick={event =>  window.location.href='/#/backoffice/users'}>Comment report</button></p>
        <p style={{marginBottom: "10px"}}><button style={{width: "100%"}}className="button is-warning" onClick={event =>  window.location.href='/#/backoffice/users'}>Post report</button></p>


        </div>
        <div className="column is-one-quarter"></div>
      </div>
        

      </div>
    );
  }
}
 
export default BackOfficeIndex;