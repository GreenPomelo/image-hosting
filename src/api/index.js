import axios from 'axios';
import REQUEST_URL from './request';

axios.defaults.baseURL = REQUEST_URL;
axios.defaults.withCredentials = true;
axios.interceptors.response.use(response => {
  if (
    response.data.errMsg === `Unauthorized Request` &&
    response.request.responseURL === `${REQUEST_URL}/user/logout`
  ) {
    localStorage.clear();
  }
  if (response.data.errMsg === `AuthId Out of Date`) {
    localStorage.clear();
  }
  return response;
});
export default axios;
