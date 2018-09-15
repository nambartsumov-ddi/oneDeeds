import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { playMainVideo, closeMainVideo } from 'Actions';
import PropTypes from 'prop-types';

import styles from './Player.module.scss';

import Layout from 'Components/Layout';
import NavToggle from 'Components/NavToggle';
import Logo from 'Components/Logo';
import MainVideo from 'Components/MainVideo';

class Player extends Component {
  componentDidMount() {
    this.props.playMainVideo();
  }

  render() {
    return (
      <div className={styles.Player}>
        <NavToggle />
        <Logo />
        {this.props.isVideodPlaying && (
          <Link to={'/'} className={styles.CloseVideo} onClick={this.props.closeMainVideo}>
            <svg viewBox="0 0 140.9 137.8" id="close-icon" width="100%" height="100%">
              <path d="M135.9 47.7c-7-19.6-22.3-34.8-41.8-41.9-7.6-2.7-15.5-4.1-23.7-4.1-8 0-15.8 1.3-23.2 4C27.4 12.6 12 28 4.9 47.7 2.2 55.2.8 63.2.8 71.3c0 8 1.4 15.9 4 23.4 7.1 19.8 22.5 35.2 42.3 42.2.4.1.8.2 1.2.2 1.5 0 2.8-.9 3.3-2.3.3-.9.3-1.8-.1-2.7-.4-.8-1.1-1.5-2-1.8-17.6-6.2-31.8-20.4-38.1-38-2.4-6.7-3.6-13.8-3.6-21 0-7.3 1.2-14.4 3.7-21.2 6.4-17.7 20.2-31.5 38-37.8 6.7-2.4 13.7-3.6 20.9-3.6 7.3 0 14.5 1.2 21.3 3.7 17.6 6.4 31.3 20.1 37.6 37.7 2.4 6.8 3.7 13.9 3.7 21.2 0 7.2-1.2 14.3-3.6 21-6.3 17.7-20 31.5-37.7 37.8-.9.3-1.6 1-2 1.8s-.4 1.8-.1 2.7 1 1.6 1.8 2 1.8.4 2.7.1c19.6-7.1 34.9-22.4 41.9-42.1 2.7-7.5 4-15.4 4-23.4 0-8-1.4-15.9-4.1-23.5z" />
              <path d="M88.5 82.3l-13-13 13-13c.7-.7 1-1.5 1-2.5s-.4-1.8-1-2.5c-1.4-1.4-3.6-1.4-4.9 0l-13 13-13-13c-1.4-1.4-3.6-1.4-5 0s-1.4 3.6 0 5l13 13-13 13c-.7.7-1 1.5-1 2.5s.4 1.8 1 2.5c1.3 1.3 3.6 1.3 4.9 0l13-13 13 13c.7.7 1.5 1 2.5 1 .9 0 1.8-.4 2.5-1 1.4-1.4 1.4-3.6 0-5z" />
            </svg>
          </Link>
        )}
        <Layout>
          <MainVideo />
        </Layout>
      </div>
    );
  }
}

Player.propTypes = {
  playMainVideo: PropTypes.func,
  closeMainVideo: PropTypes.func,
  isVideodPlaying: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    isVideodPlaying: state.ui.isVideodPlaying,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ playMainVideo, closeMainVideo }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);
