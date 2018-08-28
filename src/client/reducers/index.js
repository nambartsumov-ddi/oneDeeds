import { combineReducers } from 'redux';
import user from './user';
import nav from './nav';

const rootReducer = combineReducers({ user, nav });

export default rootReducer;
