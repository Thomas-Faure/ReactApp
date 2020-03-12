import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import PostModel from './Model/PostModel'
import PostDetails from './PostDetails'

class PostsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: this.props.post.posts,
      list: this.props.post.posts,
      mainfilter: null,
      category: null,
      cat: null,
      search: null,
      commentIsOpen: false,
      currentPostId: null
    }
 
    this.handleChange = this.handleChange.bind(this);
    this.mainfilter = this.mainfilter.bind(this);
    this.search = this.search.bind(this)
    this.filtreDate = this.filtreDate.bind(this);
    this.categoryFilter = this.categoryFilter.bind(this);
  }

  


  seePost(id) {
    window.location.href = '/#/post/' + id;
  }

  mainfilter(e) {
    this.filtreDate(e.target.value)
    this.setState({
      mainfilter: e.target.value
    })
  }
  async categoryFilter(e) {
    await this.setState({
      cat: e.target.value
    })
    await this.search()
    this.filtreDate(this.state.mainfilter)
  }


  filtreDate(value) {
    let newList = [];
    newList = this.state.posts
    switch (value) {
      case "populaire":
      
        newList.sort((a, b) => b.like - a.like)
        
        break;
      case "commente":
        newList.sort((a, b) => b.comment - a.comment)
        
        break;
      default:
        newList.sort((a, b) => new Date(b.date) - new Date(a.date))
        
        break;
    }
    this.setState({
      posts: newList
    })

  }

  async search() {
    let currentList = this.state.list
    let newList = [];
    // If the search bar isn't empty
    if ((this.state.search !== "") && (this.state.search !== null)) {
      if ((this.state.cat !== "") && (this.state.cat !== null)) {
        currentList = this.state.list.filter(item => {

          if (this.state.cat == item.post_category) {
            return item
          }
        });
      }
      // Use .filter() to determine which items should be displayed
      // based on the search terms
      newList = currentList.filter(item => {
        const lc = item.title.toLowerCase();
        const filter = this.state.search.toLowerCase();
        return lc.includes(filter)
      });
      this.setState({
        posts: newList
      })
    } else {
      if ((this.state.cat !== "") && (this.state.cat !== null)) {
        currentList = this.state.list.filter(item => {
          if (this.state.cat == item.post_category) {
            return item
          }
        })
        this.setState({
          posts: currentList
        })
      }
      else {
        this.setState({
          posts: this.state.list
        })
      }

    }

  }

  async handleChange(e) {
    await this.setState({
      search: e.target.value
    })
    await this.search()
    this.filtreDate(this.state.mainfilter)
  }

  render() {
 
    return (
      
      <div className="columns ">
        {this.state.currentPostId == null ? null :
        <div className={(!this.state.commentIsOpen) ? 'modal animated  fadeIn' : 'modal is-active animated  fadeIn'}>
  <div className="modal-background"></div>
  <div className="modal-card">
    <header className="modal-card-head">
      <p className="modal-card-title">Comments</p>
      <button className="delete" aria-label="close" onClick={()=>{this.setState({commentIsOpen:false,currentPostId:null})}}></button>
    </header>
    <section className="modal-card-body">
        <PostDetails key={this.state.currentPostId} post_id={this.state.currentPostId}></PostDetails>
    </section>
    <footer className="modal-card-foot">
      <button className="button" onClick={()=>{this.setState({commentIsOpen:false,currentPostId:null})}}>Close</button>
    </footer>
  </div>
</div>    
  }
        <div className="column is-7-desktop is-full-mobile is-offset-1">
          {((this.state.posts !== null )&& (this.state.posts !== ""))?
            this.state.posts.map((val,index) =>
            <div key={val.post_id}  style={{marginBottom:"10px"}}className=" animated  fadeIn" onClick={() => {this.setState({currentPostId: val.post_id,commentIsOpen:true})}}>
                  <PostModel key={val.post_id} post={val}/>
            </div>
            )
            :
            <h1>Aucune publication trouvée</h1>
          }

        </div>
        <div className="column is-3-desktop is-desktop filter">
          <img src="filter.png" alt="img" className="icon"></img>
          <input type="text" onChange={this.handleChange} className="input" placeholder="Search..." />
          <div className="filtre">
            <div className="mainfilter" onChange={this.mainfilter}>
              <div><label><input type="radio" name="time" value="recent" /> Plus recent</label></div>
              <div><label><input type="radio" name="time" value="populaire" />Plus populaire</label></div>
              <div><label><input type="radio" name="time" value="commente" />Plus commenté</label></div>
            </div>
            <div className="categoryfilter" onChange={this.categoryFilter}>
              <select id="category">
                <option value=""></option>
                {
                  this.props.categoryPost.categories != null ?
                    this.props.categoryPost.categories.map((val, index) =>
                      <option key={val.post_category_id} value={val.post_category_id}>{val.description}</option>
                    ) :
                    null
                }
              </select>
            </div>
          </div>
        </div>
      </div>

    );
  }
}


const mapStateToProps = state => {
  return {
    post: state.post,
    categoryPost: state.categoriePost,
    error: state.post.error,
    posts: state.post.posts,
    pending: state.post.pending

  }
}


const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)



export default connect(mapStateToProps, mapDispatchToProps)(PostsList);

