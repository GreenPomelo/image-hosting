import { getHistoryUpList } from '../api/list';
import { errMessage } from './alert';
import { HISTORY_LIST } from './constant';

export const updateList = historyList => ({
  type: HISTORY_LIST,
  historyList
});

export const changePageNum = () => ({ type: `CHANGE_PAGE_NUM` });

export const listRequest = (pageNum, pageSize) => dispatch => {
  getHistoryUpList(pageNum, pageSize).then(
    ({ data: { success, data, errMsg } }) => {
      if (success) {
        dispatch(updateList(data));
      } else {
        dispatch(errMessage(errMsg));
      }
    }
  );
};
