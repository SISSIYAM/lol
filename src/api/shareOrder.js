import request from '@/utils/request';

// 获取预约列表
export function getBookList() {
  return request.post('/station/getBookList');
}
