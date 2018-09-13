import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Logo.module.scss';
import LogoSrc from 'Assets/Logo_transparent.png';

const Logo = () => {
  return (
    <Link to={'/'} className={styles.Logo}>
      <img src={LogoSrc} />
    </Link>
  );
};

Logo.propTypes = {};

export default Logo;
