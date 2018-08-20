import request from '@/utils/request';

//余额
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
//alipay支付
export function aliPay(body, subject, timeoutExpress, totalAmount, productCode) {
  const data = {
    body,
    subject,
		timeoutExpress,
		totalAmount,
		productCode,
  };
  return request.post('/aliPay/appPay', data);
}
//微信支付
export function wxPay(body , total_fee, trade_type) {
  const data = {
    body,
    total_fee,
		trade_type,
  };
  return request.post('/pay/order', data);
}
//充值记录
export function getRechargeHistory(pageStart){
	const data = {
		pageStart
	};
	return request.post('/tradeDetail/search', data);
}
