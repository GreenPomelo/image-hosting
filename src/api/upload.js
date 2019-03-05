import axios from 'axios';
import qs from 'qs';

axios.create({
  withCredentials: true
  // baseURL: 'https://qingyou.njupt.edu.cn/mini_program'
});

export const scaleImage = (image, scaleRatio) =>
  axios.post(
    `/picbed/scaleImage?${qs.stringify({
      image,
      scaleRatio
    })}`
  );

export const compressImage = (image, imageQuality) =>
  axios.post(
    `/picbed/compressImage?${qs.stringify({
      image,
      imageQuality
    })}`
  );

export const uploadDirectly = (image, prefix) =>
  axios.post(`/picbed/uploadDirectly?${qs.stringify({ image, prefix })}`);

export const uploadIndirect = (fileName, prefix) =>
  axios.post(`/picbed/upload?${qs.stringify({ fileName, prefix })}`);
