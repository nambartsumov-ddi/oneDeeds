import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import Home from './pages/Home';

const Routes = () => (
  <div>
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Redirect to="/" />
      </Switch>
    </Router>
  </div>
);

export default hot(module)(Routes);
