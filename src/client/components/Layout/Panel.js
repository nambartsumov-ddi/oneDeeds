import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Panel.module.scss';

// Because we use css-modules we need to bind styles to classNames utilities
const stylesCtx = classNames.bind(styles);

let i = 1;
const Panel = ({ size, title, description, imageSrc, id, goTo, history, className, children, style, type }) => {
  const panelClasses = stylesCtx(styles.Panel, {
    [styles.Full]: size === 'Full',
    [styles.Half]: size === 'Half',
    [styles.Third]: size === 'Third',
    [styles.TwoThirds]: size === 'TwoThirds',
    [styles.CharityPanel]: type === 'Charity',
    [styles.WithDesc]: description !== undefined,
  });

  const imgPanelClasses = stylesCtx(styles.ImgPanel, {
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

  const isMobile = () => window.screen.width < 992;

  return (
    <div
      id={id}
      tabIndex={i++}
      className={panelClasses}
      onClick={() => onClick(goTo)}
      style={isMobile() ? null : style}>
      <div
        className={imgPanelClasses}
        style={{
          backgroundImage: imageSrc ? `url(${imageSrc})` : null,
        }}>
        <IsPlaceHolderPanel tabIndex="-1" />
        {children}
      </div>
    </div>
  );
};

Panel.propTypes = {
  size: PropTypes.string,
  title: PropTypes.any,
  description: PropTypes.any,
  imageSrc: PropTypes.string,
  id: PropTypes.string,
  goTo: PropTypes.string,
  history: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.any,
  style: PropTypes.object,
  type: PropTypes.string,
};

export default withRouter(Panel);
