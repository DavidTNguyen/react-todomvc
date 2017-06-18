import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { List } from 'immutable';

import ClearButton from './ClearButton.jsx';

const Footer = (props) => {
  const { todos, onClear } = props;

  const activeTodoCount = todos.count(todo => todo.get('completed') === false);
  const completedTodoCount = todos.count(todo => todo.get('completed') === true);

  const pluralize = (count, word) => count === 1 ? word : word + 's';
  const activeTodoWord = pluralize(activeTodoCount, 'item');

  if (activeTodoCount > 0 || completedTodoCount > 0) {
    return (
      <footer className='footer'>
        <span className='todo-count'>
          <strong>{activeTodoCount}</strong> {activeTodoWord} left
        </span>
        <ul className='filters'>
          <li>
            <NavLink exact to='/' activeClassName='selected'>All</NavLink>
          </li>
          {' '}
          <li>
            <NavLink to='/active' activeClassName='selected'>Active</NavLink>
          </li>
          {' '}
          <li>
            <NavLink to='/completed' activeClassName='selected'>Completed</NavLink>
          </li>
        </ul>
        <ClearButton
          completedTodoCount={completedTodoCount}
          onClear={onClear}
        />
      </footer>
    );
  } else {
    return null;
  }
};

Footer.propTypes = {
  todos: PropTypes.instanceOf(List).isRequired,
  onClear: PropTypes.func.isRequired
};

export default Footer;
