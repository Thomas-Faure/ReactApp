import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import fetchPosts from '../../../fetch/fetchPosts'
import fetchPostCategories from "../../../fetch/fetchPostCategories";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {setPopUp,unsetPopUp,removePostCategorie} from '../../../actions';
import BackOfficeEditPostCategory from '../edit/PostCategory'
import BackOfficeCreatePostCategory from "../create/PostCategory"
import {FormattedMessage,injectIntl} from 'react-intl';

/*
* Composant permettant d'afficher la liste des catégories de posts afin de pouvoir effectuer des actions comme la suppression ou la modification
*
*/
class BackOfficeShowPostCategories extends Component {

    constructor(props) {
        super(props)
        this.state = {
            searchItem: "",
            dataFixed : null,
            data: null,
            elementsByPage: 5,
            actualPage : 0,
            maxPage: 0,
            isOpen: false,
            IdpostCategorySelected: null
        }
        this.pushNextButton=this.pushNextButton.bind(this)
        this.pushPrevButton=this.pushPrevButton.bind(this)
        this.handleChangeSearch = this.handleChangeSearch.bind(this)
        this.deletePostCategory= this.deletePostCategory.bind(this)


      }

    componentDidMount() {
        this.getData()
    }

    componentDidUpdate(newprops){
      if(this.props.categoriePost != newprops.categoriePost)
      this.getData()
    }
    getData(){
      let data = this.props.categoriePost.allIds.map(id => this.props.categoriePost.byId[id])
        this.setState({
          data: data,
          dataFixed: data,
          maxPage: (Math.ceil(data.length/this.state.elementsByPage)==0 ? 1 : Math.ceil(data.length/this.state.elementsByPage))
        })

    }

    pushNextButton(){
        if(this.state.actualPage < this.state.maxPage-1){
        this.setState({
            actualPage : this.state.actualPage+1
           
        })
    }

    }
    search(){
      var temp = this.state.dataFixed.filter((n)=>{
        var properties = ["post_category_id","description","couleur"]
        var exist = false
      
        for(var i = 0;i<properties.length;++i){
            if(n[properties[i]].toString().toLowerCase().includes(this.state.searchItem.toLowerCase())){
                exist = true
           }
        }
        return exist
        
    })
    this.setState({data:temp,
        actualPage : 0,
        maxPage: (Math.ceil(temp.length/this.state.elementsByPage) == 0 ?  1 : Math.ceil(temp.length/this.state.elementsByPage))})
    }
    handleChangeSearch(event){
        this.setState({searchItem: event.target.value},()=>{

                 
        this.search()
         
          })


    }

