import React from 'react';
import { connect } from 'react-redux';

import styles from './Home.module.scss';

import NavToggle from 'Components/NavToggle';
import Layout from 'Components/Layout';
import Nav from 'Components/Nav';
import Logo from 'Components/Logo';

const Home = () => {
  return (
    <div className={styles.Home}>
      <NavToggle />
      <Logo />
      <Nav />
      <Layout />
    </div>
  );
};

export default connect()(Home);
