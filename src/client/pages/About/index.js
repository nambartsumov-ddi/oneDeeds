import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './About.module.scss';
import classNames from 'classnames';

import Layout from 'Components/Layout';
import NavToggle from 'Components/NavToggle';
import Logo from 'Components/Logo';

// Because we use css-modules we need to bind styles to classNames utilities
const stylesCtx = classNames.bind(styles);

const About = ({ isNavOpen }) => {
  const AboutContentClasses = stylesCtx(styles.ContentWrapper, {
    [styles.Open]: isNavOpen,
  });

  return (
    <div className={styles.About}>
      <NavToggle page="about" />
      <Logo />
      <div className={AboutContentClasses}>
        <div className={styles.AboutPageContent}>
          <div className={styles.AboutTitle}>
            <h1>
            About The <span>Cause</span>
            </h1>
          <div className={styles.BottomLine} />
          </div>
          <div className={styles.AboutImg} />
          <p>
            Our mission is to make everyone feel welcome and accepted no matter who you are. It’s this focus that has
            brought our attention to the LGBTQI community and the support needed for marriage equality in Australia.
            <br />
            <br />
              We see marriage as a fundamental part of belonging and, while we know Australians accept marriage
              equality, we are determined to help empower change to ensure all Australians have the right to marry the
              person they love.
            <br />
            <br />
            We now look to you, your hand and this ring to help us lead the way. When we stand together, we can make a
            big difference.
          </p>
        </div>
      </div>
      </Layout>
    </div>
  );
};

About.propTypes = {
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
)(About);
