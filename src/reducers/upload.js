import {
  UPLOAD,
  CHANGE_STEP,
  COMPRESS_OPEN,
  SCALE_OPEN,
  SCALE_SELECT,
  COMPRESS_SELECT,
  UPLOAD_DIRECT_ERROR,
  UPLOAD_INDIRECT_ERROR,
  SCALE_IMAGE_ERROR,
  COMPRESS_IMAGE_ERROR,
  PREFIX_INPUT
} from '../actions/constant';

const initalState = {
  file: {},
  error: '',
  step: 0,
  compressStatus: true,
  scaleStatus: true,
  scaleRatio: 0,
  imageQuality: 0,
  prefix: ''
};

export const uploadReducer = (state = initalState, action) => {
  switch (action.type) {
    case UPLOAD:
      return {
        ...state,
        file: action.file
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
        compressStatus: !state.compressStatus
      };
    case SCALE_OPEN:
      return {
        ...state,
        scaleStatus: !state.scaleStatus
      };
    case SCALE_SELECT:
      return { ...state, scaleRatio: action.scaleRatio };
    case COMPRESS_SELECT:
      return { ...state, imageQuality: action.imageQuality };
    case PREFIX_INPUT:
      return { ...state, prefix: action.prefix };
    default:
      return state;
  }
};
