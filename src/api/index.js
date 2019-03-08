import axios from 'axios';
import REQUEST_URL from './request';

axios.defaults.baseURL = REQUEST_URL;
axios.defaults.withCredentials = true;

export default axios;
