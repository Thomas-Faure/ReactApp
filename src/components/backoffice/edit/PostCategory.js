import React, { Component } from "react";

import { connect } from "react-redux";




class BackOfficeEditPostCategory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id:this.props.match.params.id,
      valueDescription: "",
      valueCouleur: "",
      valueUrl: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangeDescription=this.handleChangeDescription.bind(this)
    this.handleChangeCouleur= this.handleChangeCouleur.bind(this)
    this.handleChangeUrl= this.handleChangeUrl.bind(this)

    this.sendData = this.sendData.bind(this)
    this.getData = this.getData.bind(this)
  }

  componentDidMount() {
      this.getData();
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

  getData(){

    var data = this.props.categoriePost.categories.find(element => element.post_category_id === this.state.id);
    if(data != null){
      this.setState({
        valueDescription:data.description,
        valueCouleur:data.couleur,
        valueUrl:data.url_image})

    }
                
          

  }

  sendData() {
    
  
    fetch("http://51.255.175.118:2000/postCategory/"+this.state.id+"/edit", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({description: this.state.valueDescription, couleur: this.state.valueCouleur})
    })
      .then(res => res.json())
      .then((data) => {
          if(data.affectedRows===1){
            window.location = "/#/backoffice/postCategories"; 
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
    categoriePost: state.categoriePost
  }
}

const mapDispatchToProps = () => {
  return {
    

  }
}
 
export default connect(mapStateToProps, mapDispatchToProps())(BackOfficeEditPostCategory);



