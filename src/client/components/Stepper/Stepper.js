import React from 'react';
import classNames from 'classnames';
import { PropTypes } from 'prop-types';

import Step from './Step';
import styles from './Stepper.module.scss';
import svgIconSuccess from 'Assets/icons/green-succes.svg';

// Because we use css-modules we need to bind styles to classNames utilities
const stylesCtx = classNames.bind(styles);

const Stepper = ({ activeStep, steps }) => {
  const RootClasses = stylesCtx(styles.Root);
  const StepperClasess = stylesCtx(styles.Stepper);

  return (
    <div className={RootClasses}>
      <div className={StepperClasess}>
        {steps.map((step, index) => (
          <Step
            key={index}
            completedIcon={svgIconSuccess}
            title={step.title}
            completedTitle={step.completedTitle}
            index={index}
            isActive={index === activeStep}
            isCompleted={index < activeStep}
            isDefault={!(index === activeStep || index < activeStep)}
            isFirst={index === 0}
            isLast={index === steps.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

Stepper.defaultProps = {
  activeStep: 0,
};

Stepper.propTypes = {
  activeStep: PropTypes.number,
  steps: PropTypes.array,
};

export default Stepper;
