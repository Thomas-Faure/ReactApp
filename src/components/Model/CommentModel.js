

import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

class CommentModel extends Component {

    constructor(props){
        super(props)

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
     })

   }



 
  render() {
    
    return (

      <div class="card">

      <div class="card-content" style={{backgroundColor: this.state.color}}>
        <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img src="https://i.pinimg.com/originals/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.png" alt="image48"/>
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-4">{this.state.comment.description}</p>
            <p class="subtitle is-6">@ {this.state.comment.username} </p>
          </div>
        </div>
        <footer class="card-footer" >
        <a href="" class="card-footer-item"  style={{color:"black"}}>Like</a>
        {this.state.alreadyReported === true ?
         <a onClick={this.report} class="card-footer-item"  style={{color:"black"}}>Report✅</a>
        
         :
         <a onClick={this.report} class="card-footer-item"  style={{color:"black"}}>Report</a>
         }

    
      </footer>
    
    
      </div>
    </div>


    );
  }
}


const mapStateToProps = state => {
  return {
    categorieComment: state.categorieComment,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  
}, dispatch)
 
export default connect(mapStateToProps, mapDispatchToProps)(CommentModel);
 
