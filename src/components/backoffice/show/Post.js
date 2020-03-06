import React, { Component } from "react";
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
class BackOfficeShowPosts extends Component {

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
            IdpostSelected: null
        }
        this.pushNextButton=this.pushNextButton.bind(this)
        this.pushPrevButton=this.pushPrevButton.bind(this)
        this.handleChangeSearch = this.handleChangeSearch.bind(this)
        this.deletePost= this.deletePost.bind(this)


      }

    componentDidMount() {
        this.getData()
    }

    getData(){
        fetch("http://51.255.175.118:2000/post", {
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

            console.log(this.state.searchItem)
          
            var temp = this.state.dataFixed.filter((n)=>{
                var exist = false
                for(const property in n){
                  
                    if(n[property].toString().toLowerCase().includes(this.state.searchItem.toLowerCase())){
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

    deletePost(id){
        let postTempFixed = this.state.dataFixed.filter((n)=>{
            var exist = true
            if(n.post_id==id) exist=false
            return exist
        })
        console.log(postTempFixed)
        let postTemp = this.state.data.filter((n)=>{
            var exist = true
            if(n.post_id==id) exist=false
            return exist
        })
        console.log(postTemp)
        console.log(postTemp.length)
        let newMaxPage = Math.floor((postTemp.length-1)/this.state.elementsByPage)
        var newActualPage = this.state.actualPage
        if(newMaxPage < this.state.actualPage) {
            if(newActualPage != 0){
            newActualPage = newActualPage-1
            }
        }
       this.setState({
            data : postTemp,
            dataFixed: postTempFixed,
            maxPage: (Math.floor((postTemp.length-1)/this.state.elementsByPage)== -1 ? 0: Math.floor((postTemp.length-1)/this.state.elementsByPage)),
            actualPage : newActualPage

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
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Delete Post</p>
      <button class="delete" aria-label="close" onClick={()=>{this.setState({isOpen:false})}}></button>
    </header>
    <section class="modal-card-body">
        <p>Are you sure to delete this post ?</p>
    </section>
    <footer class="modal-card-foot">
      <button class="button is-danger" onClick={()=>{this.deletePost(this.state.IdpostSelected);this.setState({isOpen:false,IdpostSelected:null})}}>Delete</button>
      <button class="button" onClick={()=>{this.setState({isOpen:false})}}>Cancel</button>
    </footer>
  </div>
</div>
 

            <div class="columns">
            <div class="column is-one-quarter"></div>
            <div class="column is-half"  style={{margin: "auto"}}>
            <h1 style={{textAlign: "center",fontWeight: "bold",fontSize: "30px",marginBottom:"10px"}}>Manage Post</h1>
           
            <div class="columns">
            <div class="column is-one-quarter">
            <button class="button is-danger" onClick={event =>  window.location.href='/#/backoffice'}>⬅</button>
            </div>
            <div class="column is-half" style={{textAlign: "center"}}>
                <button class="button is-primary" style={{marginBottom: "10px"}}  onClick={event =>  window.location.href='/#/backoffice/posts/create'}>+</button>
            </div>
            <div class="column is-one-quarter">

            </div>
            </div>

            <input class="input" type="text" placeholder="Search" value={this.state.searchItem} onChange={this.handleChangeSearch} />

        
            <table style={{width: "100%"}} class="table">
  <thead>
    <tr style={{textAlign:"center"}}>
      
        <th >Id</th>
        <th >Title</th>
        <th >Description</th>
        <th >Action</th>

    </tr>
  </thead>

  <tbody>
  
    {((this.state.data !== null )&& (this.state.data !== ""))?
            this.state.data.slice(0+(this.state.actualPage*this.state.elementsByPage),5+(this.state.actualPage*this.state.elementsByPage)).map((val,index) =>
            <tr>
            <th style={{height:50,width:30}}>{val.post_id}</th>
            <td style={{height:50,width:150}} >{val.title}</td>
            <td style={{height:50,width:250}, { 'whiteSpace': 'unset' } } >{val.description.length>10 ? val.description.substring(0,10)+"...": val.description}</td>
            <td style={{height:50,width:200}} ><p><button style={{marginRight:"10px"}}class="button is-primary" onClick={event =>  window.location.href='/#/backoffice/posts/'+val.post_id+"/comments"}><FontAwesomeIcon icon="long-arrow-alt-right" /></button><button style={{marginRight:"10px"}} class="button is-info"><FontAwesomeIcon icon="edit" /></button><button class="button is-danger" onClick={()=>{console.log(this.state.isOpen);this.setState({isOpen:true,IdpostSelected:val.post_id})}}><FontAwesomeIcon icon="trash" /></button></p></td>
            </tr>
            )
            :
            <h1>Aucune publication trouvée</h1>
          }

    
  </tbody>
</table>
<p style={{textAlign: "center",margin: "auto"}}><p style={{marginBottom:"10px"}}>The actual page is : {this.state.actualPage} / {this.state.maxPage}</p><br/><button class="button is-link" onClick={this.pushPrevButton}>Prev</button><button class="button is-link" onClick={this.pushNextButton}>Next</button><br/>
</p>
            </div>
            <div class="column is-one-quarted"></div>
            </div>
            </div>
           
    );
  }
}
 
export default BackOfficeShowPosts;