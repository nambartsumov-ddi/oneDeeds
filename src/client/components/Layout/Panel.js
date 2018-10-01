import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Panel.module.scss';

// Because we use css-modules we need to bind styles to classNames utilities
const stylesCtx = classNames.bind(styles);

let i = 1;
const Panel = ({ size, title, description, imageSrc, id, goTo, history, className, children }) => {
  const panelClasses = stylesCtx(styles.Panel, {
    [styles.Full]: size === 'Full',
    [styles.Half]: size === 'Half',
    [styles.WithDesc]: description !== undefined,
    [className]: className,
  });

  const IsPlaceHolderPanel = () => {
    if (!title && !description) {
      return null;
    }

    if (!description) {
      return (
        <Fragment>
          <div className={styles.Title}>{title}</div>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <div className={styles.Title}>{title}</div>
        <div className={styles.Description}>{description}</div>
      </Fragment>
    );
  };

  const onClick = (goTo) => {
    goTo ? history.push(goTo) : null;
  };

  return (
    <div
      id={id}
      tabIndex={i++}
      className={panelClasses}
      onClick={() => onClick(goTo)}
      style={{ backgroundImage: imageSrc ? `url(${imageSrc})` : null }}>
      <IsPlaceHolderPanel tabIndex="-1" />
      {children}
    </div>
  );
};

Panel.propTypes = {
  size: PropTypes.string,
  title: PropTypes.any,
  description: PropTypes.string,
  imageSrc: PropTypes.string,
  id: PropTypes.string,
  goTo: PropTypes.string,
  history: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.any,
};

export default withRouter(Panel);
