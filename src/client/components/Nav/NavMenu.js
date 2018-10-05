import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import posed from 'react-pose';

import styles from './NavMenu.module.scss';
import NavMenuLink from './NavMenuLink';

// Because we use css-modules we need to bind styles to classNames utilities
const stylesCtx = classNames.bind(styles);

const PosedItems = posed.ul({
  open: {
    initialPose: 'closed',
    staggerChildren: 100,
  },
});

const PosedItem = posed.li({
  initialPose: 'closed',
  open: {
    x: '0%',
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: '100',
    },
  },
  closed: {
    x: '3rem',
    opacity: 0,
  },
});

const NavMenu = ({ isOpen }) => {
  const navMenuClasses = stylesCtx(styles.NavMenu);
  const posedItemsClass = stylesCtx(styles.PosedItems);
  const posedItemClass = stylesCtx(styles.PosedItem);

  return (
    <nav className={navMenuClasses}>
      <PosedItems className={posedItemsClass} pose={isOpen ? 'open' : 'closed'}>
        <PosedItem className={posedItemClass}>
          <NavMenuLink title="Home" to={`/`} />
        </PosedItem>
        <PosedItem className={posedItemClass}>
          <NavMenuLink title="Activity" to={`/activity`} />
        </PosedItem>
        <PosedItem className={posedItemClass}>
          <NavMenuLink title="Our Community" to={`/our-community`} />
        </PosedItem>
        <PosedItem className={posedItemClass}>
          <NavMenuLink title="About The Cause" to={`/about-the-cause`} />
        </PosedItem>
        <PosedItem className={posedItemClass}>
          <NavMenuLink title="Donations" to={`/Donations`} />
        </PosedItem>
        <PosedItem className={posedItemClass}>
          <NavMenuLink title="FAQ" to={`/frequently-asked-questions`} />
        </PosedItem>
      </PosedItems>
    </nav>
  );
};

NavMenu.propTypes = {
  isOpen: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    isOpen: state.ui.isNavOpen,
  };
};

export default connect(mapStateToProps)(NavMenu);
