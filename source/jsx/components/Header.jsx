import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import TodoForm from './TodoForm.jsx';

class Header extends PureComponent {
  render () {
    const { add } = this.props;

    return (
      <header className='header'>
        <h1>todos</h1>
        <TodoForm add={add} />
      </header>
    );
  }
}

Header.propTypes = {
  add: PropTypes.func.isRequired
};

export default Header;
