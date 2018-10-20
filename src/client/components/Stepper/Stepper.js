import React, { Component } from 'react';
import classNames from 'classnames';
import { PropTypes } from 'prop-types';

import Step from './Step';
import styles from './Stepper.module.scss';
import svgIconSuccess from 'Assets/icons/green-succes.svg';

// Because we use css-modules we need to bind styles to classNames utilities
const stylesCtx = classNames.bind(styles);

export default class Stepper extends Component {
  constructor(props) {
    super(props);

    this.mountStyle = this.mountStyle.bind(this);

    this.state = {
      style: {
        opacity: 0,
        // position: 'relative',
        // top: '-100px',
        transform: 'scaleX(0)',
        transition: 'all 2s ease',
      },
    };
  }

  mountStyle() {
    this.setState({
      style: {
        opacity: 1,
        // position: 'relative',
        // top: '0px',
        transition: 'all 0.5s ease',
      },
    });
  }

  componentDidMount() {
    setTimeout(this.mountStyle, 10);
  }

  render() {
    const RootClasses = stylesCtx(styles.Root);
    const StepperClasess = stylesCtx(styles.Stepper);
    const { activeStep, steps } = this.props;

    return (
      <div className={RootClasses} style={this.state.style}>
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
  }
}
// const Stepper = ({ activeStep, steps }) => {
//   const RootClasses = stylesCtx(styles.Root);
//   const StepperClasess = stylesCtx(styles.Stepper);

//   return (
//     <div className={RootClasses}>
//       <div className={StepperClasess}>
//         {steps.map((step, index) => (
//           <Step
//             key={index}
//             completedIcon={svgIconSuccess}
//             title={step.title}
//             completedTitle={step.completedTitle}
//             index={index}
//             isActive={index === activeStep}
//             isCompleted={index < activeStep}
//             isDefault={!(index === activeStep || index < activeStep)}
//             isFirst={index === 0}
//             isLast={index === steps.length - 1}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

Stepper.defaultProps = {
  activeStep: 0,
};

Stepper.propTypes = {
  activeStep: PropTypes.number,
  steps: PropTypes.array,
};

// export default Stepper;
