import React, { Component } from "react";
import { connect } from "react-redux";
import {setPosts} from '../../../actions';

class BackOfficeEditPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id:this.props.match.params.id,
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
    this.getData = this.getData.bind(this)
    this.getCategories = this.getCategories.bind(this)
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

  getData(){
    var post = this.props.post.find(element => element.post_id == this.state.id);
    this.setState({
      valueTitle:post.title,
      valueDescription:post.description,
      valueCategory:post.post_category})
 


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
       
          this.setState({categories:data})
        
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
      <div class="columns">
      <div class="column is-one-quarter"></div>
      <div class="column is-half">
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

          <div class="field">
            <label class="label">Category</label>
            <div class="control">
            <div className="select">
            
              <select value={this.state.valueCategory} onChange={this.handleChangeCategory}>
              {(this.state.categories.length !== 0 )?
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
      </div>
      <div class="column is-one-quarter"></div>
      </div>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    post: state.post
  }
}

const mapDispatchToProps = () => {
  return {
    

  }
}
 
export default connect(mapStateToProps, mapDispatchToProps())(BackOfficeEditPost);

