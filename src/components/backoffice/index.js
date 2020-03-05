import React, { Component } from "react";
 
class BackOfficeIndex extends Component {
  render() {
    return (
      <div>
        <h2>Choose a category</h2>
        <p><button class="button is-info" onClick={event =>  window.location.href='/#/backoffice/posts'}>Posts</button></p>
        <p><button class="button is-info" onClick={event =>  window.location.href='/#/backoffice/users'}>User</button></p>
      </div>
    );
  }
}
 
export default BackOfficeIndex;