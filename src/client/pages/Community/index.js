import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './Community.module.scss';
import classNames from 'classnames';

import Layout from 'Components/Layout';
import NavToggle from 'Components/NavToggle';
import Logo from 'Components/Logo';

// Because we use css-modules we need to bind styles to classNames utilities
const stylesCtx = classNames.bind(styles);

const Community = ({ isNavOpen }) => {
  const CommunityContentClasses = stylesCtx(styles.ContentWrapper, {
    [styles.Open]: isNavOpen,
  });

  return (
    <div className={styles.Community}>
      <div className={styles.FixedHeader} />
      <NavToggle page="community" />
      <Logo />
      <Layout>
        <div className={CommunityContentClasses}>
          <div className={styles.CommunityPageContent}>
            <div className={styles.CommunityTitle}>
              <h1>
                Our <span>Community</span>
              </h1>
              <div className={styles.BottomLine} />
            </div>
            <div className={styles.CommunityImg} />
            <div className={styles.Content}>
              <p>
                Our world is made up of 8 billion people. That’s 8 billion individuals with jobs, families,
                responsibilities, friends, futures, hopes and dreams.
              </p>

              <p>
                Individuals are powerful, but 8 billion people is a force to be reckoned with. A force so great it could
                cause extreme change.
              </p>

              <p>
                Our community brings individual forces together to multiply that power. Are you ready to join the
                OneDeeds community?
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

Community.propTypes = {
  isNavOpen: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    isNavOpen: state.ui.isNavOpen,
  };
};

export default connect(
  mapStateToProps,
  null
)(Community);
