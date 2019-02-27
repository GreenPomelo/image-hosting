import { call, put, takeLatest } from 'redux-saga/effects';
import { userLogin } from '../api/user';
import { login, loginSuccess, loginFail } from '../actions/user';

function* loginRequest(username, password) {
  try {
    const data = yield call(userLogin, username, password);
    yield put(loginSuccess(data));
  } catch (error) {
    yield put(loginFail(error));
  }
}

function* loginSaga() {
  yield* takeLatest(login(), loginRequest);
}

export default loginSaga;
