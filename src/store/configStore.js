import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import reducer from '../reducers/index';
// import { userReducer } from '../reducers/user';
import loginSaga from '../saga/user';

const sagaMiddleware = createSagaMiddleware();
const middleware = [thunkMiddleware, sagaMiddleware];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

export default function configStore() {
  const store = createStore(reducer, applyMiddleware(...middleware));
  sagaMiddleware.run(loginSaga);
  return store;
}
