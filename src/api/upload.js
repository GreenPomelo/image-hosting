import qs from 'qs';
import axios from '.';

export const scaleImage = (image, scaleRatio) => {
  const data = new FormData();
  data.append(`image`, image);
  data.append(`scaleRatio`, scaleRatio);
  return axios.post(`/picbed/scaleImage`, data, {
    headers: {
      'Content-Type': `multipart/form-data; boundary=${data._boundary}`
    }
  });
};

export const compressImage = (image, imageQuality) => {
  const data = new FormData();
  data.append(`image`, image);
  data.append(`imageQuality`, imageQuality);
  return axios.post(`/picbed/compressImage`, data, {
    headers: {
      'Content-Type': `multipart/form-data; boundary=${data._boundary}`
    }
  });
};

export const uploadDirectly = (image, prefix) => {
  const data = new FormData();
  data.append(`image`, image);
  data.append(`prefix`, prefix);
  return axios.post(`/picbed/uploadDirectly`, data, {
    headers: {
      'Content-Type': `multipart/form-data; boundary=${data._boundary}`
    }
  });
};

export const uploadIndirect = (fileName, prefix) =>
  axios.post(`/picbed/upload?${qs.stringify({ fileName, prefix })}`);
