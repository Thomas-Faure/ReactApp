import React, { Component } from "react";

import { connect } from "react-redux";
import {unsetPopUp} from '../../../actions'
import fetchCommentCategories from "../../../fetch/fetchCommentCategories";
import {FormattedMessage,injectIntl} from 'react-intl'
/*
* Composant permettant d'afficher un formulaire pour modifier uune catégorie de commentaire
*
*/
class BackOfficeEditCommentCategory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id:this.props.popUp.id,
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
    var data = this.props.categorieComment.byId[this.state.id];

 
      if(data != null){
              this.setState({
                  valueDescription:data.description,
                  valueCouleur:data.color
                })
            }
          


  }

  sendData() {
    
    const token = localStorage.token;
    fetch("https://thomasfaure.fr/commentCategory/"+this.state.id+"/edit", {
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
          if(data.affectedRows===1){
           
            let asyncUpdate = async()=>{
        
              await this.props.fetchCommentCategories()
              this.props.unsetPopUp()
             }
             asyncUpdate()
          }
        
      })
   
  }

  render() {
    const { formatMessage } = this.props.intl;
    return (

      <div className={'modal is-active'}>
  <div className="modal-background" onClick={()=>{this.props.unsetPopUp()}}></div>
  <div className="modal-card">
    <header className="modal-card-head">
      <p className="modal-card-title">Edit Post Category</p>
      <button className="delete" aria-label="close" onClick={()=>{this.props.unsetPopUp()}}></button>
    </header>
    <section className="modal-card-body">
        

      <div className="columns">
      <div className="column is-one-quarter"></div>
      <div className="column is-half">
      <div>


        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="label"><FormattedMessage id="backoffice.menu1.commentC.create.description"/></label>
            <div className="control">
              <input className="input" type="text" placeholder="Description" value={this.state.valueDescription} onChange={this.handleChangeDescription} />
            </div>
          </div>
          <div className="field">
            <label className="label"><FormattedMessage id="backoffice.menu1.commentC.create.couleur"/></label>
            <div className="control">
              <input className="input" type="color" placeholder="Couleur" value={this.state.valueCouleur} onChange={this.handleChangeCouleur} />
            </div>
          </div>

       

          <div className="control">
            <input className="button is-link" type="submit" value={formatMessage({id: "backoffice.general.submit"})}></input>

          </div>


        </form>
        <p style={{marginTop:"10px"}}><button className="button is-danger" onClick={()=>{this.props.unsetPopUp()}}>{formatMessage({id: "backoffice.general.back"})}</button></p>


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
    categorieComment: state.categorieComment,
    popUp: state.popUp
  }
}

const mapDispatchToProps = () => {
  return {
    fetchCommentCategories: fetchCommentCategories,
    unsetPopUp

  }
}
 
export default injectIntl(connect(mapStateToProps, mapDispatchToProps())(BackOfficeEditCommentCategory));
