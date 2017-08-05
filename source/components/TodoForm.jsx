import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { newTodo } from './TodoForm.scss';

class TodoForm extends Component {
  static propTypes = {
    saveTodo: PropTypes.func.isRequired
  };

  state = { title: '' };

  handleChange = (event) => {
    const title = event.target.value;

    this.setState({ title: title });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.saveTodo(this.state.title);
    this.setState({ title: '' });
  };

  render () {
    const { handleSubmit, handleChange } = this;
    const { title } = this.state;

    return (
      <form
        className={newTodo}
        onSubmit={handleSubmit}
      >
        <input
          type='text'
          placeholder='What needs to be done?'
          value={title}
          onChange={handleChange}
          autoFocus
        />
      </form>
    );
  }
}

export default TodoForm;
