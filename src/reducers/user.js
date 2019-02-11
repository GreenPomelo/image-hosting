import { LOGIN } from '../actions/user';

export const initialUser = {
  username: '',
  password: '',
  token: null
};

export const userReducer = (state = initialUser, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        token: action.token
      };
    default:
      return state;
  }
};
