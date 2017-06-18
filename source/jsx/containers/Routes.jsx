import React from 'react';
import { Switch, Route } from 'react-router-dom';

import TodoApp from '../components/TodoApp.jsx';

const Routes = () => (
  <Switch>
    <Route exact path='/' render={(props) => <TodoApp active='all' {...props} />} />
    <Route path='/active' render={() => <TodoApp active='active' />} />
    <Route path='/completed' render={() => <TodoApp active='completed' />} />
  </Switch>
);

export default Routes;
