import React, { Component } from 'react';
import { connect } from 'react-redux';
import TodoItem from './todo_item';

class TodoList extends Component {
  render() {
    return (
      <div>
        { this.renderList() }
      </div>
    );
  }

  renderList() {
    let todos = [];
    this.props.list.map( (todo) => {
      if (this.props.curFilter === 'ALL' || this.props.curFilter === todo.status)
        todos.push(<TodoItem key={todo.id} todo={todo} />);
    });

    if (todos.length > 0) {
      return (
        <div style={{ padding: "20px" }}>
          <h6>Todo list</h6>
          {todos}
        </div>
      );
    } else {
      return (
        <div>
          <p>The Todo List is Empty!</p>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    list: state.list,
    curFilter: state.curFilter
  };
}

export default connect(mapStateToProps)(TodoList);
