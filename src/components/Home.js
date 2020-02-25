import React, { Component } from "react";
import { connect } from "react-redux";

class Home extends Component {

  render() {
    return (
      <div>
        <h2>HELLO</h2>
    <h1>Counter {this.props.counter}</h1>

      </div>
    );
  }
}

const mapStateToProps = (state) =>{
  return{
    counter : state.counter
  }
}




 
export default connect(mapStateToProps,null)(Home);