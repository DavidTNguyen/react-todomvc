import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TodoEditForm from './TodoEditForm.jsx';

class TodoItem extends PureComponent {
  static propTypes = {
    onToggle: PropTypes.func.isRequired,
    onDestroy: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    todo: PropTypes.object.isRequired,
    editing: PropTypes.any
  };
  handleChange = (event) => {
    this.props.onToggle(event);
  };
  handleClick = (event) => {
    this.props.onDestroy(event);
  };
  handleDoubleClick = (event) => {
    this.props.onEdit(event);
  };
  render () {
    const { handleChange, handleDoubleClick, handleClick, props } = this;
    const { todo, editing } = this.props;

    const key = todo.get('key');
    const title = todo.get('title');
    const completed = todo.get('completed');

    return (
      <li className={classNames({
        completed: completed,
        editing: editing
      })}>
        <div className='view'>
          <input
            id={key}
            className='toggle'
            type='checkbox'
            checked={completed}
            onChange={handleChange}
          />
          <label
            id={key}
            onDoubleClick={handleDoubleClick}
          >
            {title}
          </label>
          <button
            id={key}
            className='destroy'
            onClick={handleClick}
          />
        </div>
        <TodoEditForm {...props} />
      </li>
    );
  }
}

export default TodoItem;
