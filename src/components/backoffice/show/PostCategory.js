import React, { Component } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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

    getData(){
        fetch("http://51.255.175.118:2000/postCategory", {
      method: "GET"
    })
      .then(res => res.json())
      .then((data) => {
  

        this.setState({
          data: data,
          dataFixed: data,
          maxPage: Math.floor(data.length/this.state.elementsByPage)
        },)

      })

    }

    pushNextButton(){
        if(this.state.actualPage < this.state.maxPage){
        this.setState({
            actualPage : this.state.actualPage+1
           
        })
    }

    }
    handleChangeSearch(event){
        this.setState({searchItem: event.target.value},()=>{

            
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
                maxPage: Math.floor(temp.length/this.state.elementsByPage)})
        

                 
          })


    }

    deletePostCategory(id){
        let postTempFixed = this.state.dataFixed.filter((n)=>{
            var exist = true
            if(n.post_category_id===id) exist=false
            return exist
        })
    
        let postTemp = this.state.data.filter((n)=>{
            var exist = true
            if(n.post_category_id===id) exist=false
            return exist
        })
  
        let newMaxPage = Math.floor((postTemp.length-1)/this.state.elementsByPage)
        var newActualPage = this.state.actualPage
        if(newMaxPage < this.state.actualPage) {
            if(newActualPage !== 0){
            newActualPage = newActualPage-1
            }
        }
       this.setState({
            data : postTemp,
            dataFixed: postTempFixed,
            maxPage: (Math.floor((postTemp.length-1)/this.state.elementsByPage)=== -1 ? 0: Math.floor((postTemp.length-1)/this.state.elementsByPage)),
            actualPage : newActualPage

        })
        fetch('http://51.255.175.118:2000/postCategory/' + id+'/delete', {
        method: 'DELETE',
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
      <p className="modal-card-title">Delete Post Category</p>
      <button className="delete" aria-label="close" onClick={()=>{this.setState({isOpen:false})}}></button>
    </header>
    <section className="modal-card-body">
        <p>Are you sure to delete this post category ?</p>
    </section>
    <footer className="modal-card-foot">
      <button className="button is-danger" onClick={()=>{this.deletePostCategory(this.state.IdpostCategorySelected);this.setState({isOpen:false,IdpostCategorySelected:null})}}>Delete</button>
      <button className="button" onClick={()=>{this.setState({isOpen:false})}}>Cancel</button>
    </footer>
  </div>
</div>
 

            <div className="columns">
            <div className="column is-one-quarter"></div>
            <div className="column is-half"  style={{margin: "auto"}}>
            <h1 style={{textAlign: "center",fontWeight: "bold",fontSize: "30px",marginBottom:"10px"}}>Manage Post Category</h1>
           
            <div className="columns">
            <div className="column is-one-quarter">
            <button className="button is-danger" onClick={event =>  window.location.href='/#/backoffice'}>⬅</button>
            </div>
            <div className="column is-half" style={{textAlign: "center"}}>
                <button className="button is-primary" style={{marginBottom: "10px"}}  onClick={event =>  window.location.href='/#/backoffice/postCategories/create'}>+</button>
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
        <th >Couleur</th>
        <th >Action</th>

    </tr>
  </thead>

  <tbody>
  
    {((this.state.data !== null )&& (this.state.data !== ""))?
            this.state.data.slice(0+(this.state.actualPage*this.state.elementsByPage),5+(this.state.actualPage*this.state.elementsByPage)).map((val,index) =>
            <tr key={val.post_category_id}>
            <th style={{height:50,width:30}}>{val.post_category_id}</th>
            <td style={{height:50,width:150}} >{val.description}</td>
            <td style={{height:50,width:150}} >{val.couleur}</td>
            <td style={{height:50,width:200}} ><p><button style={{marginRight:"10px"}} className="button is-info" onClick={event =>  window.location.href='/#/backoffice/postCategories/'+val.post_category_id+"/edit"}><FontAwesomeIcon icon="edit" /></button><button className="button is-danger" onClick={()=>{this.setState({isOpen:true,IdpostCategorySelected:val.post_category_id})}}><FontAwesomeIcon icon="trash" /></button></p></td>
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
 
export default BackOfficeShowPostCategories;