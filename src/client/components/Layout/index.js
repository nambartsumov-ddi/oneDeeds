import React, { Component } from 'react';
import LayoutButton from 'Components/LayoutButton';
import LayoutPanel from './LayoutPanel';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './Layout.module.scss';

import ArtBeach from 'Images/art-beach.jpg';
import AgedBaby from 'Images/adult-aged-baby.jpg';
import Adult from 'Images/abstract-adult.jpg';

class Layout extends Component {
  render() {
    return (
      <div className={styles.Layout + ' ' + (this.props.isOpen ? styles.navOpen : '')}>
        <LayoutPanel
          side={styles.left + ' ' + styles.Panel}
          title="Section 1"
          description="Description for section 1"
          image={ArtBeach}
        />
        <LayoutPanel side={styles.right}>
          <LayoutPanel
            side={styles.rightHalfTop + ' ' + styles.Panel}
            title="Section 2"
            description="Description for section 2"
            image={AgedBaby}>
            <LayoutButton text="Act Now" />
          </LayoutPanel>
          <LayoutPanel
            side={styles.rightBottom + ' ' + styles.Panel}
            title="Section 3"
            description="Description for section 3"
            image={Adult}>
            <LayoutButton text="Get Started" />
          </LayoutPanel>
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
