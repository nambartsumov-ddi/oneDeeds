import React, { Component } from 'react';

import styles from './Menu.module.scss';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.openMenu = this.openMenu.bind(this);
    this.onClick = this.onClick.bind(this);

    this.state = {
      isMenuOpen: false,
      visible: false,
    };
  }

  onClick() {
    this.openMenu();
    /* this.props.action();*/
  }

  openMenu() {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen,
      visible: !this.state.visible,
    });
  }

  render() {
    let styleLink = this.state.visible ? { opacity: '1', marginLeft: '0' } : {};

    if (this.state.isMenuOpen == null || this.state.visible == null) return <span>Loading... </span>;

    return (
      <div className={this.state.isMenuOpen ? styles.menuOpen : styles.Menu}>
        <button className={styles.hamburgerIcon} onClick={this.onClick}>
          <div className={styles.menuWrapper}>
            <div className={styles.line} />
            <div className={styles.line} />
            <div className={styles.line} />
          </div>
        </button>
        <div className={styles.navbar}>
          <div className={this.state.visible ? styles.visible : ''}>
            <div className={styles.mainLinks}>
              <div className={styles.link} style={styleLink}>
                First Page
              </div>
              <div className={styles.link} style={styleLink}>
                Second Page
              </div>
              <div className={styles.link} style={styleLink}>
                Third Page
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Menu.propTypes = {
  /* action: React.propTypes.any,*/
};

export default Menu;
