import React, { Component } from "react";

import { connect } from "react-redux";

class BackOfficeEditCommentCategory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id:this.props.match.params.id,
      valueDescription: "",
      valueCouleur: ""

    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangeDescription=this.handleChangeDescription.bind(this)
    this.handleChangeCouleur= this.handleChangeCouleur.bind(this)


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


  

  handleSubmit(event) {
    this.sendData()
    event.preventDefault();
  }

  getData(){
    console.log(this.props.categorieComment)
    var data = this.props.categorieComment.categories.find(element => element.comment_category_id === this.state.id);
 
      if(data != null){
              this.setState({
                  valueDescription:data.description,
                  valueCouleur:data.color
                })
            }
          


  }

  sendData() {
    
  
    fetch("http://51.255.175.118:2000/commentCategory/"+this.state.id+"/edit", {
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
            window.location = "/#/backoffice/commentCategories"; 
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
          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <input className="input" type="text" placeholder="Username" value={this.state.valueDescription} onChange={this.handleChangeDescription} />
            </div>
          </div>
          <div className="field">
            <label className="label">Couleur</label>
            <div className="control">
              <input className="input" type="color" placeholder="Firstname" value={this.state.valueCouleur} onChange={this.handleChangeCouleur} />
            </div>
          </div>

       

          <div className="control">
            <input className="button is-link" type="submit" value="submit"></input>

          </div>


        </form>
        <p style={{marginTop:"10px"}}><button className="button is-danger" onClick={event =>  window.location.href='/#/backoffice/commentCategories'}>Back</button></p>


      </div>
      </div>
      <div class="column is-one-quarter"></div>
      </div>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    categorieComment: state.categorieComment
  }
}

const mapDispatchToProps = () => {
  return {
    

  }
}
 
export default connect(mapStateToProps, mapDispatchToProps())(BackOfficeEditCommentCategory);
