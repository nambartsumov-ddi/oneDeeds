import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Panel from 'Components/Layout/Panel';
import LayoutButton from 'Components/LayoutButton';
import DownArrow from 'Components/DownArrow';

import styles from './Layout.module.scss';

import ArtBeach from 'Images/art-beach.jpg';
import AgedBaby from 'Images/adult-aged-baby.jpg';
import Adult from 'Images/abstract-adult.jpg';

// Because we use css-modules we need to bind styles to classNames utilitie
const stylesCtx = classNames.bind(styles);

const Layout = ({ isOpen }) => {
  const layoutClasses = stylesCtx(styles.Layout, {
    [styles.navOpen]: isOpen,
  });

  // const panelLeftClasses = stylesCtx(styles.left, styles.Panel);

  return (
    <div className={layoutClasses}>
      <Panel size="Full" title="Section 1" description="Description for section 1" imageSrc={ArtBeach}>
        {/* TODO: <MainVideo /> */}
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          className={styles.Icon}>
          <use xlinkHref="#icon-play2" />
          <path d="M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM16 29c-7.18 0-13-5.82-13-13s5.82-13 13-13 13 5.82 13 13-5.82 13-13 13zM12 9l12 7-12 7z" />
        </svg>
        <DownArrow />
        {/* TODO: <Registration /> */}
      </Panel>
      <Panel size="Full">
        <Panel size="Half" title="Section 2" description="Description for section 2" imageSrc={AgedBaby}>
          <LayoutButton text="Act Now" />
        </Panel>

        <Panel size="Half" title="Section 3" description="Description for section 3" imageSrc={Adult}>
          <LayoutButton text="Get Started" />
        </Panel>
      </Panel>
    </div>
  );
};

Layout.propTypes = {
  isOpen: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    isOpen: state.ui.isNavOpen,
  };
};

export default connect(
  mapStateToProps,
  null
)(Layout);
