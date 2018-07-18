import request from '@/utils/request';

export function getCurrentBalance() {
  return request.post('/tradeAccount/showBalance');
}

export function billQuery(pageStart, tradeDate) {
  const data = {
    pageStart,
    tradeDate,
  };
  return request.post('/tradeDetail/search', data);
}
