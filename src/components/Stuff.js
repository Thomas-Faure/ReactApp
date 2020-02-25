import React, { Component } from "react";
import { connect } from "react-redux";
import {increment,decrement} from '../actions';
class Stuff extends Component {

  componentDidMount(){
    if(!this.props.isLogged){
        window.location.href = '/#/';
    } 
  }

  render() {
    return (
      <div>
        <h2>Mon Resultat</h2>
    <h3>Counter : {this.props.counter}</h3>
    <button onClick={()=> this.props.increment()}>+</button>
    <button onClick={()=> this.props.decrement()}>-</button>
      </div>
    );
  }

  
}

const mapStateToProps = (state) =>{
  return{
    counter : state.counter,
    isLogged: state.isLogged
  }
}

const mapDispatchToProps = ()=>{
  return{
    increment,
    decrement
  }
}

 
export default connect(mapStateToProps,mapDispatchToProps())(Stuff);