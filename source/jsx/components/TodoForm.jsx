import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TodoForm extends Component {
  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { todo: '' };
  }
  handleChange (event) {
    const todo = event.target.value;

    this.setState({ todo: todo });
  }
  handleSubmit (event) {
    event.preventDefault();
    this.props.add(this.state.todo);
    this.setState({ todo: '' });
  }
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

TodoForm.propTypes = {
  add: PropTypes.func.isRequired
};

export default TodoForm;
