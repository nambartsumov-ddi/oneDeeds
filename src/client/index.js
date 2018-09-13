import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// module styles
import 'normalize.css';
// Global styles
import 'Styles/global.scss';

import App from 'Containers/App';
import store from 'Store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
