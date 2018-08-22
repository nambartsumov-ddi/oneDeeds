import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';

// App routes
import Routes from '../routes';

// module styles
import 'normalize.css';
// Global styles
import 'Styles/global.scss';

const App = ({ history }) => (
  <div className="app">
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  </div>
);

App.propTypes = {
  history: PropTypes.object,
};

export default hot(module)(App);
