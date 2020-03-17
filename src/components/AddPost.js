import React, { Component } from "react";
import { connect } from "react-redux";
import { unsetPopUp } from '../actions';
import { bindActionCreators } from 'redux';
import fetchPosts from '../fetch/fetchPosts'
import fetchPostCategories from '../fetch/fetchPostCategories'
class AddPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      category: this.props.categoriePost.categories[0].post_category_id,
      title: "",
      description: ""
    }
    this.fileInput = React.createRef();
    this.handleChangeTitle = this.handleChangeTitle.bind(this)
    this.handleChangeDescription = this.handleChangeDescription.bind(this)
    this.handleChangeCategory = this.handleChangeCategory.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.send = this.send.bind(this)
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
    var extension = ""
    var data = ""
    if (file != undefined) {
      var re = /(?:\.([^.]+))?$/;
      var extension = re.exec(this.fileInput.current.files[0].name)[1];
      var data = await toBase64(file)
    }
    await this.send(data, extension)
    event.preventDefault();
  }
  send(data, extension) {
    const token = localStorage.token;
    fetch("https://thomasfaure.fr/post/create", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ title: this.state.title, description: this.state.description, category: this.state.category, data: data, ext: extension })
    })
      .then(res => res.json())
      .then((data) => {
        this.props.unsetPopUp()
        this.props.fetchPosts()
        this.props.fetchPostCategories()
      })
  }
  render() {
    return (

      <div className='modal is-active animated  fadeIn'>
        <div className="modal-background" onClick={() => { this.props.unsetPopUp() }}></div>
        <div className="modal-card" >
          <header className="modal-card-head">
            <p className="modal-card-title">AddPost</p>
            <button className="delete" aria-label="close" onClick={() => { this.props.unsetPopUp() }}></button>
          </header>
          <section className="modal-card-body">
            <section className=" is-fullheight" style={{ backgroundColor: "#BBDCF2", borderRadius: "5px" }}>
              {this.props.isLogged ?

                <div className="">
                  <div className="container has-text-centered">
                    <div className="column">
                      <h3 className="title has-text-black">Add a post</h3>
                      <hr className="login-hr" />
                      <p className="subtitle has-text-black"></p>
                      <form onSubmit={this.handleSubmit}>
                        <div className="field">
                          <div className="control">
                            <label className="title">Post title: </label>
                            <input className="input " type="text" placeholder="Title" value={this.state.title} onChange={this.handleChangeTitle} />
                          </div>
                        </div>
                        <div className="field">
                          <div className="control">
                            <textarea className="input textarea" type="text" placeholder="Description" value={this.state.description} onChange={this.handleChangeDescription} />
                          </div>
                        </div>
                        <div className="flex-space">
                          <select value={this.state.category} onChange={this.handleChangeCategory}>
                            {(this.props.categoriePost.categories.length !== 0) ?
                              this.props.categoriePost.categories.map((val, index) =>
                                <option key={val.post_category_id} value={val.post_category_id}>{val.description}</option>
                              )
                              :
                              null
                            }
                          </select>
                          <input type="file" ref={this.fileInput} />
                          <input className="button is-link" type="submit" value="submit"></input>
                        </div>
                      </form>
                    </div>
                  </div>
                </div> :
                <h2 className="title has-text-black">You need to be connected to add a post</h2>
              }
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
    categoriePost: state.categoriePost,
    isLogged: state.isLogged

  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchPosts: fetchPosts,
  fetchPostCategories: fetchPostCategories,
  unsetPopUp

}, dispatch)



export default connect(mapStateToProps, mapDispatchToProps)(AddPost);