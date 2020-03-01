import React, { Component } from "react";
import { connect } from "react-redux";

class Home extends Component {

  render() {
    
    return (
      
      <div>
        <h2>HELLO</h2>
        <h1>Counter {this.props.counter}</h1>
    {this.props.user != null ?<h1>Welcome {this.props.user.username}</h1> : null}
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
  return{
    counter : state.counter,
    user: state.userInfo
    }
}

 
export default connect(mapStateToProps,null)(Home);