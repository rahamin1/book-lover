import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions/index';
import { bindActionCreators } from 'redux';

class TodoAdd extends Component {

  constructor(props) {
    super(props);
    this.addTodo = this.addTodo.bind(this);
  }

  render() {

    return (
      <div style={{ padding: "20px", margin: "20px" }}>
        <input type="text" name="newTask" placeholder="Enter task..." ref="newTask" required />
        <button onClick = {this.addTodo}>Add!</button>
      </div>
    );
  }

  addTodo() {
    console.log("in addTodo. new task is: ", this.refs.newTask.value);
    if (this.refs.newTask.value === "")
      console.log("in addTodo. new task value is not set!");
    else
      this.props.addTodo(this.refs.newTask.value);
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addTodo: addTodo }, dispatch);
}

export default connect(null, mapDispatchToProps)(TodoAdd);
