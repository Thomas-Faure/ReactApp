

import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import {updateCommentReport} from '../../actions'
class CommentModel extends Component {

    constructor(props){

        super(props)

        console.log(props)
        this.props.comment.report=0

        var color = this.props.categorieComment.categories.find(element => element.comment_category_id == this.props.comment.comment_category).color
        this.state = {
            comment : this.props.comment,
            alreadyReported: false,
            color: color

        }     
        this.report = this.report.bind(this) 
    }
    componentWillReceiveProps(nextProps) {
       this.setState({
           comment : nextProps.comment
       })
      }
  componentDidMount() {
      this.verifAlreadyCommented()

  }
  verifAlreadyCommented(){
    const token = localStorage.token;
    fetch("http://51.255.175.118:2000/reportcomment/"+this.state.comment.comment_id+"/byToken", {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }
      ).then(res => res.json())
      .then(res => {  
          if(res.length>0){
            this.setState({alreadyReported : true})
          }else{
            this.setState({alreadyReported : false})
          }
      })
  }
  report(){
    const token = localStorage.token;
    fetch("http://51.255.175.118:2000/reportcomment/create", {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Authorization': 'Bearer ' + token
       },
       body: JSON.stringify({ comment_id: this.state.comment.comment_id })
     }
     ).then(res => res.json())
     .then(res => {
         this.setState({alreadyReported : res.result})
         this.props.updateCommentReport(this.state.comment.comment_id,res.result)
     })
   }
  render() {
    console.log("my state")
  console.log(this.props.commentState.byId[this.state.comment.comment_id])
    return (
      <div className="card">
      <div className="card-content" style={{backgroundColor: this.state.color}}>
        <div className="media">
          <div className="media-left">
            <figure className="image is-48x48">
              <img src="https://i.pinimg.com/originals/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.png" alt="image48"/>
            </figure>
          </div>
          <div className="media-content">
          <p className="subtitle is-6"><strong>@{this.state.comment.username}</strong></p>
            <p className="title is-4">{this.state.comment.description}</p>       
          </div>
        </div>
        <footer className="card-footer" >
        <a href="" className="card-footer-item"  style={{color:"black"}}>Like</a>
        {this.props.commentState.byId[this.state.comment.comment_id].reported == true ?
         <a onClick={this.report} className="card-footer-item"  style={{color:"black"}}>Report✅</a>  
         :
         <a onClick={this.report} className="card-footer-item"  style={{color:"black"}}>Report</a>
         }
      </footer>
      </div>
    </div>);
  }
}


const mapStateToProps = state => {
  return {
    categorieComment: state.categorieComment,
    commentState : state.comment
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  updateCommentReport:updateCommentReport
  
}, dispatch)
 
export default connect(mapStateToProps, mapDispatchToProps)(CommentModel);
 
