import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { List } from 'immutable';

import { footer, todoCount, filters, selected } from './Footer.scss';

import ClearButton from './ClearButton.jsx';

const Footer = (props) => {
  const { todos, ...rest } = props;

  const activeTodoCount = todos.count(todo => todo.get('completed') === false);
  const completedTodoCount = todos.count(todo => todo.get('completed') === true);

  if (activeTodoCount > 0 || completedTodoCount > 0) {
    return (
      <footer className={footer}>
        <span className={todoCount}>
          <strong>{activeTodoCount}</strong>
          {activeTodoCount === 1 ? ' item left' : ' items left'}
        </span>
        <ul className={filters}>
          <li>
            <NavLink exact to='/' activeClassName={selected}>All</NavLink>
          </li>
          {' '}
          <li>
            <NavLink to='/active' activeClassName={selected}>Active</NavLink>
          </li>
          {' '}
          <li>
            <NavLink to='/completed' activeClassName={selected}>Completed</NavLink>
          </li>
        </ul>
        <ClearButton
          completedTodoCount={completedTodoCount}
          {...rest}
        />
      </footer>
    );
  } else {
    return null;
  }
};

Footer.propTypes = {
  todos: PropTypes.instanceOf(List).isRequired
};

export default Footer;
