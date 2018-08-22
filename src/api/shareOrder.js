import request from '@/utils/request';

// 获取预约列表
export function getBookList() {
  return request.post('/station/getBookList');
}
export function cancleBookStation(stationDetailId) {
  const data = {
    stationDetailId,
  };
  return request.post('/station/cancleBookStation', data);
}
