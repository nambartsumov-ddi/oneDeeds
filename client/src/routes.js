import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import Home from './pages/Home';
import NotFound from './pages/NotFound';

const Routes = () => (
  <div>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  </div>
);

export default hot(module)(Routes);
