import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './index.scss';

import TodoApp from './components/TodoApp.jsx';

render(
  <BrowserRouter>
    <Switch>
      <Route exact path='/' render={() => <TodoApp active='all' />} />
      <Route path='/active' render={() => <TodoApp active='active' />} />
      <Route path='/completed' render={() => <TodoApp active='completed' />} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
