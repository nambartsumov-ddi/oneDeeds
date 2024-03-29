import { createStore, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from 'Reducers';

export const history = createBrowserHistory();

const initialState = {
  userState: {
    user: null,
  },
  ui: {
    isNavOpen: false,
    isVideodPlaying: false,
  },
};

const middleware = [thunk, routerMiddleware(history), createLogger()];

const store = createStore(
  connectRouter(history)(rootReducer),
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
