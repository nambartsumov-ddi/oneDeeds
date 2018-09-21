import React from 'react';

import styles from './Email.module.scss';

const Email = () => {
  return (
    <div className={styles.Email}>
      <div className={styles.Title}>Email:</div>
      <input type="text" />
      <button className={styles.Subscribe}>Subscribe</button>
    </div>
  );
};

export default Email;
