import React, { Component } from "react";
import Moment from 'react-moment';
class Posts extends Component {

  constructor(props) {
    super(props)
    this.state = {
      posts: null,
      list: null
    }
    this.getPosts = this.getPosts.bind(this)
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getPosts();
  }

  getPosts() {
    fetch("http://51.255.175.118:2000/post", {
      method: "GET"
    })
      .then(res => res.json())
      .then((data) => {
        console.log(data)
        this.setState({ posts: data, 
          list: data })

      })

  }
  seePost(id) {
    window.location.href = '/#/post/' + id;
  }

  handleChange(e) {
    let currentList = this.state.list
    let newList = [];
    // If the search bar isn't empty
    if (e.target.value !== "") {
      this.setState({
        posts: currentList
      })

      // Use .filter() to determine which items should be displayed
      // based on the search terms
      newList = currentList.filter(item => {
        const lc = item.title.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return lc.includes(filter)
      });
      this.setState({
        posts: newList
      })
    } else {
      this.setState({
        posts: this.state.list
      })
    }
    this.setState({
      filtered: newList
    })
  }

  render() {
    return (
      <div class="columns ">
        <div class="column is-7-desktop is-full-mobile is-offset-1">
          {this.state.posts != null ?
            this.state.posts.map((val) =>
              <div class="card" onClick={() => { this.seePost(val.post_id) }}>
                <div class="card-content">
                  <div key="{va.post_id}">
                    {(val.url_image != "") && (val.url_image != null) ?
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
                        <Moment fromNow>
                          {val.date}
                        </Moment>
                        <p class="author">{val.username}</p>
                      </div>
                    </div>
                    <div class="rating">
                      <img src="ear.png" class="icon"></img>
                      <img src="comment.png" class="icon"></img>
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
            null
          }

        </div>
        <div class="column is-3-desktop is-desktop">
          <h3>Filter</h3>
          <input type="text" onChange={this.handleChange} className="input" placeholder="Search..." />
        </div>
      </div>

    );
  }
}

export default Posts;