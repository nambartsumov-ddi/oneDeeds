import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import styles from './Home.module.scss';

import NavToggle from 'Components/NavToggle';
import Layout from 'Components/Layout';
import Logo from 'Components/Logo';
import Panel from 'Components/Layout/Panel';
import LayoutButton from 'Components/LayoutButton';
import DownArrow from 'Components/DownArrow';

import handsFull from 'Images/hands-full2.jpg';
import handHalf from 'Images/hands-half2.jpg';

class Home extends Component {
  isMobile() {
    window.screen.width < 992;
  }

  constructor(props) {
    super(props);

    this.mountStyle = this.mountStyle.bind(this);
    this.mountHalfStyle = this.mountHalfStyle.bind(this);

    this.state = {
      styleFullPanel: {
        width: '100%',
        transition: 'all .3s ease',
      },
      styleHalfPanel: {
        width: '0',
        visibility: 'hidden',
        position: 'absolute',
        transition: 'all .3s ease',
      },
    };
  }

  mountStyle() {
    this.setState({
      styleFullPanel: {
        width: this.isMobile() ? '200vw' : '100vw',
        transition: 'width 2s ease',
      },
      styleHalfPanel: {
        width: this.isMobile() ? '200vw' : '100vw',
        visibility: 'visible',
        position: 'relative',
        transition: 'width .3s ease',
      },
      styleFirstHalfPanel: {
        height: '100vh',
        transition: 'height .3s ease',
      },
      styleBottomHalfPanel: {
        height: '0',
        visibility: 'hidden',
        opacity: 0,
        transition: 'height .3s ease, opacity .3s ease',
        position: 'absolute',
      },
    });
    setTimeout(this.mountHalfStyle, 300);
  }

  mountHalfStyle() {
    this.setState({
      styleFirstHalfPanel: {
        height: '50vh',
        transition: 'height .3s .3s ease',
      },
      styleBottomHalfPanel: {
        height: '50vh',
        visibility: 'visible',
        opacity: 1,
        position: 'relative',
        transition: 'height .3s .3s ease, opacity .3s .3s ease',
      },
    });
  }

  componentDidMount() {
    setTimeout(this.mountStyle, 800);
  }

