import { combineReducers } from 'redux';
import authReducer from './authReducer.js';
import searchReducer from './searchReducer.js';
// import historyReducer from './historyReducer.js';

const reducers = combineReducers({
  auth: authReducer,
  search: searchReducer,
  // history: historyReducer,
});

export default reducers;
