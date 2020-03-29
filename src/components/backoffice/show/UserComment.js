import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import fetchCommentsByPostId from '../../../fetch/fetchComments'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import BackOfficeEditComment from "../edit/Comment"
import {addComments,deleteComment} from '../../../actions';
import {FormattedMessage} from 'react-intl';


import axios from 'axios'

import {setPopUp,unsetPopUp} from '../../../actions';
/*
* Composant permettant d'afficher la liste des commentaires d'un utilisateur passé en paramètre afin de pouvoir les modifier ou les supprimer
*
*/
class BackOfficeShowUserComments extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user_id : this.props.match.params.id,
            searchItem: "",
            dataFixed : null,
            data: null,
            elementsByPage: 5,
            actualPage : 0,
            maxPage: 0,
            isOpen: false,
            IdpostSelected: null
        }
        this.pushNextButton=this.pushNextButton.bind(this)
        this.pushPrevButton=this.pushPrevButton.bind(this)
        this.handleChangeSearch = this.handleChangeSearch.bind(this)
        this.deletePost= this.deletePost.bind(this)


      }

      componentDidUpdate(prevProps) {
        if(this.props.comment !== prevProps.comment){
          let commentsList = this.props.comment.allIds.map(id => this.props.comment.byId[id])
    

          this.setState({
            data: commentsList,
            dataFixed:commentsList,
            maxPage: Math.ceil(commentsList.length/this.state.elementsByPage)
          })
      }
    }

    async componentDidMount() {
      const token = localStorage.token;
      const config = {
        headers: { Authorization: 'Bearer '+token }
      };

        const res = await axios.get("https://thomasfaure.fr/comment/byUser/"+this.state.user_id,config)
        this.props.addComments(res.data)
    }
    getData(){
      let data = this.props.comment.allIds.map(id => this.props.comment.byId[id])
      console.log(data.length/this.state.elementsByPage)
        this.setState({
          data: data,
          dataFixed: data,
          maxPage: Math.floor(data.length/this.state.elementsByPage)
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
        var properties = ["comment_id","description"]
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
        maxPage: Math.floor(temp.length/this.state.elementsByPage)})
    }
    handleChangeSearch(event){
        this.setState({searchItem: event.target.value},()=>{

            
     
          this.search()

                 
          })


    }
    deletePost(id){
      const token = localStorage.token;
      fetch('https://thomasfaure.fr/comment/' + id+'/delete', {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
        }).then(()=>{
          let asyncUpdate = async()=>{
            this.props.deleteComment(id)
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
          
            {this.props.popUp.page != "BOCommentEdit" ? null 
            :
            <BackOfficeEditComment></BackOfficeEditComment>
            }
 {this.props.popUp.page != "deleteComment" ? null
            :
<div className={'modal is-active'}>
  <div className="modal-background" onClick={()=>{this.props.unsetPopUp()}}></div>
  <div className="modal-card">
    <header className="modal-card-head">
      <p className="modal-card-title">Delete Post</p>
      <button className="delete" aria-label="close" onClick={()=>{this.props.unsetPopUp()}}></button>
    </header>
    <section className="modal-card-body">
        <p>Are you sure to delete this comment ?</p>
    </section>
    <footer className="modal-card-foot">
      <button className="button is-danger" onClick={()=>{this.deletePost(this.props.popUp.id);this.props.unsetPopUp()}}>{formatMessage({id: "backoffice.general.delete"})}</button>
      <button className="button" onClick={()=>{this.props.unsetPopUp()}}>{formatMessage({id: "backoffice.general.cancel"})}</button>
    </footer>
  </div>
</div>}
 

            <div className="columns">
            <div className="column is-one-quarter"></div>
            <div className="column is-half"  style={{margin: "auto"}}>
            <h1 style={{textAlign: "center",fontWeight: "bold",fontSize: "30px",marginBottom:"10px"}}>Manage Comment</h1>
           
            <div className="columns">
            <div className="column is-one-quarter">
            <button className="button is-danger" onClick={event =>  this.props.history.goBack()}>⬅</button>
            </div>
            <div className="column is-half" style={{textAlign: "center"}}>

            </div>
            <div className="column is-one-quarter">

            </div>
            </div>

            <input className="input" type="text" placeholder={formatMessage({id: "backoffice.general.search"})} value={this.state.searchItem} onChange={this.handleChangeSearch} />

        
            <table style={{width: "100%"}} className="table">
  <thead>
    <tr style={{textAlign:"center"}}>  
        <th >Id</th>
        <th ><FormattedMessage id="backoffice.menu2.comment.description"/></th>
        <th >Action</th>
    </tr>
  </thead>

  <tbody>
  
    {((this.state.data !== null )&& (this.state.data !== ""))?
            this.state.data.slice(0+(this.state.actualPage*this.state.elementsByPage),5+(this.state.actualPage*this.state.elementsByPage)).map((val,index) =>
            <tr key={val.comment_id}>
            <th style={{height:50,width:30}}>{val.comment_id}</th>
            <td style={{height:50,width:250}} >{val.description.length>10 ? val.description.substring(0,10)+"...": val.description}</td>
            <td style={{height:50,width:200}} ><p><button style={{marginRight:"10px"}} className="button is-info" onClick={()=>{this.props.setPopUp("BOCommentEdit",{comment_id:val.comment_id,post_id: this.state.post_id})}}><FontAwesomeIcon icon="edit" /></button><button className="button is-danger" onClick={()=>{this.props.setPopUp("deleteComment",val.comment_id)}}><FontAwesomeIcon icon="trash" /></button></p></td>
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
    comment: state.comment,
    popUp: state.popUp
  }
}

const mapDispatchToProps = (dispatch,own) => bindActionCreators({
  fetchCommentsByPostId: ()=> fetchCommentsByPostId(own.match.params.id),
  setPopUp,
  unsetPopUp,
  addComments,
  deleteComment

  
}, dispatch)
 
export default connect(mapStateToProps, mapDispatchToProps)(BackOfficeShowUserComments);



