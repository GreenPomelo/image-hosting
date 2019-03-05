import {
  UPLOAD,
  ERROR_MESSAGE,
  CHANGE_STEP,
  COMPRESS_OPEN,
  SCALE_OPEN
} from '../actions/constant';

const initalState = {
  file: {},
  error: '',
  step: 0,
  compressStatus: true,
  scaleStatus: true
};

export const uploadReducer = (state = initalState, action) => {
  switch (action.type) {
    case UPLOAD:
      return {
        ...state,
        file: action.file
      };
    case ERROR_MESSAGE:
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
    default:
      return state;
  }
};
