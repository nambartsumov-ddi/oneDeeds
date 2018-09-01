import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Layout.module.scss';

class LayoutPanel extends Component {
  render() {
    return (
      <div className={this.props.side} style={{ backgroundImage: `url(${this.props.image})` }}>
        <div className={styles.Title}>{this.props.title}</div>
        <div className={styles.Description}>{this.props.description}</div>
        {this.props.children}
      </div>
    );
  }
}

LayoutPanel.propTypes = {
  side: PropTypes.any,
  children: PropTypes.any,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.any,
};

export default LayoutPanel;
