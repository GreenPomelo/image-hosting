import { combineReducers } from 'redux';
import { userReducer } from './user';
import { historyReducer } from './list';

export default combineReducers({
  userReducer,
  historyReducer
});
