import qs from 'qs';
import axios from '.';

export const userLogin = (username, password) =>
  axios.post(
    `/user/login?${qs.stringify({
      username,
      password
    })}`
  );

export const userLogout = () => axios.post(`/user/logout`);

export const AllUsers = () => axios.post(`/user/allUsers`);

export const AddUser = (studentId, password) =>
  axios.post(
    `/user/addUser?${qs.stringify({
      studentId,
      password
    })}`
  );

export const DeleteUser = studentId =>
  axios.delete(
    `/user/deleteUser?${qs.stringify({
      studentId
    })}`
  );
