import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import TodoItemList from './TodoItemList.jsx';

class Main extends Component {
  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange (event) {
    this.props.toggleAll(event);
  }
  render () {
    const { handleChange } = this;
    const { todos, todoCount, activeTodoCount, nowShowing, toggle, destroy, update } = this.props;

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
  toggleAll: PropTypes.func.isRequired,
  todos: PropTypes.instanceOf(List).isRequired,
  todoCount: PropTypes.number.isRequired,
  activeTodoCount: PropTypes.number.isRequired,
  nowShowing: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
  destroy: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired
};

export default Main;
