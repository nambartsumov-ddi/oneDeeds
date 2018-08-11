import React from 'react';
import { Router, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { hot } from 'react-hot-loader';

import Home from '../pages/Home';

const history = createHistory();

const App = () => (
  <Router history={history}>
    <Route exact path="/" component={Home} />
  </Router>
);

export default hot(module)(App);
