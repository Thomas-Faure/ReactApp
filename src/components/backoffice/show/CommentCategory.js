import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import fetchComments from '../../../fetch/fetchComments'
import fetchCommentCategories from "../../../fetch/fetchCommentCategories";
import BackOfficeEditCommentCategory from '../edit/CommentCategory'
import {setPopUp,unsetPopUp} from '../../../actions';
import BackOfficeCreateCommentCategory from "../create/CommentCategory"
import {FormattedMessage,injectIntl} from 'react-intl';
/*
* Composant permettant d'afficher la liste des catégories de commentaire afin de pouvoir effectuer des actions comme la suppression ou la modification
*
*/
class BackOfficeShowCommentCategories extends Component {

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
            IdcommentCategorySelected: null
        }
        this.pushNextButton=this.pushNextButton.bind(this)
        this.pushPrevButton=this.pushPrevButton.bind(this)
        this.handleChangeSearch = this.handleChangeSearch.bind(this)
        this.deletePostCategory= this.deletePostCategory.bind(this)

      }

      componentDidUpdate(newprops){
        if(this.props.categorieComment != newprops.categorieComment)
        this.getData()
      }
    componentDidMount() {
        this.getData()
    }

    getData(){
      let data = this.props.categorieComment.allIds.map(id => this.props.categorieComment.byId[id])

        this.setState({
          data: data,
          dataFixed: data,
   
          maxPage: (Math.ceil(data.length/this.state.elementsByPage) == 0 ? 1 : Math.ceil(data.length/this.state.elementsByPage))
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
        var properties = ["comment_category_id","description","color"]
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
      fetch('https://thomasfaure.fr/commentCategory/' + id+'/delete', {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
        }).then(()=>{
          let asyncUpdate = async()=>{
            
            await this.props.fetchCommentCategories()
            await this.props.fetchComments()
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
{this.props.popUp.page != "BOCommentCatCreate" ? null 
            :
            <BackOfficeCreateCommentCategory></BackOfficeCreateCommentCategory>
            }
            {this.props.popUp.page != "BOCommentCatEdit" ? null 
            :
            <BackOfficeEditCommentCategory></BackOfficeEditCommentCategory>
            }
 {this.props.popUp.page != "deleteCommentCategory" ? null
            :
<div className={'modal is-active'}>
  <div className="modal-background" onClick={()=>{this.props.unsetPopUp()}}></div>
  <div className="modal-card">
    <header className="modal-card-head">
      <p className="modal-card-title"><FormattedMessage id="backoffice.delete.title.commentC"/></p>
      <button className="delete" aria-label="close"onClick={()=>{this.props.unsetPopUp()}}></button>
    </header>
    <section className="modal-card-body">
        <p><FormattedMessage id="backoffice.delete.commentC"/></p>
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
            <h1 style={{textAlign: "center",fontWeight: "bold",fontSize: "30px",marginBottom:"10px"}}><FormattedMessage id="backoffice.menu1.commentC.titlePage"/></h1>
           
            <div className="columns">
            <div className="column is-one-quarter">
            <button className="button is-danger" onClick={event =>  window.location.href='/#/backoffice'}>⬅</button>
            </div>
            <div className="column is-half" style={{textAlign: "center"}}>
                <button className="button is-primary" style={{marginBottom: "10px"}}  onClick={() => this.props.setPopUp("BOCommentCatCreate")}>+</button>
            </div>
            <div className="column is-one-quarter">

            </div>
            </div>

            <input className="input" type="text" placeholder={formatMessage({id: "backoffice.general.search"})} value={this.state.searchItem} onChange={this.handleChangeSearch} />

        
            <table style={{width: "100%"}} className="table">
  <thead>
    <tr style={{textAlign:"center"}}>
      
        <th >Id</th>
        <th ><FormattedMessage id="backoffice.menu1.commentC.field.description"/></th>
        <th ><FormattedMessage id="backoffice.menu1.commentC.field.couleur"/></th>
        <th ><FormattedMessage id="backoffice.menu1.commentC.field.action"/></th>

    </tr>
  </thead>

  <tbody>
  
    {((this.state.data !== null )&& (this.state.data !== ""))?
            this.state.data.slice(0+(this.state.actualPage*this.state.elementsByPage),5+(this.state.actualPage*this.state.elementsByPage)).map((val,index) =>
            <tr key={val.comment_category_id}>
            <th style={{height:50,width:30}}>{val.comment_category_id}</th>
            <td style={{height:50,width:150}} >{val.description}</td>
            <td style={{height:50,width:150}} >{val.color}</td>
            <td style={{height:50,width:200}} ><p><button style={{marginRight:"10px"}} className="button is-info" onClick={() =>  this.props.setPopUp("BOCommentCatEdit",val.comment_category_id)}><FontAwesomeIcon icon="edit" /></button><button className="button is-danger" onClick={()=>{this.props.setPopUp("deleteCommentCategory",val.comment_category_id)}}><FontAwesomeIcon icon="trash" /></button></p></td>
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
    categorieComment : state.categorieComment,
    popUp: state.popUp

  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchCommentCategories: fetchCommentCategories,
  fetchComments: fetchComments,
  setPopUp,
  unsetPopUp
  
}, dispatch)
 
export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(BackOfficeShowCommentCategories));
 
