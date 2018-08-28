import React, { Component } from 'react';
import LayoutButton from 'Components/LayoutButton';

import styles from './Layout.module.scss';

class Layout extends Component {
  render() {
    /* let styleLayout = this.state.isSideBarOpen ? { transform: 'translateX(' + '-34' + 'rem)' } : '';*/

    return (
      <div className={styles.Layout}>
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

export default Layout;
