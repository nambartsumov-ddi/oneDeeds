import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './Home.module.scss';

class Home extends Component {
  render() {
    return <div className={styles.Home}>Hello oneDeeds</div>;
  }
}

Home.propTypes = {};

function mapStateToProps(state) {
  return {
    state,
  };
}

export default connect(mapStateToProps)(Home);
