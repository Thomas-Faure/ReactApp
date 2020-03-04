


import React, { Component } from "react";
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
        <div>
                {this.state.alreadyReported === true ? <button onClick={this.report}>Report<span role="img" aria-label="validate">✅</span></button> : <button onClick={this.report}>Report</button>}
                
                <p>id comment :{this.state.comment.comment_id}</p>
                <p>description :{this.state.comment.description}</p>
                <p>category :{this.state.comment.comment_category}</p>
                <p>Author:({this.state.comment.user_id}){this.state.comment.username}</p>
                <p>Report :{this.state.comment.report}</p>
                <p>-------------</p>
            </div>
    );
  }
}
 
export default CommentModel;