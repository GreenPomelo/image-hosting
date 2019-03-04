import { userLogin, userLogout } from '../api/user';
import { errMessage } from './alert';
import { LOGIN_SUCCEED, LOG_OUT } from './constant';

export const loginSuccess = userInfo => ({
  type: LOGIN_SUCCEED,
  username: userInfo.username,
  token: userInfo.token,
  isLogin: true
});
export const logOut = () => ({ type: LOG_OUT });

export const loginRequest = (username, password) => dispatch => {
  userLogin(username, password).then(({ data: { success, data, errMsg } }) => {
    if (success) {
      localStorage.setItem('token', data);
      dispatch(loginSuccess({ username, token: data }));
    } else {
      dispatch(errMessage(errMsg));
    }
  });
};

export const logOutRequest = () => dispatch => {
  userLogout().then(({ data: { success, errMsg } }) => {
    if (success) {
      dispatch(logOut());
    } else {
      dispatch(errMessage(errMsg));
    }
  });
};
