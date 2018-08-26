import React, { Component } from 'react';

import styles from './Layout.module.scss';

class Layout extends Component {
  render() {
    return (
      <div className={styles.Layout}>
        <button className={styles.hamburgerIcon}>
          <div className={styles.menuWrapper}>
            <div className={styles.line} />
            <div className={styles.line} />
            <div className={styles.line} />
          </div>
        </button>
        <div className={styles.left} />
        <div className={styles.right}>
          <div className={styles.rightUp}>
            <button className={styles.LayoutButton}>
              <span>Act Now</span>
            </button>
          </div>
          <div className={styles.rightDown} />
        </div>
      </div>
    );
  }
}

Layout.propTypes = {};

export default Layout;
