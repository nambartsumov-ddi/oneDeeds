import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './LayoutButton.module.scss';

class LayoutButton extends Component {
  render() {
    return (
      <div className={styles.LayoutButtonWrapper}>
        <button className={styles.LayoutButton}>
          <span>{this.props.text}</span>
        </button>
      </div>
    );
  }
}

LayoutButton.propTypes = {
  text: PropTypes.string,
};

export default LayoutButton;
