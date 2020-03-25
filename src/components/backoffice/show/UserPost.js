import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import fetchPosts from '../../../fetch/fetchPosts'
import fetchPostCategories from "../../../fetch/fetchPostCategories";
import BackOfficeCreatePost from "../create/Post"
import BackOfficeEditPost from "../edit/Post"
import {setPopUp,unsetPopUp} from '../../../actions';
import {FormattedMessage,injectIntl} from 'react-intl';
class BackOfficeShowUserPosts extends Component {

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

      componentDidUpdate(prevProps) {
        if(this.props.post !== prevProps.post){
          let postsList = this.props.post.allIds.map(id => this.props.post.byId[id])
          postsList = postsList.filter(el => el.author == this.props.match.params.id)
          this.setState({
            data: postsList,
            dataFixed:postsList,
            maxPage: Math.floor(postsList.length/this.state.elementsByPage)
          })
      }

      }
     
    componentDidMount(){
      this.getData()
    }
    getData(){
      let postsList = this.props.post.allIds.map(id => this.props.post.byId[id])

      postsList = postsList.filter(el => el.author == this.props.match.params.id)
        this.setState({
          data: postsList,
          dataFixed:postsList,
          maxPage: Math.floor(postsList.length/this.state.elementsByPage)
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
      let postsList = this.props.post.allIds.map(id => this.props.post.byId[id])
      var temp = postsList.filter((n)=>{
        var properties = ["post_id","title","description"]
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
        fetch('https://thomasfaure.fr/post/' + id+'/delete', {
          method: 'DELETE',
          headers: {
            'Authorization': 'Bearer ' + token
          }
          }).then(()=>{

            let asyncUpdate = async()=>{
              await this.props.fetchPosts()
              await this.props.fetchPostCategories()
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
              {this.props.popUp.page != "BOPostCreate" ? null 
            :
            <BackOfficeCreatePost></BackOfficeCreatePost>
            }
            {this.props.popUp.page != "BOPostEdit" ? null 
            :
            <BackOfficeEditPost></BackOfficeEditPost>
            }
            {this.props.popUp.page != "deletePost" ? null
            :
                      <div className={'modal is-active'}>
            <div className="modal-background" onClick={()=>{this.props.unsetPopUp()}}></div>
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">Delete Post</p>
                <button className="delete" aria-label="close" onClick={()=>{this.props.unsetPopUp()}}></button>
              </header>
              <section className="modal-card-body">
                  <p>Are you sure to delete this post ?</p>
              </section>
              <footer className="modal-card-foot">
                <button className="button is-danger" onClick={()=>{this.deletePost(this.props.popUp.id);this.props.unsetPopUp()}}>Delete</button>
                <button className="button" onClick={()=>{this.props.unsetPopUp()}}>Cancel</button>
              </footer>
            </div>
          </div>
            }


 

            <div className="columns">
            <div className="column is-one-quarter"></div>
            <div className="column is-half"  style={{margin: "auto"}}>
            <h1 style={{textAlign: "center",fontWeight: "bold",fontSize: "30px",marginBottom:"10px"}}><FormattedMessage id="backoffice.menu1.posts.titlePage"/></h1>
           
            <div className="columns">
            <div className="column is-one-quarter">
            <button className="button is-danger" onClick={event =>  window.location.href='/#/backoffice/user/'+this.props.match.params.id}>⬅</button>
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
        <th ><FormattedMessage id="backoffice.menu1.posts.field.title"/></th>
        <th ><FormattedMessage id="backoffice.menu1.posts.field.description"/></th>
        <th ><FormattedMessage id="backoffice.menu1.posts.field.action"/></th>

    </tr>
  </thead>

  <tbody>
  
    {(this.state.data !== null)?
            this.state.data.slice(0+(this.state.actualPage*this.state.elementsByPage),5+(this.state.actualPage*this.state.elementsByPage)).map((val,index) =>
            <tr key={val.post_id}>
            <th style={{height:50,width:30}}>{val.post_id}</th>
            <td style={{height:50,width:150}} >{val.title}</td>
            <td style={{height:50,width:250}} >{val.description.length>30 ? val.description.substring(0,30)+"...": val.description}</td>
            <td style={{height:50,width:200}} ><p><button style={{marginRight:"10px"}} className="button is-info" onClick={event => this.props.setPopUp("BOPostEdit",val.post_id)}><FontAwesomeIcon icon="edit" /></button><button className="button is-danger" onClick={()=>{this.props.setPopUp("deletePost",val.post_id)}}><FontAwesomeIcon icon="trash" /></button></p></td>
            </tr>
            )
            :
         null
          }

    
  </tbody>
</table>
<p style={{textAlign: "center",margin: "auto"}}><span style={{marginBottom:"10px"}}><FormattedMessage id="backoffice.general.currentPage"/> {this.state.actualPage+1} / {this.state.maxPage+1}</span><br/><button className="button is-link" onClick={this.pushPrevButton}><FormattedMessage id="backoffice.general.prev"/></button><button className="button is-link" onClick={this.pushNextButton}><FormattedMessage id="backoffice.general.next"/></button><br/>
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
    pending: state.post.pending,
    popUp: state.popUp

  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchPosts: fetchPosts,
  fetchPostCategories:fetchPostCategories,
  setPopUp,
  unsetPopUp

  
}, dispatch)
 
export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(BackOfficeShowUserPosts));
