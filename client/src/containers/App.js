import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';

// App routes
import Routes from '../Routes';

// Global styles
import '../styles/index.scss';

const App = ({ history }) => (
  <div className="App">
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  </div>
);

App.propTypes = {
  history: PropTypes.object,
};

export default hot(module)(App);
