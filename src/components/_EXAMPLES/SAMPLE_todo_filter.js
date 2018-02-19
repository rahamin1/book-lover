import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setFilter } from '../actions/index';

class TodoFilter extends Component {
  render() {

    let allClass = "", activeClass = "", completedClass = "";
    switch (this.props.curFilter) {
      case 'ACTIVE':
        activeClass = "active";
        break;
      case 'COMPLETED':
        completedClass = "active";
        break;
      default:
        allClass = "active";
    }

    return (
      <div>
        <ul id="ulFilter">
          <li
            className={ allClass }
            onClick = { () => this.props.setFilter('ALL')}>ALL</li>
          <li
            className={ activeClass }
            onClick = { () => this.props.setFilter('ACTIVE')}>ACTIVE</li>
          <li
            className={ completedClass }
            onClick = { () => this.props.setFilter('COMPLETED')}>COMPLETED</li>
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    curFilter: state.curFilter
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setFilter: setFilter }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoFilter);
