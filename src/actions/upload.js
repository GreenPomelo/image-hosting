import {
  UPLOAD,
  UPLOAD_DIRECT,
  CHANGE_STEP,
  COMPRESS_OPEN,
  SCALE_OPEN,
  UPLOAD_INDIRECT,
  COMPRESS_IMAGE,
  SCALE_IMAGE,
  SCALE_SELECT,
  COMPRESS_SELECT,
  SCALE_IMAGE_ERROR,
  COMPRESS_IMAGE_ERROR,
  UPLOAD_DIRECT_ERROR,
  UPLOAD_INDIRECT_ERROR,
  PREFIX_INPUT
} from './constant';
import {
  uploadDirectly,
  uploadIndirect,
  scaleImage,
  compressImage
} from '../api/upload';

export const upload = file => ({ type: UPLOAD, file });
export const changeStep = step => ({ type: CHANGE_STEP, step });
export const openCompress = () => ({ type: COMPRESS_OPEN });
export const openScale = () => ({ type: SCALE_OPEN });
export const scaleSlider = scaleRatio => ({ type: SCALE_SELECT, scaleRatio });
export const compressSlider = imageQuality => ({
  type: COMPRESS_SELECT,
  imageQuality
});
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
export const prefixInput = prefix => ({ type: PREFIX_INPUT, prefix });
const scaleError = error => ({ type: SCALE_IMAGE_ERROR, error });
const compressError = error => ({ type: COMPRESS_IMAGE_ERROR, error });
const uploadDirectlyError = error => ({
  type: UPLOAD_DIRECT_ERROR,
  error
});
const uploadIndirectError = error => ({
  type: UPLOAD_INDIRECT_ERROR,
  error
});

export const scaleRequest = (image, scaleRatio) => dispatch => {
  scaleImage(image, scaleRatio).then(({ data: { success, data, errMsg } }) => {
    if (success) {
      dispatch(scaleFunc(data));
    } else {
      dispatch(scaleError(errMsg));
    }
  });
};

export const compressRequest = (image, imageQuality) => dispatch => {
  compressImage(image, imageQuality).then(
    ({ data: { success, data, errMsg } }) => {
      if (success) {
        dispatch(compressFunc(data));
      } else {
        dispatch(compressError(errMsg));
      }
    }
  );
};

export const uploadDirectlyRequest = (image, prefix) => dispatch => {
  uploadDirectly(image, prefix).then(({ data: { success, data, errMsg } }) => {
    if (success) {
      dispatch(uploadDirectlyFunc(data));
    } else {
      dispatch(uploadDirectlyError(errMsg));
    }
  });
};

export const uploadIndirectRequest = (image, prefix) => dispatch => {
  uploadIndirect(image, prefix).then(({ data: { success, data, errMsg } }) => {
    if (success) {
      dispatch(uploadIndirectFunc(data));
    } else {
      dispatch(uploadIndirectError(errMsg));
    }
  });
};
