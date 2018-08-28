import React from 'react';

import styles from './NavToggle.module.scss';

const NavToggle = () => {
  return (
    <div className={styles.NavToggle}>
      <span className={styles.line} />
      <span className={styles.line} />
      <span className={styles.line} />
    </div>
  );
};

export default NavToggle;
