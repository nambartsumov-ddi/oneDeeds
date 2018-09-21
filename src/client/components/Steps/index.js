import React from 'react';

import styles from './Steps.module.scss';

const Steps = () => {
  return (
    <div className={styles.Steps}>
      <h1>Steps:</h1>
      <div className={styles.StepsWrapper}>
        <div className={styles.Step}>
          <div className={styles.StepNumber}>1</div>
          Join the OneDeeds community
        </div>
        <div className={styles.Step}>
          <div className={styles.StepNumber}>2</div>
          Choose a good deed to complete within the month
        </div>
        <div className={styles.Step}>
          <div className={styles.StepNumber}>3</div>
          Share your completed deed with a #OneDeeds
        </div>
      </div>
    </div>
  );
};

export default Steps;
