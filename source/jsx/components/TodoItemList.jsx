import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import TodoItem from './TodoItem.jsx';

class TodoItemList extends Component {
  constructor (props) {
    super(props);
    this.edit = this.edit.bind(this);
    this.cancel = this.cancel.bind(this);
    this.state = { editing: null };
  }
  edit (event) {
    const id = event.target.id;

    if (id === this.state.editing) {
      this.setState({ editing: null });
    } else {
      this.setState({ editing: id });
    }
  }
  cancel (event) {
    const escape = 27;

    if (event.which === escape) {
      this.setState({ editing: null });
    }
  }
  render () {
    const { edit, cancel } = this;
    const { editing } = this.state;
    const { todos, nowShowing, toggle, destroy, update } = this.props;

    const shownTodos = todos.filter((todo) => {
      switch (nowShowing) {
        case 'active':
          return todo.get('completed') === false;
        case 'completed':
          return todo.get('completed') === true;
        default:
          return true;
      }
    });

    let id;
    const todoItems = shownTodos.map((todo) => {
      id = todo.get('id');
      return (
        <TodoItem
          key={id}
          id={id}
          todo={todo}
          editing={parseInt(editing) === id}
          edit={edit}
          toggle={toggle}
          destroy={destroy}
          update={update}
          cancel={cancel}
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

TodoItemList.propTypes = {
  todos: PropTypes.instanceOf(List).isRequired,
  nowShowing: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
  destroy: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired
};

export default TodoItemList;
