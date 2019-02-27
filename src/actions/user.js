import { userLogin } from '../api/user';

export const LOGIN = `LOGIN`;
export const LOGIN_SUCCEED = `LOGIN_SUCCEED`;
export const LOGIN_FAIL = `LOGIN_FAIL`;

export const login = () => ({ type: LOGIN });
export const loginSuccess = userInfo => ({
  type: LOGIN_SUCCEED,
  username: userInfo.username,
  token: userInfo.token,
  isLogin: true
});
export const loginFail = error => ({ type: LOGIN_FAIL, error });

export const loginRequest = (username, password) => dispatch => {
  userLogin(username, password).then(({ data: { success, data, errMsg } }) => {
    if (success) {
      localStorage.setItem('token', data);
      dispatch(loginSuccess({ username, token: data }));
    } else {
      dispatch(loginFail(errMsg));
    }
    dispatch(login());
  });
};
