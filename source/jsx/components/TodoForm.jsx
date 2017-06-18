import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TodoForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  };
  state = { todo: '' };
  handleChange = (event) => {
    const todo = event.target.value;

    this.setState({ todo: todo });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.todo);
    this.setState({ todo: '' });
  };
  render () {
    const { handleSubmit, handleChange } = this;
    const { todo } = this.state;

    return (
      <form onSubmit={handleSubmit}>
        <input
          className='new-todo'
          type='text'
          placeholder='What needs to be done?'
          value={todo}
          onChange={handleChange}
          autoFocus
        />
      </form>
    );
  }
}

export default TodoForm;
