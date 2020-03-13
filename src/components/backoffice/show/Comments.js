import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import fetchCommentsByPostId from '../../../fetch/fetchComments'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class BackOfficeShowComments extends Component {

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

    componentDidMount() {
      let asyncUpdate = async()=>{
        await this.props.fetchCommentsByPostId()
        this.getData()
       }
       asyncUpdate()

        this.getData()
    }

    getData(){

      
      var data = this.props.comment.comments.filter(element => element.post == this.state.post_id)
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
      fetch('http://51.255.175.118:2000/comment/' + id+'/delete', {
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

<div className={!this.state.isOpen ? 'modal' : 'modal is-active'}>
  <div className="modal-background"></div>
  <div className="modal-card">
    <header className="modal-card-head">
      <p className="modal-card-title">Delete Post</p>
      <button className="delete" aria-label="close" onClick={()=>{this.setState({isOpen:false})}}></button>
    </header>
    <section className="modal-card-body">
        <p>Are you sure to delete this comment ?</p>
    </section>
    <footer className="modal-card-foot">
      <button className="button is-danger" onClick={()=>{this.deletePost(this.state.IdcommentSelected);this.setState({isOpen:false,IdcommentSelected:null})}}>Delete</button>
      <button className="button" onClick={()=>{this.setState({isOpen:false})}}>Cancel</button>
    </footer>
  </div>
</div>
 

            <div className="columns">
            <div className="column is-one-quarter"></div>
            <div className="column is-half"  style={{margin: "auto"}}>
            <h1 style={{textAlign: "center",fontWeight: "bold",fontSize: "30px",marginBottom:"10px"}}>Manage Comment</h1>
           
            <div className="columns">
            <div className="column is-one-quarter">
            <button className="button is-danger" onClick={event =>  window.location.href='/#/backoffice/posts'}>⬅</button>
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
            <td style={{height:50,width:200}} ><p><button style={{marginRight:"10px"}} className="button is-info" onClick={event =>  window.location.href='/#/backoffice/posts/'+this.state.post_id+'/comments/'+val.comment_id+"/edit"}><FontAwesomeIcon icon="edit" /></button><button className="button is-danger" onClick={()=>{this.setState({isOpen:true,IdcommentSelected:val.comment_id})}}><FontAwesomeIcon icon="trash" /></button></p></td>
            </tr>
            )
            :
         null
          }

    
  </tbody>
</table>
<p style={{textAlign: "center",margin: "auto"}}><span style={{marginBottom:"10px"}}>The actual page is : {this.state.actualPage} / {this.state.maxPage}</span><br/><button className="button is-link" onClick={this.pushPrevButton}>Prev</button><button className="button is-link" onClick={this.pushNextButton}>Next</button><br/>
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
    comment: state.comment
  }
}

const mapDispatchToProps = (dispatch,own) => bindActionCreators({
  fetchCommentsByPostId: ()=> fetchCommentsByPostId(own.match.params.id)
  
}, dispatch)
 
export default connect(mapStateToProps, mapDispatchToProps)(BackOfficeShowComments);



