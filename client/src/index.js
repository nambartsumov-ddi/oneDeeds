import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// module styles
import 'normalize.css';
// Global styles
import 'Styles/global.scss';

import App from 'Containers/App';
import store, { history } from 'Store';

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById('root')
);
