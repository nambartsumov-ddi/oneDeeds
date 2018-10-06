import React from 'react';
import classNames from 'classnames';

import styles from './Donations.module.scss';

import NavToggle from 'Components/NavToggle';
import Logo from 'Components/Logo';
import Layout from 'Components/Layout';

// Because we use css-modules we need to bind styles to classNames utilities
const stylesCtx = classNames.bind(styles);

const Donations = () => {
  const DonationsContentClasses = stylesCtx(styles.ContentWrapper);

  return (
    <div className={styles.Donations}>
      <div className={styles.FixedHeader} />
      <NavToggle page="donations" />
      <Logo />
      <Layout>
        <div className={DonationsContentClasses}>
          <div className={styles.DonationsPageContent}>
            <div className={styles.DonationsTitle}>
              <h1>Donations</h1>
              <div className={styles.BottomLine} />
            </div>
            <div className={styles.Content}>
              <p>
                Not only have the good deeds done by our community members contributed to a better world, but the
                donations have had an incredible impact on organizations and charities worldwide. Every month we donate
                a portion of the membership fees to a different charity.
              </p>

              <p>Some of the charities we will support include:</p>

              <ul>
                <li>The Nature Conservancy </li>
                <li>World Wildlife Fund </li>
                <li>Natural Resources Defense Council </li>
                <li>UNICEF USA </li>
                <li>Save the Children </li>
                <li>ALSAC - St. Jude Children&#39;s Research Hospital </li>
              </ul>
            </div>
            <div className={styles.DonationsImg} />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Donations;
