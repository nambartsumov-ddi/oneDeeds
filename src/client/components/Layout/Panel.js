import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Panel.module.scss';

// Because we use css-modules we need to bind styles to classNames utilitie
const stylesCtx = classNames.bind(styles);

const Panel = ({ size, title, description, imageSrc, children }) => {
  const panelClasses = stylesCtx(styles.Panel, {
    [styles.Full]: size === 'Full',
    [styles.Half]: size === 'Half',
  });

  return (
    <div className={panelClasses} style={{ backgroundImage: `url(${imageSrc})` }}>
      <div className={styles.Title}>{title}</div>
      <div className={styles.Description}>{description}</div>
      {children}
    </div>
  );
};

Panel.propTypes = {
  size: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  imageSrc: PropTypes.string,
  children: PropTypes.any,
};

export default Panel;
