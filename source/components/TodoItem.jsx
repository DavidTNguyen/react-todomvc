import React from 'react';
import PropTypes from 'prop-types';

import { complete, editing, view, toggle, destroy } from './TodoItem.scss';

import TodoEditForm from './TodoEditForm.jsx';

const TodoItem = (props) => {
  const { id, todo, isEditing, toggleTodo, editTodo, deleteTodo, ...rest } = props;

  const title = todo.get('title');
  const completed = todo.get('completed');

  return (
    <li className={isEditing ? editing : ''}>
      <div
        className={view}
        style={isEditing ? { display: 'none' } : { display: 'block' }}
      >
        <input
          id={id}
          className={toggle}
          type='checkbox'
          checked={completed}
          onChange={(event) => toggleTodo(event)}
        />
        <label
          id={id}
          className={completed ? complete : ''}
          onDoubleClick={(event) => editTodo(event)}
          children={title}
        />
        <button
          id={id}
          className={destroy}
          onClick={(event) => deleteTodo(event)}
        />
      </div>
      <TodoEditForm
        id={id}
        todo={todo}
        editTodo={editTodo}
        isEditing={isEditing}
        {...rest}
      />
    </li>
  );
};

TodoItem.propTypes = {
  id: PropTypes.string.isRequired,
  todo: PropTypes.object.isRequired,
  isEditing: PropTypes.bool.isRequired,
  editTodo: PropTypes.func.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired
};

export default TodoItem;
