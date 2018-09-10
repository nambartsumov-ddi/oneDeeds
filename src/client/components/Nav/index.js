import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import NavMenu from './NavMenu';
import NavMenuLink from './NavMenuLink';
import NavFooter from './NavFooter';

import styles from './Nav.module.scss';

// Because we use css-modules we need to bind styles to classNames utilitie
const stylesCtx = classNames.bind(styles);

const Nav = ({ isOpen }) => {
  const navClasses = stylesCtx(styles.Nav, {
    [styles.navOpen]: isOpen,
  });

  return (
    <aside className={navClasses}>
      <NavMenu>
        <NavMenuLink title="The Acceptance Ring" />
        <NavMenuLink title="Share Your Acceptance" />
        <NavMenuLink title="Third Page" />
        <NavMenuLink title="Fourth Page" />
        <NavMenuLink title="Fifth Page" />
        <NavMenuLink title="Sixth Page" />
        <NavFooter>
          <NavMenuLink title="Legal Terms" size="Small" />
        </NavFooter>
      </NavMenu>
    </aside>
  );
};

Nav.propTypes = {
  isOpen: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    isOpen: state.ui.isNavOpen,
  };
};

export default connect(mapStateToProps)(Nav);