  render() {
    const scrollToAnimated = (distance, duration) => {
      const initialY = document.body.scrollTop;
      const y = initialY + distance;
      const baseY = (initialY + y) * 0.5;
      const difference = initialY - baseY;
      const startTime = performance.now();

      function step() {
        let normalizedTime = (performance.now() - startTime) / duration;
        if (normalizedTime > 1) normalizedTime = 1;

        window.scrollTo(0, baseY + difference * Math.cos(normalizedTime * Math.PI));
        if (normalizedTime < 1) window.requestAnimationFrame(step);
      }
      window.requestAnimationFrame(step);
    };

    // Because we use css-modules we need to bind styles to classNames utilities
    const stylesCtx = classNames.bind(styles);

    const imagePosition = stylesCtx(
      {
        [styles.PanelImagePosition]: this.isMobile(),
      },
      styles.VideoPanel
    );

    return (
      <div className={styles.Home}>
        <NavToggle />
        <Logo />
        <DownArrow onClick={() => scrollToAnimated(this.SecondSectionRef.offsetTop, 600)} />
        {/** Animate panels with pose */}
        <Layout>
          <Panel size="Half" style={styles.StyleHalfPanel}>
            <Panel
              id="1"
              className={imagePosition}
              goTo={'/video'}
              size="Half"
              style={this.state.styleHalfPanel}
              title={
                <div className={styles.TitleWrapper}>
                  <div className={styles.FirstLine}>
                    One is <span className={styles.Powerful}>Powerful, </span>
                    Many are <span className={styles.Unstoppable}>Unstoppable</span>
                  </div>
                </div>
              }
              imageSrc={handsFull}>
              <svg width="62" height="62" viewBox="0 0 153 153" className={styles.PlayIcon}>
                <path d="M98.3 73.4L65 52.2c-1.4-.9-3.2-.9-4.6-.1-1.5.8-2.4 2.3-2.4 4v40.7c0 1.6.9 3.1 2.3 3.9.7.4 1.5.6 2.3.6s1.6-.2 2.3-.6l33.3-19.5c1.4-.8 2.2-2.2 2.2-3.8.1-1.7-.7-3.1-2.1-4z" />
                <path d="M146.9 50.9c-7.6-21.1-24.1-37.6-45.3-45.2C93.5 2.8 85 1.4 76.4 1.4c-8.7 0-17.2 1.5-25.4 4.4-21.1 7.5-37.5 24-45.1 45C3 59.1 1.5 67.6 1.5 76.4c0 8.6 1.4 17 4.3 25 7.5 21.3 24 37.9 45.3 45.6 8.1 2.9 16.7 4.4 25.4 4.4 8.6 0 17.1-1.5 25.2-4.3 21.3-7.7 37.9-24.2 45.4-45.6 2.8-8 4.3-16.4 4.3-25 0-8.9-1.5-17.5-4.5-25.6zm-7 47.9C133.2 118 118.2 133 99 139.9c-7.2 2.6-14.9 3.9-22.6 3.9-7.9 0-15.5-1.3-22.8-4-19.1-6.9-33.9-21.8-40.7-40.9C10.3 91.6 9 84.1 9 76.3c0-7.9 1.3-15.6 4-23 6.9-18.9 21.6-33.6 40.6-40.5 7.3-2.6 15-4 22.8-4s15.4 1.3 22.6 3.9c19.1 6.8 33.9 21.6 40.7 40.6 2.7 7.3 4 15.1 4 23 .1 7.8-1.2 15.3-3.8 22.5z" />
              </svg>
            </Panel>
            <Panel
              id="4"
              style={this.state.styleHalfPanel}
              size="Half"
              title="JFCS &amp; OneDeeds"
              description="We at OneDeeds are starting a new and exciting collaboration with JFCS. Our online community will donate food and we will send it directly to JFCS and help combat hunger."
              goTo="https://www.jfcs.org/"
              className={styles.CharityPanel}
              type="Charity">
              <LayoutButton text="For more information click Here" type="Charity" />
              <div className={styles.Charity}>
                <div className={styles.CharityRow}>
                  <iframe
                    style={{ width: '120px', height: '240px' }}
                    marginWidth={0}
                    marginHeight={0}
                    scrolling="no"
                    frameBorder={0}
                    src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=onedeeds-20&marketplace=amazon&region=US&placement=B071FYV3WL&asins=B071FYV3WL&linkId=75710dbf7e62fef88263e969e347c9a6&show_border=false&link_opens_in_new_window=false&price_color=333333&title_color=00bf46&byg_color=ffffff"
                  />
                  <iframe
                    style={{ width: '120px', height: '240px' }}
                    marginWidth={0}
                    marginHeight={0}
                    scrolling="no"
                    frameBorder={0}
                    src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=onedeeds-20&marketplace=amazon&region=US&placement=B07ND5HHYT&asins=B07ND5HHYT&linkId=f014b560f98a1045ab84333f7e7433e4&show_border=false&link_opens_in_new_window=false&price_color=333333&title_color=00bf46&bg_color=ffffff"
                  />
                  <iframe
                    style={{ width: '120px', height: '240px' }}
                    marginWidth={0}
                    marginHeight={0}
                    scrolling="no"
                    frameBorder={0}
                    src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=onedeeds-20&marketplace=amazon&region=US&placement=B000FK7G16&asins=B000FK7G16&linkId=c4aa2736403571483c9b7bbad74d4ffb&show_border=false&link_opens_in_new_window=false&price_color=333333&title_color=00bf46&bg_color=ffffff"
                  />
                </div>
                <div className={styles.CharityRow}>
                  <iframe
                    style={{ width: '120px', height: '240px' }}
                    marginWidth={0}
                    marginHeight={0}
                    scrolling="no"
                    frameBorder={0}
                    src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=onedeeds-20&marketplace=amazon&region=US&placement=B003WT31QQ&asins=B003WT31QQ&linkId=73a42efc6bd8d92af4c55f38a2dacd13&show_border=false&link_opens_in_new_window=false&price_color=333333&title_color=00bf46&bg_color=ffffff"
                  />
                  <iframe
                    style={{ width: '120px', height: '240px' }}
                    marginWidth={0}
                    marginHeight={0}
                    scrolling="no"
                    frameBorder={0}
                    src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=onedeeds-20&marketplace=amazon&region=US&placement=B01FUI2I7O&asins=B01FUI2I7O&linkId=852227aa7edbbcd6986d4fe902429eda&show_border=false&link_opens_in_new_window=false&price_color=333333&title_color=00bf46&bg_color=ffffff"
                  />
                  <iframe
                    style={{ width: '120px', height: '240px' }}
                    marginWidth={0}
                    marginHeight={0}
                    scrolling="no"
                    frameBorder={0}
                    src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=onedeeds-20&marketplace=amazon&region=US&placement=B003SBRNKI&asins=B003SBRNKI&linkId=01be29b769b280ccf8583ee4f7eae5be&show_border=false&link_opens_in_new_window=false&price_color=333333&title_color=00bf46&bg_color=ffffff"
                  />
                </div>
              </div>
            </Panel>
          </Panel>
          <Panel size="Half" style={styles.StyleHalfPanel}>
            <Panel
              id="2"
              style={this.state.styleHalfPanel}
              size="Half"
              title="Make a change"
              goTo={'/signup'}
              description="We believe that all it takes to make an impact is One Deed within One community."
              imageSrc={handHalf}
              className={styles.RegistrationPanel}>
              <LayoutButton text="Join OneDeeds Today" />
            </Panel>
            <Panel
              id="3"
              style={this.state.styleHalfPanel}
              size="Half"
              goTo={'/our-community'}
              title="How does it work?"
              description={
                <div className={styles.ThirdPanelDesc}>
                  <ul>
                    <li>Join our community.</li>
                    <li>Complete your monthly deed.</li>
                    <li>Share your deed with #onedeeds.</li>
                  </ul>
                </div>
              }
              /* imageSrc={handHalf}*/
              className={styles.OurCommunityPanel}>
              <LayoutButton text="Help Us Make A Change" />
            </Panel>
          </Panel>
          {/* ref div for scrolling */}
          <div style={{ visibility: 'hidden' }} ref={(section) => (this.SecondSectionRef = section)} />
        </Layout>
      </div>
    );
  }
}

Home.propTypes = {};

export default connect()(Home);
