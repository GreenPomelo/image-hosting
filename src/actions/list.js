import { getHistoryUpList } from '../api/list';
import { HISTORY_LIST, HISTORY_LIST_ERROR } from './constant';

export const updateList = historyList => ({
  type: HISTORY_LIST,
  historyList
});

export const changePageNum = () => ({ type: `CHANGE_PAGE_NUM` });
export const listError = error => ({ type: HISTORY_LIST_ERROR, error });

export const listRequest = (pageNum, pageSize) => dispatch => {
  getHistoryUpList(pageNum, pageSize).then(
    ({ data: { success, data, errMsg } }) => {
      if (success) {
        dispatch(updateList(data));
      } else {
        dispatch(listError(errMsg));
      }
    }
  );
};
