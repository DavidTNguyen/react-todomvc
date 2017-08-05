import React from 'react';
import PropTypes from 'prop-types';

import { clearCompleted } from './ClearButton.scss';

const ClearButton = ({ completedTodoCount, clearCompletedTodos }) => {
  if (completedTodoCount > 0) {
    return (
      <button className={clearCompleted} onClick={clearCompletedTodos}>
        Clear completed
      </button>
    );
  } else {
    return null;
  }
};

ClearButton.propTypes = {
  completedTodoCount: PropTypes.number.isRequired,
  clearCompletedTodos: PropTypes.func.isRequired
};

export default ClearButton;
