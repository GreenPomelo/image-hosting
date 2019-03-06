import {
  USER_LIST,
  USER_ADD,
  USER_DELETE,
  USER_ADD_ERROR,
  USER_DELETE_ERROR,
  USER_LIST_ERROR
} from '../actions/constant';

const initialState = {
  list: [],
  progress: true,
  userError: ''
};

export const userListReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LIST:
      return {
        ...state,
        list: action.list,
        progress: false,
        userError: ''
      };
    case USER_ADD:
      return {
        ...state,
        userError: '',
        list: [...state.list, { studentId: action.studentId }]
      };
    case USER_DELETE:
      return {
        ...state,
        userError: '',
        list: [
          ...state.list.filter(item => item.studentId !== action.studentId)
        ]
      };
    case USER_ADD_ERROR:
    case USER_DELETE_ERROR:
    case USER_LIST_ERROR:
      return {
        ...state,
        userError: action.error
      };
    default:
      return state;
  }
};
