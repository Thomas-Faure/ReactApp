import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import fetchPostCategories from "../../../fetch/fetchPostCategories";
import fetchPosts from '../../../fetch/fetchPosts'
import {unsetPopUp} from '../../../actions'

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
    
    var data = this.props.categoriePost.categories
    this.setState({categories:data,valueCategory:data[0].post_category_id})
      

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
            let asyncUpdate = async()=>{
              await this.props.fetchPosts()
              await this.props.fetchPostCategories()
              this.props.unsetPopUp()
             }
            asyncUpdate()
           
          }
        
      })
   
  }

  render() {
    return (
      <div className={'modal is-active'}>
  <div className="modal-background"  onClick={()=>{this.props.unsetPopUp()}}></div>
  <div className="modal-card">
    <header className="modal-card-head">
      <p className="modal-card-title">New Post</p>
      <button className="delete" aria-label="close" onClick={()=>{this.props.unsetPopUp()}}></button>
    </header>
    <section className="modal-card-body">
    <div className="columns">
  <div className="column is-one-quarter"></div>
  <div className="column is-half">
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input className="input" type="text" placeholder="Title" value={this.state.valueTitle} onChange={this.handleChangeTitle} />
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
            <div className="select" style={{width:"100%"}}>
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
    </section>
   
  </div>
</div>
 
 
    );
  }
}



const mapStateToProps = (state) => {
  return {
    categoriePost:state.categoriePost
  }
}

const mapDispatchToProps = dispatch => bindActionCreators( {
  fetchPosts: fetchPosts,
  fetchPostCategories:fetchPostCategories,
  unsetPopUp
  
},dispatch)
 
export default connect(mapStateToProps, mapDispatchToProps)(BackOfficeCreatePost);

