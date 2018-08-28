import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './Home.module.scss';

import { TOGGLE_NAVIGATION } from 'Actions';
import Header from 'Components/Header';
import Layout from 'Components/Layout';
import Nav from 'Components/Nav';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.Home}>
        <Header onClick={() => this.props.toggleNav} />
        <Nav />
        <Layout />
      </div>
    );
  }
}

Home.propTypes = {
  toggleNav: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    isNavOpen: state.isNavOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleNav: () => dispatch({ type: TOGGLE_NAVIGATION }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
