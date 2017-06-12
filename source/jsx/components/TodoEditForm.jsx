import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

class TodoEditForm extends Component {
  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.state = {
      id: this.props.todo.get('id'),
      title: this.props.todo.get('title')
    };
  }
  componentDidUpdate () {
    if (this.props.editing) {
      this.refs.input.focus();
    }
  }
  handleChange (event) {
    const changedTitle = event.target.value;

    this.setState(({title}) => ({
      title: changedTitle
    }));
  }
  handleSubmit (event) {
    const id = this.state.id;
    const title = this.state.title;

    event.preventDefault();
    this.props.update(id, title);
    this.props.edit(event);
  }
  handleKeyDown (event) {
    this.props.cancel(event);
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

TodoEditForm.propTypes = {
  todo: PropTypes.instanceOf(Map).isRequired,
  edit: PropTypes.func.isRequired,
  editing: PropTypes.bool,
  update: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired
};

export default TodoEditForm;
