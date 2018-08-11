import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import Home from './pages/Home';

const Routes = () => (
  <div>
    <BrowserRouter>
      <Route exact path="/" component={Home} />
    </BrowserRouter>
  </div>
);

export default hot(module)(Routes);
