import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-responsive-modal';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import api from 'Api';
import { closeNav, logout, setUser } from 'Actions';
import NavMenu from './NavMenu';
import NavFooter from './NavFooter';
import styles from './Nav.module.scss';

// Because we use css-modules we need to bind styles to classNames utilities
const stylesCtx = classNames.bind(styles);

class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openCancelPopup: false,
    };
  }

  onOpenModal() {
    this.setState({ openCancelPopup: true });
  }

  onCloseModal() {
    this.setState({ openCancelPopup: false });
  }

  cancelMembershipHandler() {
    const { user } = this.props;
    api
      .post('/cancel-membership', { user })
      .then(() => {
        logout();
        setUser();
        closeNav();
      })
      .catch((err) => {
        console.log('Failed to cancel membership. Try again in a few minutes.', err);
      });

    this.onCloseModal();
  }

  render() {
    const navClasses = stylesCtx(styles.Nav, {
      [styles.navOpen]: this.props.isOpen,
    });

    const isUsedPaid = this.props.user && this.props.user.isPaid;

    return (
      <aside className={navClasses}>
        <NavMenu />
        <NavFooter>
          <div>
            {isUsedPaid && (
              <div className={styles.Small} onClick={this.onOpenModal.bind(this)}>
                Cancel Membership
              </div>
            )}
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <a
              className={styles.Small}
              href="https://www.onedeeds.com/toc03.pdf"
              target="_blank"
              rel="noopener noreferrer">
              Terms of Service
            </a>
            <a
              className={styles.Small}
              href="https://www.onedeeds.com/pp03.pdf"
              target="_blank"
              rel="noopener noreferrer">
              Privacy Policy
            </a>
          </div>
        </NavFooter>
        <Modal open={this.state.openCancelPopup} onClose={() => this.onCloseModal()} center>
          <div className={styles.ModalContentWrapper}>
            <h2 className={styles.PopupQuestion}>Are you sure?</h2>
            <p className={styles.PopupDescription}>
              By cancelling membership you will no longer be charged $1 a month for being a part of OneDeeds community.
              Keep doing good deeds anyway!
            </p>
            <div className={styles.PopupBtnWrapper}>
              <a className={styles.PopupBtn} onClick={() => this.cancelMembershipHandler()}>
                Ok
              </a>
              <a className={styles.PopupBtn} onClick={() => this.onCloseModal()}>
                Cancel
              </a>
            </div>
          </div>
        </Modal>
      </aside>
    );
  }
}

Nav.propTypes = {
  isOpen: PropTypes.bool,
  user: PropTypes.any,
  closeNav: PropTypes.func,
  logout: PropTypes.func,
  setUser: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    isOpen: state.ui.isNavOpen,
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ closeNav, logout, setUser }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);
