import React, { Component } from 'react';

import styles from './Nav.module.scss';

class Nav extends Component {
  render() {
    return (
      <div className={styles.Nav}>
        {/* <NavMenu /> */}
        <div className={styles.mainLinks}>
          {/* NavMenuItem */}
          <div className={styles.link}>First Page</div>
          <div className={styles.link}>Second Page</div>
          <div className={styles.link}>Third Page</div>
        </div>
      </div>
    );
  }
}

Nav.propTypes = {
  /* action: React.propTypes.any,*/
};

export default Nav;
