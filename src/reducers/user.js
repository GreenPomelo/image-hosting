import {
  LOGIN_SUCCEED,
  LOG_OUT,
  LOGIN_ERROR,
  LOG_OUT_ERROR,
  CHECK_LOGIN,
  USER_NAME_INPUT,
  PASS_WORD_INPUT,
  NEED_LOGIN
} from '../actions/constant';

export const initialUser = {
  username: '',
  password: '',
  cookie: null,
  isLogin: false,
  loginError: ''
};

export const userReducer = (state = initialUser, action) => {
  switch (action.type) {
    case USER_NAME_INPUT:
      return {
        ...state,
        username: action.username
      };
    case PASS_WORD_INPUT:
      return {
        ...state,
        password: action.password
      };
    case LOGIN_SUCCEED:
      return {
        ...state,
        cookie: action.cookie,
        username: action.username,
        isLogin: true
      };
    case LOGIN_ERROR:
    case LOG_OUT_ERROR:
      return {
        ...state,
        loginError: action.error
      };
    case CHECK_LOGIN:
      return {
        ...state,
        isLogin: action.loginStatus
      };
    case LOG_OUT:
      return { ...state, isLogin: false };
    case NEED_LOGIN:
      return { ...state, isLogin: false };
    default:
      return state;
  }
};
