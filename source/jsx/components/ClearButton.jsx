import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ClearButton extends Component {
  constructor (props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick () {
    this.props.clearCompleted();
  }
  render () {
    const { handleClick } = this;
    const { completedTodoCount } = this.props;

    if (completedTodoCount > 0) {
      return (
        <button
          className='clear-completed'
          onClick={handleClick}
        >
          Clear completed
        </button>
      );
    } else {
      return null;
    }
  }
}

ClearButton.propTypes = {
  completedTodoCount: PropTypes.number.isRequired,
  clearCompleted: PropTypes.func.isRequired
};

export default ClearButton;
