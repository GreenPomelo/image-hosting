import axios from 'axios';
import qs from 'qs';

axios.create({
  withCredentials: true
  // baseURL: 'https://qingyou.njupt.edu.cn/mini_program'
});

export const userLogin = (username, password) =>
  axios.post(
    `/picbed/user/login?${qs.stringify({
      username,
      password
    })}`
  );

export const userLogout = () => axios.post(`/picbed/user/logout`);

export const AllUsers = () => axios.post(`/picbed/user/allUsers`);

export const AddUser = (studentId, password) =>
  axios.post(
    `/picbed/user/addUser?${qs.stringify({
      studentId,
      password
    })}`
  );

export const DeleteUser = studentId =>
  axios.delete(
    `/picbed/user/deleteUser?${qs.stringify({
      studentId
    })}`
  );
