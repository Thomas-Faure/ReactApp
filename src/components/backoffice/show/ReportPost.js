import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import fetchPosts from '../../../fetch/fetchPosts'
import fetchPostCategories from "../../../fetch/fetchPostCategories";
import {setPopUp} from '../../../actions';
import axios from 'axios';
class BackOfficeShowReportPosts extends Component {

    constructor(props) {
        super(props)
        this.state = {
            action: "",
            searchItem: "",
            dataFixed : null,
            data: null,
            elementsByPage: 5,
            actualPage : 0,
            maxPage: 0,
            isOpen: false,
            idPostSelected: null
        }
        this.pushNextButton=this.pushNextButton.bind(this)
        this.pushPrevButton=this.pushPrevButton.bind(this)
        this.handleChangeSearch = this.handleChangeSearch.bind(this)
        this.delete= this.delete.bind(this)


      }

     
    componentDidMount(){
  
      this.getData()
    }
    getData(){
      const token = localStorage.token;
      const config = {
        headers: { Authorization: 'Bearer '+token }
      };
        axios.get('https://thomasfaure.fr/reportPost',config)
      .then(res => {
         
       this.setState({
            data: res.data,
            dataFixed:res.data,
            maxPage: Math.floor(res.data.length/this.state.elementsByPage)
          })
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
        var properties = ["post","nbReport","title"]
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

    delete(id){
      const token = localStorage.token;
        fetch('https://thomasfaure.fr/post/' + id+'/delete', {
          method: 'DELETE',
          headers: {
            'Authorization': 'Bearer ' + token
          }
          }).then(()=>{

            let asyncUpdate = async()=>{

              this.getData()
              this.search()
           
            
             }
             asyncUpdate()

          })
       
        
        

    }
    validate(id){
        const token = localStorage.token;
          fetch('https://thomasfaure.fr/post/' + id+'/validate', {
            method: 'PUT',
            headers: {
              'Authorization': 'Bearer ' + token
            }
            }).then(()=>{
  
              let asyncUpdate = async()=>{
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
      <p className="modal-card-title">{this.state.action =="validate" ? "Validate" : "UnValidate"}</p>
      <button className="delete" aria-label="close" onClick={()=>{this.setState({isOpen:false})}}></button>
    </header>
    <section className="modal-card-body">
    {this.state.action =="validate" ?
     <p>Are you sure to validate this post ?</p>
      :
      <p>Are you sure to unvalidate this post ?</p>
      }
     
    </section>
    <footer className="modal-card-foot">
    {this.state.action =="validate" ?
      <button className="button is-danger" onClick={()=>{this.validate(this.state.idPostSelected);this.setState({isOpen:false,idPostSelected:null,action:""})}}>Validate</button>
      :
      <button className="button is-danger" onClick={()=>{this.delete(this.state.idPostSelected);this.setState({isOpen:false,idPostSelected:null,action:""})}}>Delete</button>
    }
      <button className="button" onClick={()=>{this.setState({isOpen:false})}}>Cancel</button>
    </footer>
  </div>
</div>
 

            <div className="columns">
            <div className="column is-one-quarter"></div>
            <div className="column is-half"  style={{margin: "auto"}}>
            <h1 style={{textAlign: "center",fontWeight: "bold",fontSize: "30px",marginBottom:"10px"}}>Manage Posts Report</h1>
           
            <div className="columns">
            <div className="column is-one-quarter">
            <button className="button is-danger" onClick={event =>  window.location.href='/#/backoffice'}>⬅</button>
            </div>
        
            <div className="column is-one-quarter">

            </div>
            </div>

            <input className="input" type="text" placeholder="Search" value={this.state.searchItem} onChange={this.handleChangeSearch} />

        
            <table style={{width: "100%"}} className="table">
  <thead>
    <tr style={{textAlign:"center"}}>
      
        <th >Id</th>
        <th >Count</th>
        <th >Title</th>
        <th >Action</th>

    </tr>
  </thead>

  <tbody>
  
    {(this.state.data !== null)?
            this.state.data.slice(0+(this.state.actualPage*this.state.elementsByPage),5+(this.state.actualPage*this.state.elementsByPage)).map((val,index) =>
            <tr key={val.post}>
            <th style={{height:50,width:30}}>{val.post}</th>
            <td style={{height:50,width:150}} >{val.nbReport}</td>
            <td style={{height:50,width:250}} >{val.title.length>30 ? val.title.substring(0,30)+"...": val.title}</td>
            <td style={{height:50,width:200}} ><p>
                <button className="button is-success" onClick={()=>{this.setState({isOpen:true,idPostSelected:val.post,action:"validate"})}}><FontAwesomeIcon icon="check" /></button>
                <button className="button is-danger" onClick={()=>{this.setState({isOpen:true,idPostSelected:val.post,action:"unvalidate"})}}><FontAwesomeIcon icon="trash" /></button>
                </p></td>
            </tr>
            )
            :
         null
          }

    
  </tbody>
</table>
<p style={{textAlign: "center",margin: "auto"}}><span style={{marginBottom:"10px"}}>The actual page is : {this.state.actualPage+1} / {this.state.maxPage+1}</span><br/>
<button className="button is-link" onClick={this.pushPrevButton}>Prev</button><button className="button is-link" onClick={this.pushNextButton}>Next</button>
<br/>
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


  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchPosts: fetchPosts,
  fetchPostCategories:fetchPostCategories,
  setPopUp,

  
}, dispatch)
 
export default connect(mapStateToProps, mapDispatchToProps)(BackOfficeShowReportPosts);
