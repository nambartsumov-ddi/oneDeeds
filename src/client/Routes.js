import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from 'Pages/Home';
import About from 'Pages/About';
import Nav from 'Components/Nav';

const Routes = () => (
  <>
    <Nav />
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/about-the-cause" exact component={About} />
      <Redirect to="/" />
    </Switch>
  </>
);

export default Routes;
