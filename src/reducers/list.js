import { HISTORY_LIST, HISTORY_LIST_ERROR } from '../actions/constant';

export const initialState = {
  historyList: [],
  progressStatus: true,
  historyError: '',
  totalList: 0
};

export const historyReducer = (state = initialState, action) => {
  switch (action.type) {
    case HISTORY_LIST:
      return {
        ...state,
        historyList: action.historyList.filter(item => !!item.picUrl),
        progressStatus: false,
        historyError: '',
        totalList: action.totalElements
      };
    case HISTORY_LIST_ERROR:
      return {
        ...state,
        historyError: action.error
      };
    default:
      return state;
  }
};
