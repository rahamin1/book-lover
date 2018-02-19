import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchPosts, deletePost } from '../actions/index';
import { Link } from 'react-router-dom';
import PostDetailsView from './post_details_view';

class PostDetailsScreen extends Component {

  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    const { id } = this.props.match.params;
    if (!(id in this.props.posts)) {
      return (
        <div>
          <div style={{ marginTop: '10px' }}>
            <Link to="/">&lt; Back to Posts</Link>
          </div>
          <div>
            Loading the post...
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="float-right">
              <button onClick={this.deletePost.bind(this)}
                type="button"
                className="btn btn-primary">
                DeletePost
              </button>
          </div>
          <div style={{ marginTop: '10px' }}>
            <Link to="/">&lt; Back to Posts</Link>
          </div>
          <PostDetailsView post={this.props.posts[id]}/>
        </div>
      );
    }
  }

  deletePost() {
    const { id } = this.props.match.params;
    this.props.deletePost(id, this.props.history);
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( { fetchPosts, deletePost }, dispatch );
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailsScreen);
