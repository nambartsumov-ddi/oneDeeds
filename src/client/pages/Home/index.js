import React from 'react';
import { connect } from 'react-redux';

import styles from './Home.module.scss';

import Header from 'Components/Header';
import Layout from 'Components/Layout';
import Nav from 'Components/Nav';

const Home = () => {
  return (
    <div className={styles.Home}>
      <Header />
      <Nav />
      <Layout />
    </div>
  );
};

export default connect()(Home);
