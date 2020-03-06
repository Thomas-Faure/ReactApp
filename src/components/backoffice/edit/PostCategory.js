import React, { Component } from "react";


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
    const token = localStorage.token;
    fetch("http://51.255.175.118:2000/postCategory/"+this.state.id, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
       
            'Authorization': 'Bearer ' + token
          
        }
      })
        .then(res => res.json())
        .then((data) => {
         
            if(data.length===1){
                this.setState({
                    valueDescription:data[0].description,
                    valueCouleur:data[0].couleur,
                valueUrl:data[0].url_image})
            }
          
        })

  }

  sendData() {
    
  
    fetch("http://51.255.175.118:2000/postCategory/"+this.state.id+"/edit", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ category: 1, username: this.state.valueUsername, firstname: this.state.valueFirstname})
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
              <input class="input" type="text" placeholder="Firstname" value={this.state.valueCouleur} onChange={this.handleChangeCouleur} />
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
    );
  }
}





export default BackOfficeEditPostCategory;