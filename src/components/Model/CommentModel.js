

import React, { Component } from "react";
import Moment from 'react-moment';
class CommentModel extends Component {

    constructor(props){
        super(props)

        this.props.comment.report=0
        this.state = {
            comment : this.props.comment,
            alreadyReported: false
         

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
      <div className="card">
      <div className="card-content">
        <div >
         

          <div className="media-content" style={{backgroundColor: this.state.comment.color}}>
            <div style={{backgroundColor:"white"}}  className="post_title">
              <h4 className="title is-4" id="post_title">{this.state.comment.description}</h4>
              <Moment interval={30000} fromNow>
                  {this.state.comment.date}
                </Moment >
             
            </div>
           
            <div className="infos">
              <p className="author">{this.state.comment.username}</p>
              {this.state.alreadyReported === true ? <button onClick={this.report}>Report<span role="img" aria-label="validate">✅</span></button> : <button onClick={this.report}>Report</button>}
            </div>
          </div>
         
        </div>

      </div>
    </div>

    );
  }
}
 
export default CommentModel;