import React, { Component } from "react";


class BackOfficeEditPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id:this.props.match.params.id,
      valueTitle: "",
      valueDescription: "",
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangeDescription=this.handleChangeDescription.bind(this)
    this.handleChangeTitle= this.handleChangeTitle.bind(this)
    this.sendData = this.sendData.bind(this)
    this.getData = this.getData.bind(this)
  }

  componentDidMount() {
      this.getData();
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

  getData(){
    fetch("http://51.255.175.118:2000/post/"+this.state.id, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
        
      })
        .then(res => res.json())
        .then((data) => {
         
            if(data.length===1){
                this.setState({
                    valueTitle:data[0].title,
                    valueDescription:data[0].description})
            }
          
        })

  }

  sendData() {
    
  
    fetch("http://51.255.175.118:2000/post/"+this.state.id+"/edit", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ category: 1, title: this.state.valueTitle, description: this.state.valueDescription})
    })
      .then(res => res.json())
      .then((data) => {
          if(data.affectedRows===1){
            window.location = "/#/backoffice/posts"; 
          }
        
      })
   
  }

  render() {
    return (
      <div>


        <form onSubmit={this.handleSubmit}>
          <div class="field">
            <label class="label">Title</label>
            <div class="control">
              <input class="input" type="text" placeholder="title" value={this.state.valueTitle} onChange={this.handleChangeTitle} />
            </div>
          </div>
          <div class="field">
            <label class="label">Description</label>
            <div class="control">
              <input class="input" type="text" placeholder="Description" value={this.state.valueDescription} onChange={this.handleChangeDescription} />
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





export default BackOfficeEditPost;