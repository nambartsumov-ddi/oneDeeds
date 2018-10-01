import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import ScrollToTopRoute from 'Components/ScrollToTopRoute';
import Home from 'Pages/Home';
import About from 'Pages/About';
import Player from 'Pages/Player';
import Activity from 'Pages/Activity';
import Community from 'Pages/Community';
import Donations from 'Pages/Donations';
import Registration from 'Pages/Registration';
import FAQ from 'Pages/FAQ';
import Nav from 'Components/Nav';
import Overlay from 'Components/Overlay';

const Routes = () => (
  <>
    <Nav />
    <Overlay />
    <Switch>
      <ScrollToTopRoute path="/" exact component={Home} />
      <ScrollToTopRoute path="/video" exact component={Player} />
      {/** TODO: Change act-now to login route */}
      <ScrollToTopRoute path="/act-now" exact component={Registration} />
      <ScrollToTopRoute path="/act-now/:accessToken" exact component={Registration} />
      <ScrollToTopRoute path="/our-community" exact component={Community} />
      <ScrollToTopRoute path="/about-the-cause" exact component={About} />
      <ScrollToTopRoute path="/activity" exact component={Activity} />
      <ScrollToTopRoute path="/donations" exact component={Donations} />
      <ScrollToTopRoute path="/frequently-asked-questions" exact component={FAQ} />
      <Redirect to="/" />
    </Switch>
  </>
);

export default Routes;
