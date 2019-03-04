import {
  HISTORY_LIST,
  HISTORY_PROGRESS,
  ERROR_MESSAGE
} from '../actions/constant';

export const initialState = {
  historyList: [],
  progressStatus: true,
  error: ''
};

export const historyReducer = (state = initialState, action) => {
  switch (action.type) {
    case HISTORY_LIST:
      return {
        ...state,
        historyList: action.historyList,
        progressStatus: false
      };
    case ERROR_MESSAGE:
      return {
        ...state,
        error: action.error
      };
    case HISTORY_PROGRESS:
    default:
      return state;
  }
};
