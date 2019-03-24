import axios from 'axios';
import REQUEST_URL from './request';
import { store } from '../index';

axios.defaults.baseURL = REQUEST_URL;
axios.defaults.withCredentials = true;
axios.interceptors.response.use(response => {
  if (
    (response.data.errMsg === `Unauthorized Request` &&
      response.request.responseURL === `${REQUEST_URL}/user/logout`) ||
    response.data.errMsg === `AuthId Out of Date`
  ) {
    localStorage.clear();
    store.dispatch({ type: 'LOG_OUT' });
  }
  return response;
});
export default axios;
