import React, { Component } from 'react';
import classNames from 'classnames';
import { PropTypes } from 'prop-types';

import styles from './Step.module.scss';

// Because we use css-modules we need to bind styles to classNames utilities
const stylesCtx = classNames.bind(styles);

export default class Step extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      title,
      completedTitle,
      completedIcon,
      index,
      isActive,
      isCompleted,
      isDefault,
      isFirst,
      isLast,
    } = this.props;

    const stepClasses = stylesCtx(styles.Step);

    const circleClasses = stylesCtx(styles.Circle, {
      [styles.CompletedCircle]: isCompleted,
      [styles.ActiveCircle]: isActive,
    });

    const titleClasses = stylesCtx(styles.Title, {
      [styles.CompletedTitle]: isCompleted,
      [styles.ActiveTitle]: isActive,
    });

    const indexClass = stylesCtx(styles.Index);

    const leftClasses = stylesCtx(styles.LeftBar, {
      [styles.CompletedBar]: isCompleted || isActive ? true : false,
    });

    const rightClasses = stylesCtx(styles.RightBar, {
      [styles.CompletedBar]: isCompleted ? true : false,
    });

    const circleContent = isCompleted ? <img src={completedIcon} alt={index + 1} /> : index + 1;

    return (
      <div className={stepClasses}>
        <div className={circleClasses}>
          {isCompleted && <span className={indexClass}>{circleContent}</span>}
          {isActive && <span className={indexClass}>{circleContent}</span>}
          {isDefault && <span className={indexClass}>{circleContent}</span>}
        </div>
        {isCompleted && <span className={titleClasses}>{completedTitle}</span>}
        {isActive && <span className={titleClasses}>{title}</span>}
        {isDefault && <div className={titleClasses}>{title}</div>}
        {!isFirst && <div className={leftClasses} />}
        {!isLast && <div className={rightClasses} />}
      </div>
    );
  }
}

Step.propTypes = {
  title: PropTypes.string,
  completedTitle: PropTypes.string,
  completedIcon: PropTypes.string,
  index: PropTypes.number,
  isActive: PropTypes.bool,
  isCompleted: PropTypes.bool,
  isDefault: PropTypes.bool,
  isFirst: PropTypes.bool,
  isLast: PropTypes.bool,
};
