import request from '@/utils/request';

export function updateUsername(name) {
  return request('/userLogin/updateName', { name });
}

export function updateUserImg() {
  const data = {};
  return request('url',data);
}

