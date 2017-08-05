import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import { main, toggleAll } from './Main.scss';

import TodoItemList from './TodoItemList.jsx';

const Main = ({ todos, toggleAllTodos, ...rest }) => {
  const activeTodoCount = todos.count(todo => todo.get('completed') === false);

  if (todos.size > 0) {
    return (
      <section className={main}>
        <input
          className={toggleAll}
          type='checkbox'
          checked={activeTodoCount === 0}
          onChange={toggleAllTodos}
        />
        <TodoItemList
          todos={todos}
          {...rest}
        />
      </section>
    );
  } else {
    return null;
  }
};

Main.propTypes = {
  toggleAllTodos: PropTypes.func.isRequired,
  todos: PropTypes.instanceOf(List).isRequired
};

export default Main;
