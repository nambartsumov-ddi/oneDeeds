import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import ScrollToTopRoute from 'Components/ScrollToTopRoute';
import Home from 'Pages/Home';
import About from 'Pages/About';
import Nav from 'Components/Nav';
import Overlay from 'Components/Overlay';

const Routes = () => (
  <>
    <Nav />
    <Overlay />
    <Switch>
      <ScrollToTopRoute path="/" exact component={Home} />
      <ScrollToTopRoute path="/about-the-cause" component={About} />
      <Redirect to="/" />
    </Switch>
  </>
);

export default Routes;
