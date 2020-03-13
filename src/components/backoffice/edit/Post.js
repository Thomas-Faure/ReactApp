import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import fetchPostCategories from "../../../fetch/fetchPostCategories";
import fetchPosts from '../../../fetch/fetchPosts'

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
    var post = this.props.post.posts.find(element => element.post_id == this.state.id);
    this.setState({
      valueTitle:post.title,
      valueDescription:post.description,
      valueCategory:post.post_category})
 


  }
  getCategories(){
    
      var data = this.props.categoriePost.categories
      this.setState({categories:data})
        
      

  }

  sendData() {
    const token = localStorage.token;
    fetch("http://51.255.175.118:2000/post/"+this.state.id+"/edit", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ category: this.state.valueCategory, title: this.state.valueTitle, description: this.state.valueDescription})
    })
      .then(res => res.json())
      .then((data) => {
          if(data.affectedRows===1){
            let asyncUpdate = async()=>{
              await this.props.fetchPosts()
              await this.props.fetchPostCategories()
              window.location = "/#/backoffice/posts"; 
             }
             asyncUpdate()
           
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
            <label className="label">Title</label>
            <div className="control">
              <input className="input" type="text" placeholder="title" value={this.state.valueTitle} onChange={this.handleChangeTitle} />
            </div>
          </div>
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
            <option key={val.post_category_id} value={val.post_category_id}>{val.description}</option>
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



const mapStateToProps = (state) => {
  return {
    post: state.post,
    categoriePost:state.categoriePost
  }
}

const mapDispatchToProps = dispatch => bindActionCreators( {
  fetchPosts: fetchPosts,
  fetchPostCategories:fetchPostCategories
  
},dispatch)
 
export default connect(mapStateToProps, mapDispatchToProps)(BackOfficeEditPost);

