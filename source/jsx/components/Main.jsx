import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import TodoItemList from './TodoItemList.jsx';

class Main extends PureComponent {
  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange (event) {
    this.props.toggleAll(event);
  }
  render () {
    const { handleChange } = this;
    const { todos, nowShowing, toggle, destroy, update } = this.props;

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
          <TodoItemList
            todos={todos}
            nowShowing={nowShowing}
            toggle={toggle}
            destroy={destroy}
            update={update}
          />
        </section>
      );
    } else {
      return null;
    }
  }
}

Main.propTypes = {
  todos: PropTypes.instanceOf(List).isRequired,
  nowShowing: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
  toggleAll: PropTypes.func.isRequired,
  destroy: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired
};

export default Main;
