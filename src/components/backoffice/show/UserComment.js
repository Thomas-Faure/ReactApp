import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import fetchCommentsByPostId from '../../../fetch/fetchComments'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import BackOfficeEditComment from "../edit/Comment"
import axios from 'axios'

import {setPopUp,unsetPopUp} from '../../../actions';
class BackOfficeShowUserComments extends Component {

    constructor(props) {
        super(props)
        this.state = {
            post_id : this.props.match.params.id,
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

    async componentDidMount() {
      const token = localStorage.token;
      const config = {
        headers: { Authorization: 'Bearer '+token }
      };

        const res = await axios.get("https://thomasfaure.fr/comment/byUser",config)
        this.getData(res.data)
    }
    getData(data){

        this.setState({
          data: data,
          dataFixed: data,
          maxPage: Math.floor(data.length/this.state.elementsByPage)
        })
    }
    pushNextButton(){
        if(this.state.actualPage < this.state.maxPage){
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
            await this.props.fetchCommentsByPostId()
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
      <button className="button is-danger" onClick={()=>{this.deletePost(this.props.popUp.id);this.props.unsetPopUp()}}>Delete</button>
      <button className="button" onClick={()=>{this.props.unsetPopUp()}}>Cancel</button>
    </footer>
  </div>
</div>}
 

            <div className="columns">
            <div className="column is-one-quarter"></div>
            <div className="column is-half"  style={{margin: "auto"}}>
            <h1 style={{textAlign: "center",fontWeight: "bold",fontSize: "30px",marginBottom:"10px"}}>Manage Comment</h1>
           
            <div className="columns">
            <div className="column is-one-quarter">
            <button className="button is-danger" onClick={event =>  window.location.href='/#/backoffice/user/'+this.props.match.params.id}>⬅</button>
            </div>
            <div className="column is-half" style={{textAlign: "center"}}>

            </div>
            <div className="column is-one-quarter">

            </div>
            </div>

            <input className="input" type="text" placeholder="Search" value={this.state.searchItem} onChange={this.handleChangeSearch} />

        
            <table style={{width: "100%"}} className="table">
  <thead>
    <tr style={{textAlign:"center"}}>  
        <th >Id</th>
        <th >Description</th>
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
<p style={{textAlign: "center",margin: "auto"}}><span style={{marginBottom:"10px"}}>The actual page is : {this.state.actualPage+1} / {this.state.maxPage+1}</span><br/><button className="button is-link" onClick={this.pushPrevButton}>Prev</button><button className="button is-link" onClick={this.pushNextButton}>Next</button><br/>
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
  unsetPopUp
  
}, dispatch)
 
export default connect(mapStateToProps, mapDispatchToProps)(BackOfficeShowUserComments);



