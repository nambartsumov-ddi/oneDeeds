import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import ScrollToTopRoute from 'Components/ScrollToTopRoute';
import Home from 'Pages/Home';
import About from 'Pages/About';
import Player from 'Pages/Player';
import Activity from 'Pages/Activity';
import Community from 'Pages/Community';
import Donations from 'Pages/Donations';
import FAQ from 'Pages/FAQ';
import Steps from 'Components/Steps';
import Registration from 'Components/Registration';
import Email from 'Components/Email';
import Nav from 'Components/Nav';
import Overlay from 'Components/Overlay';

const Routes = () => (
  <>
    <Nav />
    <Overlay />
    <Switch>
      <ScrollToTopRoute path="/" exact component={Home} />
      <ScrollToTopRoute path="/about-the-cause" exact component={About} />
      <ScrollToTopRoute path="/video" exact component={Player} />
      <ScrollToTopRoute path="/activity" exact component={Activity} />
      <ScrollToTopRoute path="/our-community" exact component={Community} />
      <ScrollToTopRoute path="/donations" exact component={Donations} />
      <ScrollToTopRoute path="/FAQ" exact component={FAQ} />
      <ScrollToTopRoute path="/steps" exact component={Steps} />
      <ScrollToTopRoute path="/registration" exact component={Registration} />
      <ScrollToTopRoute path="/email" exact component={Email} />
      <Redirect to="/" />
    </Switch>
  </>
);

export default Routes;
