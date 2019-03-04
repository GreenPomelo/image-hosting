import { AllUsers, AddUser, DeleteUser } from '../api/user';
import {
  USER_LIST,
  USER_LIST_PROGRESS,
  USER_ADD,
  USER_DELETE
} from './constant';
import { errMessage } from './alert';

export const getList = list => ({ type: USER_LIST, list });
export const getListLoading = () => ({
  type: USER_LIST_PROGRESS,
  progress: true
});

export const deleteUser = studentId => ({ type: USER_DELETE, studentId });
export const addUser = studentId => ({ type: USER_ADD, studentId });

export const userListRequest = () => dispatch => {
  dispatch(getListLoading());
  AllUsers().then(({ data: { success, data, errMsg } }) => {
    if (success) {
      dispatch(getList(data));
    } else {
      dispatch(errMessage(errMsg));
    }
  });
};

export const addUserRequest = (studentId, password) => dispatch => {
  AddUser(studentId, password).then(({ data: { success, data, errMsg } }) => {
    if (success) {
      dispatch(addUser(data));
    } else {
      dispatch(errMessage(errMsg));
    }
  });
};

export const deleteUserRequest = studentId => dispatch => {
  DeleteUser(studentId).then(({ data: { success, errMsg } }) => {
    if (success) {
      dispatch(deleteUser(studentId));
    } else {
      dispatch(errMessage(errMsg));
    }
  });
};
