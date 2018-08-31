import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LayoutPanel extends Component {
  render() {
    return <div className={this.props.side}>{this.props.children}</div>;
  }
}

LayoutPanel.propTypes = {
  side: PropTypes.any,
  children: PropTypes.any,
};

export default LayoutPanel;
