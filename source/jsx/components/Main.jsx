import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import TodoItemList from './TodoItemList.jsx';

class Main extends PureComponent {
  static propTypes = {
    onToggleAll: PropTypes.func.isRequired,
    todos: PropTypes.instanceOf(List).isRequired
  };
  handleChange = (event) => {
    this.props.onToggleAll(event);
  };
  render () {
    const { handleChange, props } = this;
    const { todos } = this.props;

    const todoCount = todos.size;
    const activeTodoCount = todos.count(todo => todo.get('completed') === false);

    if (todoCount > 0) {
      return (
        <section className='main'>
          <input
            className='toggle-all'
            type='checkbox'
            checked={activeTodoCount === 0}
            onChange={handleChange}
          />
          <TodoItemList {...props} />
        </section>
      );
    } else {
      return null;
    }
  }
}

export default Main;
