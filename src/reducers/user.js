import { LOGIN_SUCCEED, LOG_OUT, ERROR_MESSAGE } from '../actions/constant';

export const initialUser = {
  username: '',
  token: null,
  isLogin: false,
  error: ''
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
    case ERROR_MESSAGE:
      return {
        ...state,
        error: action.error
      };
    case LOG_OUT:
    default:
      return state;
  }
};
