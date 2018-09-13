import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { hot } from 'react-hot-loader';
import { history } from 'Store';

// App routes
import Routes from 'Routes';

import styles from './App.module.scss';

const App = () => (
  <div className={styles.AppContainer}>
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  </div>
);

export default hot(module)(App);
