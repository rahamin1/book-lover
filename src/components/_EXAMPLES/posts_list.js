import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions/index';
import _ from 'lodash';
import PostsItem from './posts_item';

class PostsList extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    return (
      <div>
        <div className="float-right">
          <Link
            className="btn btn-primary"
            to="/posts/add">
            Add Post
          </Link>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Categories</th>
            </tr>
          </thead>
          <tbody>
            { this.renderPosts() }
          </tbody>
        </table>
      </div>
    );
  }

  renderPosts() {
    const posts = this.props.posts;
    if (!posts) {
      return (
        <div>
          <tr>
            <td>Loading...</td>
            <td></td>
            <td></td>
          </tr>
          Loading...
        </div>
      );
    } else {
      const postsArr = _.values(this.props.posts);
      return postsArr.map( (post) => {
        return (
          <PostsItem key={post.id} post={post} history={this.props.history} />
        );
      });
    }
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( { fetchPosts }, dispatch );
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);
