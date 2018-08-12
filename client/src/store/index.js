import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { createLogger } from 'redux-logger';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import rootReducer from '../reducers';

// const preloadedState = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {}
const preloadedState = {};

// Configure the logger middleware
const logger = createLogger({
  level: 'info',
  collapsed: true,
});

export const history = createBrowserHistory();

const middleware = [thunk, routerMiddleware(history), logger];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  connectRouter(history)(rootReducer),
  preloadedState,
  composeEnhancers(applyMiddleware(...middleware))
);

// store.subscribe(() => {
//   localStorage.setItem('user', JSON.stringify(store.getState()));
// });

export default store;
