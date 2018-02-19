import React, { Component } from 'react';

export default class PostDetailsView extends Component {
  componentDidMount() {
  }

  render() {
    const post = this.props.post;
    return (
      <div className="card cardPost">
        <div className="card-block">
          <h4 className="card-title">{post.title}</h4>
          <h6 className="card-subtitle mb-2 text-muted">{post.categories}</h6>
          <p className="card-text">{post.content}</p>
        </div>
      </div>
    );
  }
}