    deletePostCategory(id){
      const token = localStorage.token;
      fetch('https://thomasfaure.fr/postCategory/' + id+'/delete', {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + token
        }
        }).then(()=>{

          let asyncUpdate = async()=>{
            
            this.props.removePostCategorie()
            this.getData()
            this.search()
         
          
           }
           asyncUpdate()

        })
        
        
        

    }

    pushPrevButton(){
        if(this.state.actualPage >0){
            this.setState({
                actualPage : this.state.actualPage-1
              
            })
        }

    }


    render() {
      const { formatMessage } = this.props.intl;
        return (
            <div>

{this.props.popUp.page != "BOPostCatCreate" ? null 
            :
            <BackOfficeCreatePostCategory></BackOfficeCreatePostCategory>
            }
            {this.props.popUp.page != "BOPostCatEdit" ? null 
            :
            <BackOfficeEditPostCategory></BackOfficeEditPostCategory>
            }
 {this.props.popUp.page != "deletePostCategory" ? null
            :
<div className={'modal is-active'}>
  <div className="modal-background" onClick={()=>{this.props.unsetPopUp()}}></div>
  <div className="modal-card">
    <header className="modal-card-head">
      <p className="modal-card-title"><FormattedMessage id="backoffice.delete.title.postC"/></p>
      <button className="delete" aria-label="close" onClick={()=>{this.props.unsetPopUp()}}></button>
    </header>
    <section className="modal-card-body">
        <p><FormattedMessage id="backoffice.delete.postC"/></p>
    </section>
    <footer className="modal-card-foot">
      <button className="button is-danger" onClick={()=>{this.deletePostCategory(this.props.popUp.id);this.props.unsetPopUp()}}>{formatMessage({id: "backoffice.general.delete"})}</button>
      <button className="button" onClick={()=>{this.props.unsetPopUp()}}>{formatMessage({id: "backoffice.general.cancel"})}</button>
    </footer>
  </div>
</div>}
 

            <div className="columns">
            <div className="column is-one-quarter"></div>
            <div className="column is-half"  style={{margin: "auto"}}>
            <h1 style={{textAlign: "center",fontWeight: "bold",fontSize: "30px",marginBottom:"10px"}}><FormattedMessage id="backoffice.menu1.postC.titlePage"/></h1>
           
            <div className="columns">
            <div className="column is-one-quarter">
            <button className="button is-danger" onClick={event =>  window.location.href='/#/backoffice'}>⬅</button>
            </div>
            <div className="column is-half" style={{textAlign: "center"}}>
                <button className="button is-primary" style={{marginBottom: "10px"}}  onClick={() =>  this.props.setPopUp("BOPostCatCreate",null)}>+</button>
            </div>
            <div className="column is-one-quarter">

            </div>
            </div>

            <input className="input" type="text" placeholder={formatMessage({id: "backoffice.general.search"})} value={this.state.searchItem} onChange={this.handleChangeSearch} />

        
            <table style={{width: "100%"}} className="table">
  <thead>
    <tr style={{textAlign:"center"}}>
      
        <th >Id</th>
        <th ><FormattedMessage id="backoffice.menu1.postC.field.description"/></th>
        <th ><FormattedMessage id="backoffice.menu1.postC.field.couleur"/></th>
        <th ><FormattedMessage id="backoffice.menu1.postC.field.action"/></th>

    </tr>
  </thead>

  <tbody>
  
    {((this.state.data !== null )&& (this.state.data !== ""))?
            this.state.data.slice(0+(this.state.actualPage*this.state.elementsByPage),5+(this.state.actualPage*this.state.elementsByPage)).map((val,index) =>
            <tr key={val.post_category_id}>
            <th style={{height:50,width:30}}>{val.post_category_id}</th>
            <td style={{height:50,width:150}} >{val.description}</td>
            <td style={{height:50,width:150}} >{val.couleur}</td>
            <td style={{height:50,width:200}} ><p><button style={{marginRight:"10px"}} className="button is-info" onClick={()=>{this.props.setPopUp("BOPostCatEdit",val.post_category_id)}}><FontAwesomeIcon icon="edit" /></button><button className="button is-danger" onClick={()=>{this.props.setPopUp("deletePostCategory",val.post_category_id)}}><FontAwesomeIcon icon="trash" /></button></p></td>
            </tr>
            )
            :
         null
          }

    
  </tbody>
</table>
<p style={{textAlign: "center",margin: "auto"}}><span style={{marginBottom:"10px"}}><FormattedMessage id="backoffice.general.currentPage"/> : {this.state.actualPage+1} / {this.state.maxPage}</span><br/><button className="button is-link" onClick={this.pushPrevButton}><FormattedMessage id="backoffice.general.prev"/></button><button className="button is-link" onClick={this.pushNextButton}><FormattedMessage id="backoffice.general.next"/></button><br/>
</p>
            </div>
            <div className="column is-one-quarted"></div>
            </div>
            </div>
           
    );
  }
}
 

const mapStateToProps = state => {
  return {
    categoriePost : state.categoriePost,
    popUp: state.popUp

  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchPosts: fetchPosts,
  fetchPostCategories:fetchPostCategories,
  setPopUp,
  unsetPopUp,
  removePostCategorie

  
}, dispatch)
 
export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(BackOfficeShowPostCategories));

