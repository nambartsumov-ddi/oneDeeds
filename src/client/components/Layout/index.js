import React, { Component } from 'react';
import LayoutButton from 'Components/LayoutButton';
import LayoutPanel from './LayoutPanel';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './Layout.module.scss';

class Layout extends Component {
  render() {
    return (
      <div className={styles.Layout + ' ' + (this.props.isOpen ? styles.navOpen : '')}>
        <LayoutPanel side={styles.left} />
        <LayoutPanel side={styles.right}>
          <LayoutPanel side={styles.rightHalfTop}>
            <LayoutButton text="Act Now" />
          </LayoutPanel>
          <LayoutPanel side={styles.rightBottom} />
        </LayoutPanel>
      </div>
    );
  }
}

Layout.propTypes = {
  isOpen: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    isOpen: state.ui.isNavOpen,
  };
};

export default connect(
  mapStateToProps,
  null
)(Layout);
