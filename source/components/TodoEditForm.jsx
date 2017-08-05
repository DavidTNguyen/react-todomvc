import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import { edit } from './TodoEditForm.scss';

class TodoEditForm extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    todo: PropTypes.instanceOf(Map).isRequired,
    isEditing: PropTypes.bool,
    editTodo: PropTypes.func.isRequired,
    cancelEditing: PropTypes.func.isRequired,
    updateTodo: PropTypes.func.isRequired
  };

  state = {
    id: this.props.id,
    title: this.props.todo.get('title')
  };

  handleChange = (event) => {
    const title = event.target.value;

    this.setState({
      title: title
    });
  };

  handleSubmit = (event) => {
    const { id, title } = this.state;

    event.preventDefault();
    this.props.updateTodo(id, title);
    this.props.editTodo(event);
  };

  handleKeyDown = (event) => {
    this.props.cancelEditing(event);
  };

  componentDidUpdate () {
    if (this.props.isEditing) {
      this.input.focus();
    }
  }

  render () {
    const { handleChange, handleSubmit, handleKeyDown } = this;
    const { title } = this.state;
    const { isEditing } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <input
          ref={(input) => { this.input = input; }}
          className={edit}
          style={isEditing ? { display: 'block' } : { display: 'none' }}
          value={title}
          onChange={handleChange}
          onBlur={handleSubmit}
          onKeyDown={handleKeyDown}
        />
      </form>
    );
  }
}

export default TodoEditForm;
