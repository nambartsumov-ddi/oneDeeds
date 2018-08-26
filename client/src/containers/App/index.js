import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';

// App routes
import Routes from 'Routes';

import styles from './App.module.scss';

const App = ({ history }) => (
  <div className={styles.AppContainer}>
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  </div>
);

App.propTypes = {
  history: PropTypes.object,
};

export default hot(module)(App);
