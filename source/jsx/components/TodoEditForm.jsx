import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

class TodoEditForm extends Component {
  static propTypes = {
    todo: PropTypes.instanceOf(Map).isRequired,
    onEdit: PropTypes.func.isRequired,
    editing: PropTypes.bool,
    onUpdate: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
  };
  state = {
    id: this.props.todo.get('id'),
    title: this.props.todo.get('title')
  };
  handleChange = (event) => {
    const changedTitle = event.target.value;

    this.setState(({title}) => ({
      title: changedTitle
    }));
  };
  handleSubmit = (event) => {
    const id = this.state.id;
    const title = this.state.title;

    event.preventDefault();
    this.props.onUpdate(id, title);
    this.props.onEdit(event);
  };
  handleKeyDown = (event) => {
    this.props.onCancel(event);
  };
  componentDidUpdate () {
    if (this.props.editing) {
      this.refs.input.focus();
    }
  }
  render () {
    const { handleChange, handleSubmit, handleKeyDown } = this;
    const { title } = this.state;

    return (
      <form onSubmit={handleSubmit}>
        <input
          ref='input'
          className='edit'
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
