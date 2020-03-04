import React, { Component } from "react";
import Moment from 'react-moment';
class Posts extends Component {

  constructor(props) {
    super(props)
    this.state = {
      posts: null,
      list: null,
      mainfilter: null,
      category: null,
      cat: null,
      search: null
    }
    this.getPosts = this.getPosts.bind(this)
    this.getPostsCategory = this.getPostsCategory.bind(this)
    this.handleChange = this.handleChange.bind(this);
    this.mainfilter = this.mainfilter.bind(this);
    this.search = this.search.bind(this)
    this.filtreDate = this.filtreDate.bind(this);
    this.categoryFilter = this.categoryFilter.bind(this);
  }

  componentDidMount() {
    this.getPosts();
    this.getPostsCategory();
  }

  getPosts() {
    fetch("http://51.255.175.118:2000/post", {
      method: "GET"
    })
      .then(res => res.json())
      .then((data) => {
        this.setState({
          posts: data,
          list: data
        })

      })
  }

  getPostsCategory() {
    fetch("http://51.255.175.118:2000/postCategory", {
      method: "GET"
    })
      .then(res => res.json())
      .then((data) => {
        this.setState({
          category: data,
        })
      })
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
    switch (value) {
      case "populaire":
        newList = this.state.posts
        newList.sort((a, b) => b.like - a.like)
        this.setState({
          posts: newList
        })
        break;
      case "commente":
        newList = this.state.posts
        newList.sort((a, b) => b.comment - a.comment)
        this.setState({
          posts: newList
        })
        break;
      default:
        newList = this.state.posts
        newList.sort((a, b) => new Date(b.date) - new Date(a.date))
        this.setState({
          posts: newList
        })
        break;
    }
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
      <div class="columns ">
        <div class="column is-7-desktop is-full-mobile is-offset-1">
          {((this.state.posts != null )&& (this.state.posts != ""))?
            this.state.posts.map((val, index) =>
              <div key="{index}" class="card" onClick={() => { this.seePost(val.post_id) }}>
                <div class="card-content">
                  <div >
                    {(val.url_image !== "") && (val.url_image !== null) ?
                      <div class="media-left">
                        <figure class="image is-48x48">
                          <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
                        </figure>
                      </div> : null}

                    <div class="media-content">
                      <div class="post_title">
                        <h4 class="title is-4" id="post_title">{val.title}</h4>
                        <h4 class="title is-4" id="post_id">#{val.post_id}</h4>
                      </div>
                      <div class="description">
                        <p>{val.description}</p>
                      </div>
                      <div class="infos">
                        <Moment interval={30000} fromNow>
                          {val.date}
                        </Moment >
                        <p class="author">{val.username}</p>
                      </div>
                    </div>
                    <div class="rating">
                      <div class="liked"><p class="infosRate">{val.like}</p><img src="ear.png" class="icon"></img></div>
                      <div class="liked"><p class="infosRate">{val.comment}</p><img src="comment.png" class="icon"></img></div>
                      <img src="warning.png" class="icon"></img>
                    </div>
                    <div class="bestanswer">
                      <p>Best answer</p>
                    </div>
                  </div>

                </div>
              </div>
            )
            :
            <h1>Aucune publication trouvée</h1>
          }

        </div>
        <div class="column is-3-desktop is-desktop filter">
          <img src="filter.png" class="icon"></img>
          <input type="text" onChange={this.handleChange} className="input" placeholder="Search..." />
          <div class="filtre">
            <div class="mainfilter" onChange={this.mainfilter}>
              <div><label><input type="radio" name="time" value="recent" /> Plus recent</label></div>
              <div><label><input type="radio" name="time" value="populaire" />Plus populaire</label></div>
              <div><label><input type="radio" name="time" value="commente" />Plus commenté</label></div>
            </div>
            <div class="categoryfilter" onChange={this.categoryFilter}>
              <select id="category">
                <option value=""></option>
                {
                  this.state.category != null ?
                    this.state.category.map((val, index) =>
                      <option value={val.post_category_id}>{val.description}</option>
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

export default Posts;