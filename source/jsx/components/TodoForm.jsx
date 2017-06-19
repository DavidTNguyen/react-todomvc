import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TodoForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  };
  state = { title: '' };
  handleChange = (event) => {
    const title = event.target.value;

    this.setState({ title: title });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.title);
    this.setState({ title: '' });
  };
  render () {
    const { handleSubmit, handleChange } = this;
    const { title } = this.state;

    return (
      <form onSubmit={handleSubmit}>
        <input
          className='new-todo'
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
