import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Home from './pages/Home';

const Routes = () => (
  <div className="router">
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Redirect to="/" />
      </Switch>
    </Router>
  </div>
);

export default Routes;
