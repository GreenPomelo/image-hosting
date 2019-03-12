import qs from 'qs';
import axios from '.';

const ZERO = 0;
const TWENTY = 20;

export const getHistoryUpList = (pageNum = ZERO, pageSize = TWENTY) =>
  axios.post(`/user/allHistory`, qs.stringify({ pageNum, pageSize }));
