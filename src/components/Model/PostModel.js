import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
class PostModel extends Component {

    constructor(props){
        super(props)
      
        this.props.post.report=0
        this.state = {
            post : this.props.post,
            bestAnswer: this.props.bestAnswer.answers.find(element=>element.post==this.props.post.post_id)

        }     

    }
    
    UNSAFE_componentWillReceiveProps(nextProps) {
       this.setState({
           post : nextProps.post
       })
      }
 
    
    seePost(id) {
        window.location.href = '/#/post/' + id;
      }
 
  render() {

    return (
        
        
        <div className="">
          <div >
            <div className="media-content postModel" style={{backgroundColor: '#D7D9D7',width:"95%"}}>
            <div className="infos">
             <p className="author"><FontAwesomeIcon icon="user" /><strong>@{this.state.post.username}</strong></p>
           </div>
              <div className="post_title" style={{backgroundColor: '#BBDCF2',borderRadius: "5px"}}>
                
                <h4 className="title is-4 animated  fadeIn" id="post_title">{this.state.post.title}</h4>
                <h4 className="title is-4 animated  fadeIn delay-1s" id="post_id">#{this.state.post.post_id}</h4>
              </div>
              <div className="description animated  fadeIn delay-1s">
                <p>{this.state.post.description}</p>
                {this.state.post.url_image.length > 0 ?
              
                 <img style={{imageOrientation:"from-image"}}src={'http://51.255.175.118:2000/'+this.state.post.url_image}   />
            
                 :
                  null}
               
              </div>
             
            </div>
            <div className="rating" style={{backgroundColor: '#BBDCF2',width:"95%"}}>
              <div className="liked"><p className="infosRate">{this.state.post.like}</p><img src="ear.png" alt= "img1"className="icon"></img></div>
              <div className="liked"><p className="infosRate">{this.state.post.comment}</p><img src="comment.png" alt="img2" className="icon"></img></div> 
            </div>
            {this.state.bestAnswer == null ? null : 
            <div className="bestanswer" style={{backgroundColor: '#EBEBEC'}}>
              <p ><strong style={{color: "yellow"}}><FontAwesomeIcon icon="star" /></strong>Best:<br/>{this.state.bestAnswer.description}</p>
            </div>
  }
          </div>

        </div>
      
    );
  }
}

const mapStateToProps = (state) => {
  return {
    comment : state.comment,
    user: state.user,
    bestAnswer: state.bestAnswer
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)



export default connect(mapStateToProps, mapDispatchToProps)(PostModel);
