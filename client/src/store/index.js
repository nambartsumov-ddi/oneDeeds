import { createStore, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from '../reducers';

export const history = createBrowserHistory();

const initialState = {};

// Configure the logger middleware
const loggerMiddleware = createLogger();

const middleware = [routerMiddleware(history), loggerMiddleware];

const store = createStore(
  connectRouter(history)(rootReducer),
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
