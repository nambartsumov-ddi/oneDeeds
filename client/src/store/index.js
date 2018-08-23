import { createStore, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';

import rootReducer from '../reducers';

export const history = createBrowserHistory();

// const preloadedState = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {}
const initialState = {};
// Configure the logger middleware
const loggerMiddleware = createLogger();

const middleware = [routerMiddleware(history)];

if (process.env.NODE_ENV === 'development') {
  middleware.push(loggerMiddleware);
}

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

const store = createStore(
  connectRouter(history)(rootReducer),
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

// store.subscribe(() => {
//   localStorage.setItem('user', JSON.stringify(store.getState()));
// });

export default store;
