import qs from 'qs';
import axios from '.';

const ONE = 1;
const TWENTY = 20;

export const getHistoryUpList = (pageNum = ONE, pageSize = TWENTY) =>
  axios.post(`/picbed/user/history`, qs.stringify({ pageNum, pageSize }));
