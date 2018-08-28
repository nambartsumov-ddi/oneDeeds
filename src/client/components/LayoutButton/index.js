import React, { Component } from 'react';

import styles from './LayoutButton.module.scss';

class LayoutButton extends Component {
  render() {
    return (
      <div className={styles.LayoutButtonWrapper}>
        <button className={styles.LayoutButton}>
          <span>Act Now</span>
        </button>
      </div>
    );
  }
}

LayoutButton.propTypes = {};

export default LayoutButton;
