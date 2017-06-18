import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class ClearButton extends PureComponent {
  static propTypes = {
    completedTodoCount: PropTypes.number.isRequired,
    onClear: PropTypes.func.isRequired
  };
  handleClick = () => {
    this.props.onClear();
  };
  render () {
    const { handleClick } = this;
    const { completedTodoCount } = this.props;

    if (completedTodoCount > 0) {
      return (
        <button className='clear-completed' onClick={handleClick}>
          Clear completed
        </button>
      );
    } else {
      return null;
    }
  }
}

export default ClearButton;
