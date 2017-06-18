import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import TodoItem from './TodoItem.jsx';

class TodoItemList extends Component {
  static propTypes = {
    todos: PropTypes.instanceOf(List).isRequired,
    active: PropTypes.string.isRequired
  };
  state = { editing: null };
  onEdit = (event) => {
    const id = event.target.id;

    if (id === this.state.editing) {
      this.setState({ editing: null });
    } else {
      this.setState({ editing: id });
    }
  };
  onCancel = (event) => {
    const escape = 27;

    if (event.which === escape) {
      this.setState({ editing: null });
    }
  };
  render () {
    const { onEdit, onCancel, props } = this;
    const { editing } = this.state;
    const { todos, active } = this.props;

    const shownTodos = todos.filter((todo) => {
      if (active === 'all') return todo;
      if (active === 'active') return todo.get('completed') === false;
      if (active === 'completed') return todo.get('completed') === true;
    });

    let id;
    const todoItems = shownTodos.map((todo) => {
      id = todo.get('id');
      return (
        <TodoItem
          key={id}
          id={id}
          todo={todo}
          editing={editing === id}
          onEdit={onEdit}
          onCancel={onCancel}
          {...props}
        />
      );
    });

    return (
      <ul className='todo-list'>
        {todoItems}
      </ul>
    );
  }
}

export default TodoItemList;
