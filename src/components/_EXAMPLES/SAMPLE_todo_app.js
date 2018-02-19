import React, { Component } from 'react';
import TodoAdd from '../containers/todo_add';
import TodoList from '../containers/todo_list';
import TodoFilter from '../containers/todo_filter';

export default class TodoApp extends Component {
  render() {
    return (
      <div>
        <TodoAdd />
        <TodoList />
        <TodoFilter />
      </div>
    );
  }
}
