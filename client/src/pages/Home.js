import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import {  } from '../actions';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>hiiiiiiiiiiii</div>;
  }
}

Home.propTypes = {};

function mapStateToProps(state) {
  const { isFetching } = {
    isFetching: true,
  };

  return {
    isFetching,
  };
}

export default connect(mapStateToProps)(Home);
