import { updateList } from '../actions/list';

export const initialState = {
  historyList: []
};

export const historyReducer = (state = initialState, action) => {
  switch (action.type) {
    case updateList:
      return {
        ...state,
        historyList: action.historyList
      };
    default:
      return state;
  }
};
