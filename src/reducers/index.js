import { combineReducers } from 'redux';
import { userReducer } from './user';
import { historyReducer } from './list';
import { userListReducer } from './user-list';

export default combineReducers({
  userReducer,
  historyReducer,
  userListReducer
});
