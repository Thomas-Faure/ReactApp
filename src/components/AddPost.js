import React, { Component } from "react";
import { connect } from "react-redux";
import {unsetPopUp } from '../actions';
import { bindActionCreators } from 'redux';

class AddPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      category : this.props.categoriePost.categories[0].post_category_id,
        title : "",
        description: ""
    }
    this.fileInput = React.createRef();
    this.handleChangeTitle = this.handleChangeTitle.bind(this)
    this.handleChangeDescription = this.handleChangeDescription.bind(this)
    this.handleChangeCategory= this.handleChangeCategory.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.send= this.send.bind(this)
  }

  componentDidMount() {
    
  }

  handleChangeTitle(event) {
    this.setState({ title: event.target.value })
  }
  handleChangeDescription(event) {
    this.setState({ description: event.target.value })
  }
  handleChangeCategory(event) {
    this.setState({ category: event.target.value })
  }

  

  async handleSubmit(event) {
    const toBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
  });
    const file = this.fileInput.current.files[0]
    if(file != undefined){
    var re = /(?:\.([^.]+))?$/;
    var extension = re.exec(this.fileInput.current.files[0].name)[1]; 
    
    var data = await toBase64(file)
  
    }else{
      var extension = ""
      var data = ""
    }
    console.log(extension)
    console.log(data)
    this.send(data,extension)
    event.preventDefault();
  }

  send(data,extension){
    const token = localStorage.token;
    fetch("http://51.255.175.118:2000/post/create", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ title: this.state.title,description: this.state.description,category: this.state.category,data: data, ext: extension })
    })
      .then(res => res.json())
      .then((data) => {
        this.props.unsetPopUp()
        
      })

  }

  render() {
    return (


        <div className='modal is-active animated  fadeIn'>
  <div className="modal-background" onClick={()=>{this.props.unsetPopUp()}}></div>
  <div className="modal-card" >
    <header className="modal-card-head">
      <p className="modal-card-title">AddPost</p>
      <button className="delete" aria-label="close" onClick={()=>{this.props.unsetPopUp()}}></button>
    </header>
    <section className="modal-card-body">
    <section className=" is-fullheight" style={{backgroundColor: "#BBDCF2",borderRadius:"5px"}}>
        <div className="">
          <div className="container has-text-centered">
            <div className="column">
              <h3 className="title has-text-black"></h3>
              <hr className="login-hr" />
              <p className="subtitle has-text-black"></p>
              <div className="box">     
        </div>
                <form onSubmit={this.handleSubmit}>
                <div className="field">
                    <div className="control">
                      <input className="input is-large" type="text" placeholder="Title"  value={this.state.title} onChange={this.handleChangeTitle}/>
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                      <input className="input is-large" type="text" placeholder="Description"  value={this.state.description} onChange={this.handleChangeDescription}/>
                    </div>
                </div>
                <select value={this.state.category} onChange={this.handleChangeCategory}>
              {(this.props.categoriePost.categories.length !== 0 )?
            this.props.categoriePost.categories.map((val,index) =>
            <option key={val.post_category_id} value={val.post_category_id}>{val.description}</option>
            )
            :
         null
          }
              

          </select>
                  <input type="file" ref={this.fileInput} />
                  <input className="button is-link" type="submit" value="submit"></input>
                </form>
              </div>
           
          
          </div>
        </div>
      </section>
        
    </section>
    <footer className="modal-card-foot">
     
    </footer>
  </div>
  </div>
  

      
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categoriePost:state.categoriePost
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  unsetPopUp

}, dispatch)



export default connect(mapStateToProps, mapDispatchToProps)(AddPost);






