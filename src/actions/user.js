import { userLogin, userLogout } from '../api/user';
import {
  LOGIN_SUCCEED,
  LOGIN_ERROR,
  LOG_OUT,
  LOG_OUT_ERROR,
  CHECK_LOGIN,
  USER_NAME_INPUT,
  PASS_WORD_INPUT
} from './constant';

export const userNameInput = username => ({ type: USER_NAME_INPUT, username });

export const passWordInput = password => ({ type: PASS_WORD_INPUT, password });

export const loginSuccess = userInfo => ({
  type: LOGIN_SUCCEED,
  username: userInfo.username,
  cookie: userInfo.cookie,
  isLogin: true
});

export const logOut = () => ({ type: LOG_OUT });

export const checkLogin = loginStatus => ({ type: CHECK_LOGIN, loginStatus });

export const loginError = error => ({ type: LOGIN_ERROR, error });
export const logOutError = error => ({ type: LOG_OUT_ERROR, error });

export const loginRequest = (username, password) => dispatch => {
  userLogin(username, password).then(({ data: { success, data, errMsg } }) => {
    if (success) {
      localStorage.setItem('cookie', data);
      // document.cookie = `auth=${data}`;
      dispatch(loginSuccess({ username, cookie: data }));
    } else {
      dispatch(loginError(errMsg));
    }
  });
};

export const logOutRequest = () => dispatch => {
  userLogout().then(({ data: { success, errMsg } }) => {
    if (success) {
      localStorage.clear();
      dispatch(logOut());
    } else {
      dispatch(logOutError(errMsg));
    }
  });
};
