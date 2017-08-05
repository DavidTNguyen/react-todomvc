import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import { todoList } from './TodoItemList.scss';

import TodoItem from './TodoItem.jsx';

const TodoItemList = ({ todos, active, editing, editTodo, cancelEditing, ...rest }) => (
  <ul
    className={todoList}
    children={
      todos
        .filter((todo) => {
          if (active === 'all') return todo;
          if (active === 'active') return todo.get('completed') === false;
          if (active === 'completed') return todo.get('completed') === true;
        })
        .map((todo) => (
          <TodoItem
            id={todo.get('_id')}
            key={todo.get('_id')}
            todo={todo}
            isEditing={editing === todo.get('_id')}
            editTodo={(event) => editTodo(event)}
            cancelEditing={(event) => cancelEditing(event)}
            {...rest}
          />
        ))
    }
  />
);

TodoItemList.propTypes = {
  todos: PropTypes.instanceOf(List).isRequired,
  active: PropTypes.string.isRequired,
  editing: PropTypes.any,
  editTodo: PropTypes.func.isRequired,
  cancelEditing: PropTypes.func.isRequired
};

export default TodoItemList;
