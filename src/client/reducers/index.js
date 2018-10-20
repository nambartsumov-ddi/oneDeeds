import { combineReducers } from 'redux';
import userState from './userState';
import ui from './ui';

const rootReducer = combineReducers({ userState, ui });

export default rootReducer;
