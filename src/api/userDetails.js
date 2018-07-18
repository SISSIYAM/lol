import request from '@/utils/request';

export function updateUsername(name) {
  return request.post('/userLogin/updateName', { name });
}

export function updateUserImg() {
  const data = {};
  return request.post('url',data);
}
