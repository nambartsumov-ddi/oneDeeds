import React from 'react';
import classNames from 'classnames';

import styles from './Community.module.scss';
import Layout from 'Components/Layout';
import NavToggle from 'Components/NavToggle';
import Logo from 'Components/Logo';
import SignupCallToAction from 'Components/SignupCallToAction';

// Because we use css-modules we need to bind styles to classNames utilities
const stylesCtx = classNames.bind(styles);

const Community = () => {
  const CommunityContentClasses = stylesCtx(styles.ContentWrapper);

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
            <div className={styles.Content}>
              <p>
                Our world is made up of 8 billion people. That’s 8 billion individuals with jobs, families,
                responsibilities, friends, futures, hopes and dreams.
              </p>

              <p>
                Individuals are powerful, but 8 billion people is a force to be reckoned with. A force so great it could
                cause extreme change.
              </p>

              <p>Our community brings individual forces together to multiply that power.</p>

              <p>
                We believe that every one of us needs to behave a little bit more like a bee society, were each of our
                individual actions can contribute to a grand solution, an emergent property, that is much greater than
                our mere sum of our individual actions. So, let the small deed each of us does, be the driver of
                large-scale change.
              </p>
              <SignupCallToAction />
            </div>
            <div className={styles.CommunityImg} />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Community;
