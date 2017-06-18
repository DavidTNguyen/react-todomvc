import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './Routes.jsx';

const App = () => (
  <BrowserRouter basename='/react-todomvc'>
    <Routes />
  </BrowserRouter>
);

export default App;
