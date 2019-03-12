import {
  UPLOAD,
  CHANGE_STEP,
  COMPRESS_OPEN,
  SCALE_OPEN,
  SCALE_SELECT,
  COMPRESS_SELECT,
  UPLOAD_DIRECT,
  UPLOAD_DIRECT_ERROR,
  UPLOAD_INDIRECT,
  UPLOAD_INDIRECT_ERROR,
  SCALE_IMAGE_ERROR,
  COMPRESS_IMAGE_ERROR,
  PREFIX_INPUT,
  SCALE_IMAGE,
  COMPRESS_IMAGE
} from '../actions/constant';

const initalState = {
  file: {},
  error: '',
  step: 0,
  compressStatus: false,
  scaleStatus: false,
  scaleRatio: 0,
  imageQuality: 0,
  prefix: '',
  imageLink: '',
  fileName: '',
  compressionRatio: 0,
  compressSuccessStatus: false
};

export const uploadReducer = (state = initalState, action) => {
  switch (action.type) {
    case UPLOAD:
      return {
        ...state,
        file: action.file
      };
    case UPLOAD_DIRECT:
    case UPLOAD_INDIRECT:
      return {
        ...state,
        error: `上传成功`,
        imageLink: action.imageLink
      };
    case SCALE_IMAGE:
      return {
        ...state,
        error: `调整比例成功`
      };
    case COMPRESS_IMAGE:
      return {
        ...state,
        error: `压缩成功`,
        fileName: action.fileName,
        compressionRatio: action.compressionRatio,
        compressSuccessStatus: true
      };
    case UPLOAD_DIRECT_ERROR:
    case UPLOAD_INDIRECT_ERROR:
    case SCALE_IMAGE_ERROR:
    case COMPRESS_IMAGE_ERROR:
      return {
        ...state,
        error: action.error
      };
    case CHANGE_STEP:
      return {
        ...state,
        step: action.step
      };
    case COMPRESS_OPEN:
      return {
        ...state,
        compressStatus: !state.compressStatus,
        error: ''
      };
    case SCALE_OPEN:
      return {
        ...state,
        scaleStatus: !state.scaleStatus,
        error: ''
      };
    case SCALE_SELECT:
      return { ...state, scaleRatio: action.scaleRatio, error: '' };
    case COMPRESS_SELECT:
      return { ...state, imageQuality: action.imageQuality, error: '' };
    case PREFIX_INPUT:
      return { ...state, prefix: action.prefix, error: '' };
    default:
      return state;
  }
};
