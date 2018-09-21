import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './FAQ.module.scss';
import classNames from 'classnames';

import Layout from 'Components/Layout';
import NavToggle from 'Components/NavToggle';
import Logo from 'Components/Logo';

// Because we use css-modules we need to bind styles to classNames utilities
const stylesCtx = classNames.bind(styles);

const FAQ = ({ isNavOpen }) => {
  const FAQContentClasses = stylesCtx(styles.ContentWrapper, {
    [styles.Open]: isNavOpen,
  });

  return (
    <div className={styles.FAQ}>
      <NavToggle page="FAQ" />
      <Logo />
      <Layout>
        <div className={FAQContentClasses}>
          <div className={styles.FAQPageContent}>
            <div className={styles.FAQTitle}>
              <h1>
                Frequently Asked <span>Questions</span>
              </h1>
              <div className={styles.BottomLine} />
            </div>
            <div className={styles.FAQImg} />
            <div className={styles.Content}>
              <div className={styles.Question}>
                <span>Q</span>: Can I suggest good deeds for the community?
              </div>
              <div className={styles.Answer}>
                <span>A</span>: Yes, please send us any suggestions that you have – we’re all ears!
              </div>
              <div>
                <span>Q</span>: How do I unsubscribe?
              </div>
              <div className={styles.Answer}>
                <span>A</span>: Simply enter the email address you have subscribed to and you will receive an email to
                unsubscribe
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

FAQ.propTypes = {
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
)(FAQ);
