import React, { Component } from 'react';
import LayoutButton from 'Components/LayoutButton';
import Menu from 'Components/Menu';

import styles from './Layout.module.scss';

class Layout extends Component {
  constructor(props) {
    super(props);

    this.handler = this.handler.bind(this);

    this.state = {
      isSideBarOpen: false,
    };
  }

  handler() {
    this.setState({ isSideBarOpen: !this.state.isSideBarOpen });
  }

  render() {
    /* let styleLayout = this.state.isSideBarOpen ? { transform: 'translateX(' + '-34' + 'rem)' } : '';*/

    return (
      <div className={styles.Layout}>
        <Menu />
        <div className={styles.left} />
        <div className={styles.right}>
          <div className={styles.rightHalfTop}>
            <LayoutButton />
          </div>
          <div className={styles.rightBottom} />
        </div>
      </div>
    );
  }
}

Layout.propTypes = {};

export default Layout;
