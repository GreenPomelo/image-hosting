import {
  USER_LIST,
  USER_ADD,
  USER_DELETE,
  ERROR_MESSAGE
} from '../actions/constant';

const initialState = {
  list: [],
  progress: true,
  error: ''
};

export const userListReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LIST:
      return {
        ...state,
        list: action.list,
        progress: false
      };
    case USER_ADD:
      return {
        ...state,
        list: [...state.list, { studentId: action.studentId }]
      };
    case USER_DELETE:
      return {
        ...state,
        list: [
          ...state.list.filter(item => item.studentId !== action.studentId)
        ]
      };
    case ERROR_MESSAGE:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};
