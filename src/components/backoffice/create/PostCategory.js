import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import fetchPostCategories from "../../../fetch/fetchPostCategories";

class BackOfficeCreatePostCategory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id:this.props.match.params.id,
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
    
  
    fetch("http://51.255.175.118:2000/postCategory/create", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({description: this.state.valueDescription, couleur: this.state.valueCouleur})
    })
      .then(res => res.json())
      .then((data) => {
          if(data.result===true){
            let asyncUpdate = async()=>{
              await this.props.fetchPostCategories()
              window.location = "/#/backoffice/postCategories"; 
             }
            asyncUpdate()
            
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
            <label class="label">Description</label>
            <div class="control">
              <input class="input" type="text" placeholder="Username" value={this.state.valueDescription} onChange={this.handleChangeDescription} />
            </div>
          </div>
          <div class="field">
            <label class="label">Couleur</label>
            <div class="control">
              <input class="input" type="color" placeholder="Firstname" value={this.state.valueCouleur} onChange={this.handleChangeCouleur} />
            </div>
          </div>
          <div class="field">
            <label class="label">Url</label>
            <div class="control">
              <input class="input" type="text" placeholder="Lastname" value={this.state.valueUrl} onChange={this.handleChangeUrl} />
            </div>
          </div>
       

          <div class="control">
            <input class="button is-link" type="submit" value="submit"></input>

          </div>


        </form>
        <p style={{marginTop:"10px"}}><button class="button is-danger" onClick={event =>  window.location.href='/#/backoffice/postCategories'}>Back</button></p>


      </div>

  </div>
  <div class="column is-one-quarter"></div>
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
  fetchPostCategories:fetchPostCategories
  
},dispatch)
 
export default connect(mapStateToProps, mapDispatchToProps)(BackOfficeCreatePostCategory);



