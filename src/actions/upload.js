import {
  UPLOAD,
  UPLOAD_DIRECT,
  CHANGE_STEP,
  COMPRESS_OPEN,
  SCALE_OPEN,
  UPLOAD_INDIRECT,
  COMPRESS_IMAGE,
  SCALE_IMAGE
} from './constant';
import {
  uploadDirectly,
  uploadIndirect,
  scaleImage,
  compressImage
} from '../api/upload';
import { errMessage } from './alert';

export const upload = file => ({ type: UPLOAD, file });

export const changeStep = step => ({ type: CHANGE_STEP, step });

export const openCompress = () => ({ type: COMPRESS_OPEN });

export const openScale = () => ({ type: SCALE_OPEN });

export const scaleFunc = imageFile => ({ type: SCALE_IMAGE, imageFile });

export const compressFunc = imageFile => ({ type: COMPRESS_IMAGE, imageFile });

export const uploadDirectlyFunc = imageLink => ({
  type: UPLOAD_DIRECT,
  imageLink
});

export const uploadIndirectFunc = imageLink => ({
  type: UPLOAD_INDIRECT,
  imageLink
});

export const scaleRequest = (image, scaleRatio) => dispatch => {
  scaleImage(image, scaleRatio).then(({ data: { success, data, errMsg } }) => {
    if (success) {
      dispatch(scaleFunc(data));
    } else {
      dispatch(errMessage(errMsg));
    }
  });
};

export const compressRequest = (image, imageQuality) => dispatch => {
  compressImage(image, imageQuality).then(({ success, data, errMsg }) => {
    if (success) {
      dispatch(compressFunc(data));
    } else {
      dispatch(errMessage(errMsg));
    }
  });
};

export const uploadDirectlyRequest = (image, prefix) => dispatch => {
  uploadDirectly(image, prefix).then(({ success, data, errMsg }) => {
    if (success) {
      dispatch(uploadDirectlyFunc(data));
    } else {
      dispatch(errMessage(errMsg));
    }
  });
};

export const uploadIndirectRequest = (image, prefix) => dispatch => {
  uploadIndirect(image, prefix).then(({ success, data, errMsg }) => {
    if (success) {
      dispatch(uploadIndirectFunc(data));
    } else {
      dispatch(errMessage(errMsg));
    }
  });
};
