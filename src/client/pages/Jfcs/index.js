import React from 'react';
import classNames from 'classnames';

import styles from './Jfcs.module.scss';
import Layout from 'Components/Layout';
import NavToggle from 'Components/NavToggle';
import Logo from 'Components/Logo';
import Button from 'Components/Button';

// Because we use css-modules we need to bind styles to classNames utilities
const stylesCtx = classNames.bind(styles);

const Jfcs = () => {
  const JfcsContentClasses = stylesCtx(styles.ContentWrapper);

  return (
    <div className={styles.Jfcs}>
      <div className={styles.FixedHeader} />
      <NavToggle page="jfcs" />
      <Logo />
      <Layout>
        <div className={JfcsContentClasses}>
          <div className={styles.JfcsPageContent}>
            <div className={styles.JfcsTitle}>
              <h1>
                JFCS &amp; <span>ONEDEEDS</span>
              </h1>
              <div className={styles.BottomLine} />
            </div>
            <div className={styles.Content}>
              <p>
                We at OneDeeds are starting a new and exciting collaboration with JFCS. Our online community will donate
                food and we will send it directly to JFCS and help combat hunger.
              </p>
              <div className={styles.Charity}>
                <div className={styles.CharityRow}>
                  <iframe
                    style={{ width: '120px', height: '240px' }}
                    marginWidth={0}
                    marginHeight={0}
                    scrolling="no"
                    frameBorder={0}
                    src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=onedeedsassoc-20&marketplace=amazon&region=US&placement=B071FYV3WL&asins=B071FYV3WL&linkId=19c1a55d9fc36f0b06a805ba1d09e8cc&show_border=false&link_opens_in_new_window=false&price_color=333333&title_color=050505&bg_color=ffffff"
                  />
                  <iframe
                    style={{ width: '120px', height: '240px' }}
                    marginWidth={0}
                    marginHeight={0}
                    scrolling="no"
                    frameBorder={0}
                    src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=onedeedsassoc-20&marketplace=amazon&region=US&placement=B07ND5HHYT&asins=B07ND5HHYT&linkId=6073ecfb1525a8351d40e1cefc6f71e7&show_border=false&link_opens_in_new_window=false&price_color=333333&title_color=050505&bg_color=ffffff"
                  />
                  <iframe
                    style={{ width: '120px', height: '240px' }}
                    marginWidth={0}
                    marginHeight={0}
                    scrolling="no"
                    frameBorder={0}
                    src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=onedeedsassoc-20&marketplace=amazon&region=US&placement=B000FK7G16&asins=B000FK7G16&linkId=8330013b87d5c8cf8021f1eb2eac8a74&show_border=false&link_opens_in_new_window=false&price_color=333333&title_color=050505&bg_color=ffffff"
                  />
                </div>
                <div className={styles.CharityRow}>
                  <iframe
                    style={{ width: '120px', height: '240px' }}
                    marginWidth={0}
                    marginHeight={0}
                    scrolling="no"
                    frameBorder={0}
                    src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=onedeedsassoc-20&marketplace=amazon&region=US&placement=B003WT31QQ&asins=B003WT31QQ&linkId=423540312552e771c5bab9c3aa928dd2&show_border=false&link_opens_in_new_window=false&price_color=333333&title_color=050505&bg_color=ffffff"
                  />
                  <iframe
                    style={{ width: '120px', height: '240px' }}
                    marginWidth={0}
                    marginHeight={0}
                    scrolling="no"
                    frameBorder={0}
                    src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=onedeedsassoc-20&marketplace=amazon&region=US&placement=B01FUI2I7O&asins=B01FUI2I7O&linkId=7b4e40603ae12dff99452377f780a597&show_border=false&link_opens_in_new_window=false&price_color=333333&title_color=050505&bg_color=ffffff"
                  />
                  <iframe
                    style={{ width: '120px', height: '240px' }}
                    marginWidth={0}
                    marginHeight={0}
                    scrolling="no"
                    frameBorder={0}
                    src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=onedeedsassoc-20&marketplace=amazon&region=US&placement=B003SBRNKI&asins=B003SBRNKI&linkId=7a0fa0ab765b9c16b3161c5b9a217096&show_border=false&link_opens_in_new_window=false&price_color=333333&title_color=050505&bg_color=ffffff"
                  />
                </div>
              </div>
              <div className={styles.JfcsButton}>
                <a href="https://jfcs.org">
                  <Button text="For more information click here" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Jfcs;
