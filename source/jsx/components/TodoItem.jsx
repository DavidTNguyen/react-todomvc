import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TodoEditForm from './TodoEditForm.jsx';

class TodoItem extends PureComponent {
  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
  }
  handleChange (event) {
    this.props.toggle(event);
  }
  handleClick (event) {
    this.props.destroy(event);
  }
  handleDoubleClick (event) {
    this.props.edit(event);
  }
  render () {
    const { handleChange, handleDoubleClick, handleClick } = this;
    const { todo, edit, editing, update, cancel } = this.props;

    const id = todo.get('id');
    const title = todo.get('title');
    const completed = todo.get('completed');

    return (
      <li className={classNames({
        completed: completed,
        editing: editing
      })}>
        <div className='view'>
          <input
            id={id}
            className='toggle'
            type='checkbox'
            checked={completed}
            onChange={handleChange}
          />
          <label
            id={id}
            onDoubleClick={handleDoubleClick}
          >
            {title}
          </label>
          <button
            id={id}
            className='destroy'
            onClick={handleClick}
          />
        </div>
        <TodoEditForm
          todo={todo}
          edit={edit}
          editing={editing}
          update={update}
          cancel={cancel}
        />
      </li>
    );
  }
}

TodoItem.propTypes = {
  toggle: PropTypes.func.isRequired,
  destroy: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  todo: PropTypes.object.isRequired,
  editing: PropTypes.any,
  update: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired
};

export default TodoItem;
