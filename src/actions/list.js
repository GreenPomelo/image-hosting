import { getHistoryUpList } from '../api/list';

export const updateList = historyList => ({
  type: `UPDATE_HISTORY`,
  historyList
});
