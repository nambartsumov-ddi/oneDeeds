import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './SignupCallToAction.module.scss';

// Because we use css-modules we need to bind styles to classNames utilities
const stylesCtx = classNames.bind(styles);

const SignupCallToAction = ({ className, page }) => {
  const signupClasses = stylesCtx(
    { [styles.SignupCallToAction]: page !== 'about' },
    {
      [className]: className,
    }
  );

  return (
    <div className={signupClasses}>
      <Link to={'/signup'} className={styles.LinkToSignUp}>
        Join us now
      </Link>
    </div>
  );
};

SignupCallToAction.propTypes = {
  className: PropTypes.string,
  page: PropTypes.string,
};

export default SignupCallToAction;
