import React, { Component } from 'react';

export default class PostsItem extends Component {
  constructor(props) {
    super(props);
    this.displayPost = this.displayPost.bind(this);
  }

  render() {
    const post = this.props.post;
    return (
      <tr onClick = {() => this.displayPost(post.id)}>
        <td>{post.id}</td>
        <td>{post.title}</td>
        <td>{post.categories}</td>
      </tr>
    );
  }

// bad
//onClick={this.handleButtonChange(false)

//good
  //onClick={() => this.handleButtonChange(false)}
  //onClick={this.handleButtonChangeSingle}

  displayPost(postId) {
    this.props.history.push(`posts/${postId}`);
  }
}
