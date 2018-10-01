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

    const isMobile = () => window.screen.width < 992;

    // Because we use css-modules we need to bind styles to classNames utilities
    const stylesCtx = classNames.bind(styles);

    const imagePosition = stylesCtx({
      [styles.PanelImagePosition]: isMobile(),
    });

    return (
      <div className={styles.Home}>
        <NavToggle />
        <Logo />
        <DownArrow onClick={() => scrollToAnimated(this.SecondSectionRef.offsetTop, 600)} />
        <Layout>
          <Panel
            className={imagePosition}
            goTo={'/video'}
            size="Full"
            title={
              <div className={styles.TitleWrapper}>
                <div className={styles.FirstLine}>
                  One is <span className={styles.Powerful}>Powerful, </span>
                </div>
                <div className={styles.SecondLine}>
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
          <Panel size="Full">
            <Panel
              size="Half"
              title="Make a change"
              goTo={'/act-now'}
              description="We believe that all it takes to make an impact is One Deed within One community.
              Join us Today !
              "
              imageSrc={handHalf}>
              <LayoutButton text="Act Now" />
            </Panel>

            <Panel
              size="Half"
              goTo={'/our-community'}
              title="Section 3"
              description="Description for section 3"
              /* imageSrc={handHalf}*/
              className={styles.OurCommunityPanel}>
              <LayoutButton text="Get Started" />
            </Panel>
            {/* ref div for scrolling */}
            <div style={{ visibility: 'hidden' }} ref={(section) => (this.SecondSectionRef = section)} />
          </Panel>
        </Layout>
      </div>
    );
  }
}

Home.propTypes = {};

export default connect()(Home);
