import { combineReducers } from 'redux';
import { userReducer } from './user';
import { historyReducer } from './list';
import { userListReducer } from './user-list';
import { uploadReducer } from './upload';

export default combineReducers({
  userReducer,
  historyReducer,
  userListReducer,
  uploadReducer
});
