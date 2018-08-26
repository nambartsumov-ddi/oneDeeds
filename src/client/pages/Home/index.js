import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './Home.module.scss';
import Layout from 'Components/Layout';

class Home extends Component {
  render() {
    return (
      <div className={styles.Home}>
        <Layout />
      </div>
    );
  }
}

Home.propTypes = {};

function mapStateToProps(state) {
  return {
    state,
  };
}

export default connect(mapStateToProps)(Home);
