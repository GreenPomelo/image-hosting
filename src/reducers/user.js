import { LOGIN, LOGIN_FAIL, LOGIN_SUCCEED } from '../actions/user';

export const initialUser = {
  username: '',
  token: null,
  isLogin: false
};

export const userReducer = (state = initialUser, action) => {
  switch (action.type) {
    case LOGIN_SUCCEED:
      return {
        ...state,
        token: action.token,
        username: action.username,
        isLogin: true
      };
    case LOGIN:
      return state;
    default:
      return state;
  }
};
