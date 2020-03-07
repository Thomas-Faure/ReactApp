import React, { Component } from "react";


class BackOfficeCreatePost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      valueTitle: "",
      valueDescription: "",
      categories: [],
      valueCategory: "",
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangeDescription=this.handleChangeDescription.bind(this)
    this.handleChangeTitle= this.handleChangeTitle.bind(this)
    this.handleChangeCategory= this.handleChangeCategory.bind(this)
    this.sendData = this.sendData.bind(this)
    this.getCategories = this.getCategories.bind(this)
  }

  componentDidMount() {
    this.getCategories()
  }

  handleChangeTitle(event) {
    this.setState({ valueTitle: event.target.value })
  }
  handleChangeDescription(event) {
    this.setState({ valueDescription: event.target.value })
  }
  handleChangeCategory(event) {
    this.setState({ valueCategory: event.target.value })
  }

  handleSubmit(event) {
    this.sendData()
    event.preventDefault();
  }

  getCategories(){
    fetch("http://51.255.175.118:2000/postCategory", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then((data) => {
       
          this.setState({categories:data},
            this.setState({valueCategory:data[0].post_category_id}))
        
      })

  }

  sendData() {
    
    const token = localStorage.token;
    fetch("http://51.255.175.118:2000/post/create", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
        
      },
      body: JSON.stringify({title: this.state.valueTitle, description: this.state.valueDescription,category : this.state.valueCategory})
    })
      .then(res => res.json())
      .then((data) => {
          if(data.result===true){
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
              <input class="input" type="text" placeholder="Description" value={this.state.valueDescription} onChange={this.handleChangeDescription} />
            </div>
          </div>
          <div class="field">
            <label class="label">Category</label>
            <div class="control">
            <div className="select">
            
              <select value={this.state.valueCategory} onChange={this.handleChangeCategory}>
              {(this.state.categories.length != 0 )?
            this.state.categories.map((val,index) =>
            <option value={val.post_category_id}>{val.description}</option>
            )
            :
         null
          }
              
 

          </select>
          </div>
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