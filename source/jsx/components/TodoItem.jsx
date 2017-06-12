import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TodoEditForm from './TodoEditForm.jsx';

class TodoItem extends Component {
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
  // submit () {
  //   const text = this.state.editText.trim();
  //   if (text) {
  //     this.props.save(text);
  //     this.setState(({editText}) => ({
  //       editText: text
  //     }));
  //   }
  // }
  render () {
    const { handleChange, handleDoubleClick, handleClick } = this;
    const { id, todo, edit, editing, update, cancel } = this.props;

    const completed = todo.get('completed');
    const title = todo.get('title');

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
  id: PropTypes.number.isRequired,
  update: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired
};

export default TodoItem;