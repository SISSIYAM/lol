import request from '@/utils/request';

export function getCurrentBalance() {
  return request({
    url: '/tradeAccount/showBalance',
    method: '',
  });
}

export function billQuery(pageStart, tradeDate) {
  const data = {
    pageStart,
    tradeDate,
  };
  return request({
    url: '/tradeDetail/search',
    method: '',
    data,
  });
}

