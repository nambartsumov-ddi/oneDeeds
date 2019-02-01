import React from 'react';
import classNames from 'classnames';

import styles from './Donations.module.scss';

import NavToggle from 'Components/NavToggle';
import Logo from 'Components/Logo';
import Layout from 'Components/Layout';
import SignupCallToAction from 'Components/SignupCallToAction';

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
                <li>
                  <a href="https://www.nature.org/en-us" rel="noopener noreferrer" target="_blank">
                    The Nature Conservancy
                  </a>
                </li>
                <li>
                  <a href="https://www.worldwildlife.org" rel="noopener noreferrer" target="_blank">
                    World Wildlife Fund
                  </a>
                </li>
                <li>
                  <a href="https://www.nrdc.org" rel="noopener noreferrer" target="_blank">
                    Natural Resources Defense Council
                  </a>
                </li>
                <li>
                  <a href="https://www.unicefusa.org" rel="noopener noreferrer" target="_blank">
                    UNICEF USA
                  </a>
                </li>
                <li>
                  <a href="https://www.savethechildren.org" rel="noopener noreferrer" target="_blank">
                    Save the Children
                  </a>
                </li>
                <li>
                  <a href="https://www.stjude.org" rel="noopener noreferrer" target="_blank">
                    ALSAC - St. Jude Children&#39;s Research Hospital
                  </a>
                </li>
              </ul>

              <p>
                This list is just the beginning. Our community members can offer more charities that you&#39;d like us
                to donate to. Information on the monthly donation will be shared in an email to each of our community
                members.
              </p>

              <h3 className={styles.Donated}>Charities We Donated So Far :</h3>
              <div className={styles.BottomLineCharities} />
              <ul>
                <li>
                  Jan-2019 - &nbsp;
                  <a href="https://www.worldwildlife.org/" rel="noopener noreferrer" target="_blank">
                    World Wildlife Fund
                  </a>
                  &nbsp; - &nbsp;
                  <a
                    href="https://www.onedeeds.com/worldwildlife-reciept.jpeg"
                    rel="noopener noreferrer"
                    target="_blank">
                    Reciept
                  </a>
                </li>
                <li>
                  Dec-2018 - &nbsp;
                  <a href="https://www.savethechildren.org/" rel="noopener noreferrer" target="_blank">
                    Save the Children
                  </a>
                  &nbsp; - &nbsp;
                  <a
                    href="https://www.onedeeds.com/save-the-children-donation.jpeg"
                    rel="noopener noreferrer"
                    target="_blank">
                    Reciept
                  </a>
                </li>
                <li>
                  Nov-2018 - &nbsp;
                  <a href="https://www.redcross.org" rel="noopener noreferrer" target="_blank">
                    The American Red Cross for the victims of California wildfires
                  </a>
                  &nbsp; - &nbsp;
                  <a href="https://www.onedeeds.com/redcross-donation.jpg" rel="noopener noreferrer" target="_blank">
                    Reciept
                  </a>
                </li>
              </ul>
              <SignupCallToAction />
            </div>
            <div className={styles.DonationsImg} />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Donations;
