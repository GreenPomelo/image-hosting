import axios from 'axios';
import qs from 'qs';

axios.create({
  withCredentials: true
  // baseURL: 'https://qingyou.njupt.edu.cn/mini_program'
});

// export const userLogin = (username, password) =>
//   axios.post(`/picbed/user/login?username=${username}&password=${password}`);

export const userLogin = (username, password) =>
  axios.post(
    `/picbed/user/login?${qs.stringify({
      username,
      password
    })}`
  );

export const userLogout = token =>
  axios.post(`/picbed/user/logout`, {
    headers: {
      Cookie: token
    }
  });
