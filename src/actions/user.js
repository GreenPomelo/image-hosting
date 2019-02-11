export const LOGIN = token => ({ type: `LOGIN`, token });

export const LOGIN_REQUEST = token => dispatch => {
  dispatch(LOGIN(token));
};
