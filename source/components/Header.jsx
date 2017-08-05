import React from 'react';

import { header } from './Header.scss';

import TodoForm from './TodoForm.jsx';

const Header = (props) => (
  <header className={header}>
    <h1>todos</h1>
    <TodoForm {...props} />
  </header>
);

export default Header;
