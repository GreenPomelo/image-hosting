import axios from 'axios';
import qs from 'qs';

// axios.create({
//   withCredentials: true
//   // baseURL: 'https://qingyou.njupt.edu.cn/mini_program'
// });

axios.defaults.withCredentials = true;

export const scaleImage = (image, scaleRatio) =>
  axios.post(`/picbed/scaleImage`, {
    image,
    scaleRatio
  });

export const compressImage = (image, imageQuality) =>
  axios.post(
    `/picbed/compressImage`,
    {
      image,
      imageQuality
    },
    { withCredentials: true, headers: { Cookie: 'auth=123' } }
  );

export const uploadDirectly = (image, prefix) =>
  axios.post(`/picbed/uploadDirectly`, {
    image,
    prefix
  });

export const uploadIndirect = (fileName, prefix) =>
  axios.post(`/picbed/upload?${qs.stringify({ fileName, prefix })}`);
