import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Home from 'Pages/Home';
import About from 'Pages/About';
import Nav from 'Components/Nav';

const Routes = () => (
  <>
    <Nav />
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about-the-cause" exact component={About} />
        <Redirect to="/" />
      </Switch>
    </Router>
  </>
);

export default Routes;
