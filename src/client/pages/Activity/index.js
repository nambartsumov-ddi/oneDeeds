import React from 'react';
import classNames from 'classnames';

import styles from './Activity.module.scss';

import NavToggle from 'Components/NavToggle';
import Logo from 'Components/Logo';
import Layout from 'Components/Layout';

// Because we use css-modules we need to bind styles to classNames utilities
const stylesCtx = classNames.bind(styles);

const Activity = () => {
  const ActivityContentClasses = stylesCtx(styles.ContentWrapper);

  return (
    <div className={styles.Activity}>
      <NavToggle page="activity" />
      <Logo />
      <Layout>
        <div className={ActivityContentClasses}>
          <div className={styles.ActivityPageContent}>
            <div className={styles.ActivityTitle}>
              <h1>
                Our <span>Activity</span>
              </h1>
              <div className={styles.BottomLine} />
            </div>
            <div className={styles.Content}>
              <p>
                Every month each individual OneDeeds community member completes a good deed. With thousands of members
                in the community, we’re completing many thousands of good deeds every month.
              </p>

              <p>Good deeds include:</p>

              <ul>
                <li>Using less paper for a day </li>
                <li>Carpooling to work for a week </li>
                <li>Volunteering with veterans </li>
                <li>Planting a tree </li>
                <li>Donating blood </li>
                <li>Volunteering at a nursing home </li>
                <li>And more! </li>
              </ul>
            </div>
            <div className={styles.ActivityImg} />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Activity;
