import React, { Component } from "react";


class BackOfficeEditComment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comment_id:this.props.match.params.comment_id,
      post_id: this.props.match.params.post_id,
      valueDescription: "",
      categories: [],
      valueCategory: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangeDescription=this.handleChangeDescription.bind(this)
    this.handleChangeCategory=this.handleChangeCategory.bind(this)
    this.sendData = this.sendData.bind(this)
    this.getData = this.getData.bind(this)
  }

  componentDidMount() {
      this.getData();
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
    fetch("http://51.255.175.118:2000/commentCategory", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then((data) => {
    
          this.setState({categories:data})
      })

  }

  getData(){
    fetch("http://51.255.175.118:2000/comment/"+this.state.comment_id, {
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
                    valueDescription:data[0].description,
                    valueCategory:data[0].comment_category})
            }
          
        })
  }

  sendData() {
    const token = localStorage.token;
  
    fetch("http://51.255.175.118:2000/comment/"+this.state.comment_id+"/edit", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({comment_category: this.state.valueCategory, description: this.state.valueDescription})
    })
      .then(res => res.json())
      .then((data) => {
          if(data.affectedRows===1){
            window.location = "/#/backoffice/posts/"+this.state.post_id+"/comments"; 
          }
        
      })
   
  }

  render() {
    return (
      <div className="columns">
      <div className="column is-one-quarter"></div>
      <div className="column is-half">
      <div>
        <form onSubmit={this.handleSubmit}>
         
          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <input className="input" type="text" placeholder="Description" value={this.state.valueDescription} onChange={this.handleChangeDescription} />
            </div>
          </div>
          <div className="field">
            <label className="label">Category</label>
            <div className="control">
            <div className="select">
            
              <select value={this.state.valueCategory} onChange={this.handleChangeCategory}>
              {(this.state.categories.length !== 0 )?
            this.state.categories.map((val,index) =>
            <option key={val.comment_category_id}value={val.comment_category_id}>{val.description}</option>
            )
            :
         null
          }
              
          </select>
          </div>
            </div>
          </div>
          <div className="control">
            <input className="button is-link" type="submit" value="submit"></input>
          </div>
        </form>
        <p style={{marginTop:"10px"}}><button className="button is-danger" onClick={event =>  window.location.href='/#/backoffice/posts'}>Back</button></p>


      </div>
      </div>
      <div className="column is-one-quarter"></div>
      </div>
    );
  }
}





export default BackOfficeEditComment;