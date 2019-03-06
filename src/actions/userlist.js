import { AllUsers, AddUser, DeleteUser } from '../api/user';
import {
  USER_LIST,
  USER_ADD_ERROR,
  USER_LIST_ERROR,
  USER_DELETE_ERROR,
  USER_ADD,
  USER_DELETE
} from './constant';

export const getList = list => ({ type: USER_LIST, list });

export const deleteUser = studentId => ({ type: USER_DELETE, studentId });
export const addUser = studentId => ({ type: USER_ADD, studentId });
export const userListError = error => ({ type: USER_LIST_ERROR, error });
export const addUserError = error => ({ type: USER_ADD_ERROR, error });
export const deleteUserError = error => ({ type: USER_DELETE_ERROR, error });

export const userListRequest = () => dispatch => {
  AllUsers().then(({ data: { success, data, errMsg } }) => {
    if (success) {
      dispatch(getList(data));
    } else {
      dispatch(userListError(errMsg));
    }
  });
};

export const addUserRequest = (studentId, password) => dispatch => {
  AddUser(studentId, password).then(({ data: { success, data, errMsg } }) => {
    if (success) {
      dispatch(addUser(data));
    } else {
      dispatch(addUserError(errMsg));
    }
  });
};

export const deleteUserRequest = studentId => dispatch => {
  DeleteUser(studentId).then(({ data: { success, errMsg } }) => {
    if (success) {
      dispatch(deleteUser(studentId));
    } else {
      dispatch(deleteUserError(errMsg));
    }
  });
};
