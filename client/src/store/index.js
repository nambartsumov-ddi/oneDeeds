import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { createLogger } from 'redux-logger';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import rootReducer from '../reducers';

export const history = createBrowserHistory();

// Configure the logger middleware
const logger = createLogger({
  level: 'info',
  collapsed: true,
});

const middleware = [thunk, routerMiddleware(history), logger];

const preloadedState = {};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  connectRouter(history)(rootReducer),
  preloadedState,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
