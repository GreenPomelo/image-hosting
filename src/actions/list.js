import { getHistoryUpList } from '../api/list';
import { HISTORY_LIST, HISTORY_LIST_ERROR } from './constant';

export const updateList = (historyList, totalElements) => ({
  type: HISTORY_LIST,
  historyList,
  totalElements
});

export const changePageNum = () => ({ type: `CHANGE_PAGE_NUM` });
export const listError = error => ({ type: HISTORY_LIST_ERROR, error });

export const listRequest = (pageNum, pageSize) => dispatch => {
  getHistoryUpList(pageNum, pageSize).then(
    ({
      data: {
        success,
        data: { content, totalElements },
        errMsg
      }
    }) => {
      if (success) {
        dispatch(updateList(content, totalElements));
      } else {
        dispatch(listError(errMsg));
      }
    }
  );
};
