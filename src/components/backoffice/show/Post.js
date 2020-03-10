import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
    componentWillReceiveProps(nextProps){
        if(this.props.post.posts.length != 0){
          this.getData()
        }
    }
    componentDidMount(){
      this.getData()
    }
    getData(){
      var data = this.props.post.posts
        this.setState({
          data: data,
          dataFixed:data,
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
    handleChangeSearch(event){
        this.setState({searchItem: event.target.value},()=>{

            
            var temp = this.props.posts.filter((n)=>{
                var properties = ["post_id","title","description"]
                var exist = false
         
                for(var i = 0;i<properties.length;++i){
                  console.log(n[properties[i]])
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

    deletePost(id){
        let postTempFixed = this.state.dataFixed.filter((n)=>{
            var exist = true
            if(n.post_id===id) exist=false
            return exist
        })
    
        let postTemp = this.state.data.filter((n)=>{
            var exist = true
            if(n.post_id===id) exist=false
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
        fetch('http://51.255.175.118:2000/post/' + id+'/delete', {
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
      <p className="modal-card-title">Delete Post</p>
      <button className="delete" aria-label="close" onClick={()=>{this.setState({isOpen:false})}}></button>
    </header>
    <section className="modal-card-body">
        <p>Are you sure to delete this post ?</p>
    </section>
    <footer className="modal-card-foot">
      <button className="button is-danger" onClick={()=>{this.deletePost(this.state.IdpostSelected);this.setState({isOpen:false,IdpostSelected:null})}}>Delete</button>
      <button className="button" onClick={()=>{this.setState({isOpen:false})}}>Cancel</button>
    </footer>
  </div>
</div>
 

            <div className="columns">
            <div className="column is-one-quarter"></div>
            <div className="column is-half"  style={{margin: "auto"}}>
            <h1 style={{textAlign: "center",fontWeight: "bold",fontSize: "30px",marginBottom:"10px"}}>Manage Post</h1>
           
            <div className="columns">
            <div className="column is-one-quarter">
            <button className="button is-danger" onClick={event =>  window.location.href='/#/backoffice'}>⬅</button>
            </div>
            <div className="column is-half" style={{textAlign: "center"}}>
                <button className="button is-primary" style={{marginBottom: "10px"}}  onClick={event =>  window.location.href='/#/backoffice/posts/create'}>+</button>
            </div>
            <div className="column is-one-quarter">

            </div>
            </div>

            <input className="input" type="text" placeholder="Search" value={this.state.searchItem} onChange={this.handleChangeSearch} />

        
            <table style={{width: "100%"}} className="table">
  <thead>
    <tr style={{textAlign:"center"}}>
      
        <th >Id</th>
        <th >Title</th>
        <th >Description</th>
        <th >Action</th>

    </tr>
  </thead>

  <tbody>
  
    {(this.state.data !=null)?
            this.state.data.slice(0+(this.state.actualPage*this.state.elementsByPage),5+(this.state.actualPage*this.state.elementsByPage)).map((val,index) =>
            <tr key={val.post_id}>
            <th style={{height:50,width:30}}>{val.post_id}</th>
            <td style={{height:50,width:150}} >{val.title}</td>
            <td style={{height:50,width:250}} >{val.description.length>10 ? val.description.substring(0,10)+"...": val.description}</td>
            <td style={{height:50,width:200}} ><p><button style={{marginRight:"10px"}}className="button is-primary" onClick={event =>  window.location.href='/#/backoffice/posts/'+val.post_id+"/comments"}><FontAwesomeIcon icon="long-arrow-alt-right" /></button><button style={{marginRight:"10px"}} className="button is-info" onClick={event =>  window.location.href='/#/backoffice/posts/'+val.post_id+"/edit"}><FontAwesomeIcon icon="edit" /></button><button className="button is-danger" onClick={()=>{this.setState({isOpen:true,IdpostSelected:val.post_id})}}><FontAwesomeIcon icon="trash" /></button></p></td>
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
    post: state.post,
    error: state.post.error,
    posts: state.post.posts,
    pending: state.post.pending

  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  
}, dispatch)
 
export default connect(mapStateToProps, mapDispatchToProps)(BackOfficeShowPosts);
