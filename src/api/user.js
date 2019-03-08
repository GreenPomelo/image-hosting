import qs from 'qs';
import axios from '.';

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
