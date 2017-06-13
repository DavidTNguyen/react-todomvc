import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import classNames from 'classnames';

import ClearButton from './ClearButton.jsx';

class Footer extends PureComponent {
  render () {
    const { todos, nowShowing, clearCompleted } = this.props;

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
              <a
                href='#/'
                className={classNames({ selected: nowShowing === 'all' })}
              >
                All
              </a>
            </li>
            {' '}
            <li>
              <a
                href='#/active'
                className={classNames({ selected: nowShowing === 'active' })}
              >
                Active
              </a>
            </li>
            {' '}
            <li>
              <a
                href='#/completed'
                className={classNames({ selected: nowShowing === 'completed' })}
              >
                Completed
              </a>
            </li>
          </ul>
          <ClearButton
            completedTodoCount={completedTodoCount}
            clearCompleted={clearCompleted}
          />
        </footer>
      );
    } else {
      return null;
    }
  }
}

Footer.propTypes = {
  todos: PropTypes.instanceOf(List).isRequired,
  nowShowing: PropTypes.string.isRequired,
  clearCompleted: PropTypes.func.isRequired
};

export default Footer;
