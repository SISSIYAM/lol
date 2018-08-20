import request from '@/utils/request';

export function updateUserName(name) {
  return request.post('/userLogin/updateName', name);
}

export function updateUserImg(data) {
  return request.post('url', data);
}
