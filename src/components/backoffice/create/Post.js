import React, { Component } from "react";


class BackOfficeCreatePost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      valueTitle: "",
      valueDescription: "",
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangeDescription=this.handleChangeDescription.bind(this)
    this.handleChangeTitle= this.handleChangeTitle.bind(this)
    this.sendData = this.sendData.bind(this)
  }

  componentDidMount() {
  }

  handleChangeTitle(event) {
    this.setState({ valueTitle: event.target.value })
  }
  handleChangeDescription(event) {
    this.setState({ valueDescription: event.target.value })
  }

  handleSubmit(event) {
    this.sendData()
    event.preventDefault();
  }

  sendData() {
    
  
    fetch("http://51.255.175.118:2000/post/create", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: "T", title: this.state.valueTitle, description: this.state.valueDescription})
    })
      .then(res => res.json())
      .then((data) => {
          if(data.result==true){
            window.location = "/#/backoffice/posts"; 
          }
        
      })
   
  }

  render() {
    return (
      <div>
        <div>{this.state.errorLogin ? <h1>Il y a un erreur dans le login</h1>
          : null}
        </div>

        <form onSubmit={this.handleSubmit}>
          <div class="field">
            <label class="label">Title</label>
            <div class="control">
              <input class="input" type="text" placeholder="Title" value={this.state.valueTitle} onChange={this.handleChangeTitle} />
            </div>
          </div>
          <div class="field">
            <label class="label">Description</label>
            <div class="control">
              <input class="input" type="text" placeholder="Password" value={this.state.valueDescription} onChange={this.handleChangeDescription} />
            </div>
          </div>

          <div class="control">
            <input class="button is-link" type="submit" value="submit"></input>

          </div>


        </form>
        <p style={{marginTop:"10px"}}><button class="button is-danger" onClick={event =>  window.location.href='/#/backoffice/posts'}>Back</button></p>


      </div>
    );
  }
}





export default BackOfficeCreatePost;