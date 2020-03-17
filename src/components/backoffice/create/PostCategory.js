import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import fetchPostCategories from "../../../fetch/fetchPostCategories";
import {unsetPopUp} from '../../../actions'

class BackOfficeCreatePostCategory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      valueDescription: "",
      valueCouleur: "#ffffff",
      valueUrl: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangeDescription=this.handleChangeDescription.bind(this)
    this.handleChangeCouleur= this.handleChangeCouleur.bind(this)
    this.handleChangeUrl= this.handleChangeUrl.bind(this)

    this.sendData = this.sendData.bind(this)
  }



  handleChangeDescription(event) {
    this.setState({ valueDescription: event.target.value })
  }
  handleChangeCouleur(event) {
    this.setState({ valueCouleur: event.target.value })
  }
  handleChangeUrl(event) {
    this.setState({ valueUrl: event.target.value })
  }

  

  handleSubmit(event) {
    this.sendData()
    event.preventDefault();
  }

  sendData() {
    
    const token = localStorage.token;
    fetch("https://thomasfaure.fr/postCategory/create", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({description: this.state.valueDescription, couleur: this.state.valueCouleur})
    })
      .then(res => res.json())
      .then((data) => {
          if(data.result===true){
            let asyncUpdate = async()=>{
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
      <p className="modal-card-title">New Post Category</p>
      <button className="delete" aria-label="close"  onClick={()=>{this.props.unsetPopUp()}}></button>
    </header>
    <section className="modal-card-body">
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
            <label className="label">Couleur</label>
            <div className="control">
              <input className="input" type="color" placeholder="Couleur" value={this.state.valueCouleur} onChange={this.handleChangeCouleur} />
            </div>
          </div>
          <div className="field">
            <label className="label">Url</label>
            <div className="control">
              <input className="input" type="text" placeholder="Url" value={this.state.valueUrl} onChange={this.handleChangeUrl} />
            </div>
          </div>
       

          <div className="control">
            <input className="button is-link" type="submit" value="submit"></input>

          </div>


        </form>
        <p style={{marginTop:"10px"}}><button className="button is-danger"  onClick={()=>{this.props.unsetPopUp()}}>Back</button></p>


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
    categoriePost:state.categoriePost,
    popUp: state.popUp
  }
}

const mapDispatchToProps = dispatch => bindActionCreators( {
  fetchPostCategories:fetchPostCategories,
  unsetPopUp
  
},dispatch)
 
export default connect(mapStateToProps, mapDispatchToProps)(BackOfficeCreatePostCategory);



