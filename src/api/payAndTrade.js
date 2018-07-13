import request from '@/utils/request';

export function getCurrentBalance() {
  return request('/tradeAccount/showBalance');
}

export function billQuery(pageStart, tradeDate) {
  const data = {
    pageStart,
    tradeDate,
  };
  return request({'/tradeDetail/search', data);
}

