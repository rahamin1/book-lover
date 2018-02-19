import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleTodo } from '../actions/index';

class TodoItem extends Component {
  render() {
    let strike = "";
    if (this.props.todo.status === 'COMPLETED')
      strike = "line-through";
    return (
      <li
        className="list-group-item"
        style={{ textDecoration: strike }}
        onClick={ () => this.props.toggleTodo(this.props.todo.id)}>
        {this.props.todo.task}
      </li>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ toggleTodo: toggleTodo }, dispatch);
}

export default connect(null, mapDispatchToProps)(TodoItem);
