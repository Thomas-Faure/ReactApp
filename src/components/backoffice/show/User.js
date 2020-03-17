import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import fetchUsers from '../../../fetch/fetchUsers'
import BackOfficeCreateUser from "../create/User"
import BackOfficeEditUser from "../edit/User"
import {setPopUp,unsetPopUp} from '../../../actions';

class BackOfficeShowUsers extends Component {

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
            IdUserSelected: null
        }
        this.pushNextButton=this.pushNextButton.bind(this)
        this.pushPrevButton=this.pushPrevButton.bind(this)
        this.handleChangeSearch = this.handleChangeSearch.bind(this)
        this.deleteUser= this.deleteUser.bind(this)


      }

      componentWillReceiveProps(newprops){
        this.getData()
      }

    componentDidMount() {
      this.props.fetchUsers().then(()=>{
        this.getData()
      })
       
    }

    getData(){

      let usersList = this.props.userList.allIds.map(id => this.props.userList.byId[id])
   
    
        this.setState({
          data: usersList,
          dataFixed: usersList,
          maxPage: Math.floor(usersList.length/this.state.elementsByPage)
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
        var properties = ["user_id","username","firstname"]
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
    deleteUser(id){
      const token = localStorage.token;
        fetch('http://51.255.175.118:2000/user/' + id+'/delete', {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
        }).then(()=>{
          let asyncUpdate = async()=>{
            await this.props.fetchUsers()
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
                            {this.props.popUp.page != "BOUserCreate" ? null 
            :
            <BackOfficeCreateUser></BackOfficeCreateUser>
            }
            {this.props.popUp.page != "BOUserEdit" ? null 
            :
            <BackOfficeEditUser></BackOfficeEditUser>
            }

{this.props.popUp.page != "deleteUser" ? null
            :
<div className={'modal is-active'}>
  <div className="modal-background" onClick={()=>{this.props.unsetPopUp()}}></div>
  <div className="modal-card">
    <header className="modal-card-head">
      <p className="modal-card-title">Delete User</p>
      <button className="delete" aria-label="close" onClick={()=>{this.props.unsetPopUp()}}></button>
    </header>
    <section className="modal-card-body">
        <p>Are you sure to delete this user ?</p>
    </section>
    <footer className="modal-card-foot">
      <button className="button is-danger" onClick={()=>{this.deleteUser(this.props.popUp.id);this.props.unsetPopUp()}}>Delete</button>
      <button className="button" onClick={()=>{this.props.unsetPopUp()}}>Cancel</button>
    </footer>
  </div>
</div>}
 

            <div className="columns">
            <div className="column is-one-quarter"></div>
            <div className="column is-half"  style={{margin: "auto"}}>
            <h1 style={{textAlign: "center",fontWeight: "bold",fontSize: "30px",marginBottom:"10px"}}>Manage User</h1>
           
            <div className="columns">
            <div className="column is-one-quarter">
            <button className="button is-danger" onClick={event =>  window.location.href='/#/backoffice'}>⬅</button>
            </div>
            <div className="column is-half" style={{textAlign: "center"}}>
                <button className="button is-primary" style={{marginBottom: "10px"}}  onClick={()=>{this.props.setPopUp("BOUserCreate")}}>+</button>
            </div>
            <div className="column is-one-quarter">

            </div>
            </div>

            <input className="input" type="text" placeholder="Search" value={this.state.searchItem} onChange={this.handleChangeSearch} />

        
            <table style={{width: "100%"}} className="table">
  <thead>
    <tr style={{textAlign:"center"}}>
      
        <th >Id</th>
        <th >Username</th>
        <th >Firstname</th>
        <th >Action</th>

    </tr>
  </thead>

  <tbody>
  
    {((this.state.data !== null )&& (this.state.data !== ""))?
            this.state.data.slice(0+(this.state.actualPage*this.state.elementsByPage),5+(this.state.actualPage*this.state.elementsByPage)).map((val,index) =>
            <tr key={val.user_id}>
            <th style={{height:50,width:30}}>{val.user_id}</th>
            <td style={{height:50,width:150}} >{val.username}</td>
            <td style={{height:50,width:250}} >{val.firstname.length>10 ? val.firstname.substring(0,10)+"...": val.firstname}</td>
            <td style={{height:50,width:200}} ><p><button style={{marginRight:"10px"}} className="button is-info" onClick={()=>{this.props.setPopUp("BOUserEdit",val.user_id)}}><FontAwesomeIcon icon="edit" /></button><button className="button is-danger" onClick={()=>{this.props.setPopUp("deleteUser",val.user_id)}}><FontAwesomeIcon icon="trash" /></button></p></td>
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
    userList: state.userList,
    popUp: state.popUp


  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchUsers: fetchUsers,
  setPopUp,
  unsetPopUp

  
}, dispatch)
 
export default connect(mapStateToProps, mapDispatchToProps)(BackOfficeShowUsers);
